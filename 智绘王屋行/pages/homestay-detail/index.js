const {
  getHomestayDetailById,
  getQAForHomestay,
  addQuestion,
  addAnswer,
  getReviewsForHomestay,
  submitReview,
  deleteReview,
  getAmenityLikes,
  toggleAmenityLike,
  MOOD_OPTIONS
} = require('../../utils/homestays.js');

Page({
  data: {
    homestay: null,
    qaList: [],
    reviews: [],
    amenityLikes: {},
    replyInputs: {},
    replyBtnActive: {},
    showAskModal: false,
    askInput: '',
    askInputLen: 0,
    askCanSubmit: false,
    showReviewModal: false,
    revScore: 0,
    revMood: '',
    revContent: '',
    revContentLen: 0,
    revCanSubmit: false,
    scoreStarList: [1, 2, 3, 4, 5],
    moodOptions: MOOD_OPTIONS,
    showBookModal: false,
    currentRoomType: null,
    formData: {
      name: '',
      phone: '',
      checkInDate: '',
      checkOutDate: '',
      quantity: 1
    },
    formAgreed: false,
    showPaymentModal: false,
    paymentAmount: 0,
    paymentQRCode: '',
    paymentWechat: '',
    defaultAvatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
    userInfo: { avatarUrl: '', nickName: '' }
  },

  onLoad(options) {
    const id = options.id;
    console.log('[homestay-detail] onLoad id=', id);
    const homestay = getHomestayDetailById(id);
    if (!homestay) {
      wx.showToast({ title: '民宿不存在', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }
    this.setData({ homestay });
    this._loadUserInfo();
    this._loadAmenityLikes();
  },

  _loadAmenityLikes() {
    const h = this.data.homestay;
    if (h) {
      this.setData({ amenityLikes: getAmenityLikes(h.id) });
    }
  },

  onShow() {
    const h = this.data.homestay;
    if (h) {
      this.setData({
        homestay: getHomestayDetailById(h.id),
        qaList: getQAForHomestay(h.id),
        reviews: getReviewsForHomestay(h.id)
      });
    }
  },

  onReady() {
    const h = this.data.homestay;
    if (h && h.nameShort) {
      wx.setNavigationBarTitle({ title: h.nameShort });
    }
  },

  _loadUserInfo() {
    try {
      const stored = wx.getStorageSync('homestay_user_info');
      if (stored) {
        const info = JSON.parse(stored);
        this.setData({ userInfo: info });
      }
    } catch {}
    this._saveUserInfo();
  },

  _saveUserInfo() {
    const { userInfo } = this.data;
    try {
      wx.setStorageSync('homestay_user_info', JSON.stringify(userInfo));
    } catch {}
  },

  preventTouchMove() {},

  // ── 设施点赞 ──
  onAmenityLikeTap(e) {
    const name = e.currentTarget.dataset.amenity || '';
    if (!name) return;
    const h = this.data.homestay;
    if (!h) return;
    toggleAmenityLike(h.id, name);
    this.setData({ amenityLikes: getAmenityLikes(h.id) });
  },

  // ── 提问 ──
  onAskTap() {
    this.setData({
      showAskModal: true,
      askInput: '',
      askInputLen: 0,
      askCanSubmit: false
    });
  },

  onAskCancel() {
    this.setData({ showAskModal: false, askInput: '', askInputLen: 0, askCanSubmit: false });
  },

  onAskInput(e) {
    const v = e.detail.value || '';
    this.setData({ askInput: v, askInputLen: v.length, askCanSubmit: v.trim().length > 0 });
  },

  onAskSubmit() {
    const text = this.data.askInput.trim();
    if (!text) { wx.showToast({ title: '请输入问题', icon: 'none' }); return; }
    if (text.length < 4) { wx.showToast({ title: '问题至少 4 个字', icon: 'none' }); return; }
    const h = this.data.homestay;
    const nick = this.data.userInfo.nickName || '游客';
    addQuestion(h.id, text, nick);
    this.setData({ showAskModal: false, askInput: '', askInputLen: 0, askCanSubmit: false, qaList: getQAForHomestay(h.id) });
    wx.showToast({ title: '提问成功', icon: 'success' });
  },

  // ── 回答 ──
  onReplyInput(e) {
    const qid = e.currentTarget.dataset.qid || '';
    const val = e.detail.value || '';
    const inputs = { ...this.data.replyInputs, [qid]: val };
    const active = { ...this.data.replyBtnActive, [qid]: val.trim().length > 0 };
    this.setData({ replyInputs: inputs, replyBtnActive: active });
  },

  onReplyConfirm(e) {
    const qid = e.currentTarget.dataset.qid || '';
    const text = (this.data.replyInputs[qid] || '').trim();
    if (!text) { wx.showToast({ title: '请输入回答内容', icon: 'none' }); return; }
    const h = this.data.homestay;
    if (!h) { wx.showToast({ title: '民宿信息异常', icon: 'none' }); return; }
    const nick = this.data.userInfo.nickName || '热心游客';
    const ok = addAnswer(h.id, qid, text, nick);
    if (ok) {
      const inputs = { ...this.data.replyInputs };
      const active = { ...this.data.replyBtnActive };
      delete inputs[qid];
      delete active[qid];
      this.setData({ replyInputs: inputs, replyBtnActive: active, qaList: getQAForHomestay(h.id) });
      wx.showToast({ title: '回答成功', icon: 'success' });
    } else {
      wx.showToast({ title: '回答失败，问题可能已删除', icon: 'none' });
    }
  },

  // ── 评价 ──
  onWriteReviewTap() {
    this.setData({
      showReviewModal: true,
      revScore: 0,
      revMood: '',
      revContent: '',
      revContentLen: 0,
      revCanSubmit: false
    });
  },

  onReviewCancel() {
    this.setData({ showReviewModal: false });
  },

  onScoreTap(e) {
    const star = Number(e.currentTarget.dataset.star) || 0;
    const content = this.data.revContent || '';
    this.setData({ revScore: star, revCanSubmit: star > 0 && content.trim().length > 0 });
  },

  onMoodTap(e) {
    const mood = e.currentTarget.dataset.mood || '';
    this.setData({ revMood: mood });
  },

  onReviewContentInput(e) {
    const v = e.detail.value || '';
    const score = this.data.revScore || 0;
    this.setData({ revContent: v, revContentLen: v.length, revCanSubmit: score > 0 && v.trim().length > 0 });
  },

  onReviewSubmit() {
    const { revScore, revContent } = this.data;
    if (revScore === 0) { wx.showToast({ title: '请选择评分', icon: 'none' }); return; }
    if (!revContent.trim()) { wx.showToast({ title: '请输入评价内容', icon: 'none' }); return; }
    if (revContent.trim().length < 4) { wx.showToast({ title: '评价至少 4 个字', icon: 'none' }); return; }
    const h = this.data.homestay;
    submitReview(h.id, {
      nick: this.data.userInfo.nickName || '游客',
      avatarUrl: this.data.userInfo.avatarUrl || '',
      mood: this.data.revMood || '不错',
      rating: revScore,
      content: revContent.trim(),
      images: [],
      homestayName: h.nameShort,
      homestayImageUrl: h.imageUrl
    });
    this.setData({
      showReviewModal: false, revScore: 0, revMood: '', revContent: '', revContentLen: 0, revCanSubmit: false,
      homestay: getHomestayDetailById(h.id),
      reviews: getReviewsForHomestay(h.id)
    });
    wx.showToast({ title: '评价发布成功', icon: 'success' });
  },

  onDeleteReviewTap(e) {
    const revId = e.currentTarget.dataset.revid || '';
    if (!revId) return;
    const h = this.data.homestay;
    wx.showModal({
      title: '确认删除', content: '确定删除这条评价吗？',
      success: (res) => {
        if (res.confirm) {
          deleteReview(h.id, revId);
          this.setData({ homestay: getHomestayDetailById(h.id), reviews: getReviewsForHomestay(h.id) });
          wx.showToast({ title: '已删除', icon: 'success' });
        }
      }
    });
  },

  onReviewCountTap() {
    wx.showToast({ title: '向下滚动查看评价', icon: 'none' });
  },

  // ── 预订 ──
  onBookTap(e) {
    const roomIndex = Number(e.currentTarget.dataset.room || 0);
    const h = this.data.homestay;
    if (!h || !h.roomTypes || !h.roomTypes[roomIndex]) return;
    this.setData({
      showBookModal: true,
      currentRoomType: h.roomTypes[roomIndex],
      formData: {
        name: '',
        phone: '',
        checkInDate: this._tomorrowDate(),
        checkOutDate: '',
        quantity: 1
      },
      formAgreed: false
    });
  },

  _tomorrowDate() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  },

  onBookModalClose() {
    this.setData({ showBookModal: false });
  },

  onFormAgreeChange(e) {
    this.setData({ formAgreed: !!(e.detail.value && e.detail.value.length > 0) });
  },

  onNameInput(e) {
    this.setData({ 'formData.name': e.detail.value });
  },

  onPhoneInput(e) {
    this.setData({ 'formData.phone': e.detail.value });
  },

  onCheckInDateChange(e) {
    const checkIn = e.detail.value;
    const checkOut = this.data.formData.checkOutDate;
    this.setData({ 'formData.checkInDate': checkIn });
    if (checkOut && checkOut <= checkIn) {
      wx.showToast({ title: '入住日期已变更，请重新选择退房', icon: 'none' });
      this.setData({ 'formData.checkOutDate': '' });
    }
  },

  onCheckOutDateChange(e) {
    const checkOut = e.detail.value;
    const checkIn = this.data.formData.checkInDate;
    if (checkIn && checkOut <= checkIn) {
      wx.showToast({ title: '退房日期必须大于入住日期', icon: 'none' });
      return;
    }
    this.setData({ 'formData.checkOutDate': checkOut });
  },

  increaseQuantity() {
    if (this.data.formData.quantity < 10) {
      this.setData({ 'formData.quantity': this.data.formData.quantity + 1 });
    }
  },

  decreaseQuantity() {
    if (this.data.formData.quantity > 1) {
      this.setData({ 'formData.quantity': this.data.formData.quantity - 1 });
    }
  },

  _calcNights() {
    const { checkInDate, checkOutDate } = this.data.formData;
    if (!checkInDate || !checkOutDate) return 1;
    const diff = new Date(checkOutDate).getTime() - new Date(checkInDate).getTime();
    const nights = Math.floor(diff / (1000 * 3600 * 24));
    return nights > 0 ? nights : 1;
  },

  submitBooking() {
    const { formData, formAgreed, currentRoomType } = this.data;
    if (!formAgreed) { wx.showToast({ title: '请先阅读并同意用户协议', icon: 'none', duration: 2500 }); return; }
    if (!formData.name.trim()) { wx.showToast({ title: '请输入姓名', icon: 'none' }); return; }
    if (!formData.phone.trim() || !/^1[3-9]\d{9}$/.test(formData.phone)) { wx.showToast({ title: '请输入正确手机号', icon: 'none' }); return; }
    if (!formData.checkInDate || !formData.checkOutDate) { wx.showToast({ title: '请选择入住退房日期', icon: 'none' }); return; }
    const nights = this._calcNights();
    const amount = currentRoomType.price * formData.quantity * nights;
    const h = this.data.homestay;
    wx.showModal({
      title: '确认预订',
      content: `民宿：${h.nameShort}\n房型：${currentRoomType.name}\n入住：${formData.checkInDate}\n退房：${formData.checkOutDate}（共${nights}晚）\n数量：${formData.quantity}间\n合计：¥${amount}`,
      success: (res) => {
        if (res.confirm) {
          this.setData({
            showBookModal: false,
            showPaymentModal: true,
            paymentAmount: amount,
            paymentQRCode: h.qrCode,
            paymentWechat: h.wechat
          });
        }
      }
    });
  },

  previewPaymentQRCode() {
    const url = this.data.paymentQRCode;
    if (!url) return;
    wx.previewImage({ current: url, urls: [url] });
  },

  hidePaymentModal() {
    this.setData({ showPaymentModal: false });
  },

  confirmPayment() {
    const wechat = this.data.paymentWechat;
    this.setData({ showPaymentModal: false });
    wx.showModal({
      title: '支付完成',
      content: `请添加客服微信：${wechat} 发送支付截图确认订单`,
      showCancel: false,
      confirmText: '复制客服微信',
      success: () => {
        wx.setClipboardData({ data: wechat, success: () => wx.showToast({ title: '客服微信已复制', icon: 'success' }) });
      }
    });
  },

  onAlbumTap() { wx.showToast({ title: '相册功能开发中', icon: 'none' }); },
  onMapTap() { wx.showToast({ title: '地图导航开发中', icon: 'none' }); },
  onAllQaTap() { wx.showToast({ title: '问大家开发中', icon: 'none' }); },
  onAllReviewsTap() { wx.showToast({ title: '全部评价开发中', icon: 'none' }); }
});
