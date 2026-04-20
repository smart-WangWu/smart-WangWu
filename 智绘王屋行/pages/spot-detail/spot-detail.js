// pages/spot-detail/spot-detail.js
// 每个景点的导游列表（导游预定）
const GUIDES_BY_SPOT = {
  1: [
    { id: 1, name: '张明远', title: '道教文化研究者', intro: '深耕王屋山文史，擅长天坛极顶讲解' },
    { id: 2, name: '李静', title: '资深讲解员', intro: '5年带团经验，讲解生动易懂' },
    { id: 3, name: '王建峰', title: '本地金牌导游', intro: '王屋山本地人，熟悉一草一木' },
    { id: 4, name: '刘慧', title: '文化导师', intro: '黄帝祭天、愚公移山故事专长' }
  ],
  2: [
    { id: 1, name: '陈志刚', title: '王屋山起点讲解', intro: '道境广场与景区路线深度讲解' },
    { id: 2, name: '赵丽', title: '文化之旅讲师', intro: '儒家与道家文化对比讲解' },
    { id: 3, name: '孙伟', title: '精品小团领队', intro: '2小时精讲，节奏把控到位' }
  ]
};

const SPOTS = {
  1: {
    id: 1,
    name: '天坛极顶',
    subtitle: '总仙宫',
    image: 'https://youke.xn--y7xa690gmna.cn/s1/2026/01/26/697764e4479c2.webp',
    description: '海拔1715米，道教圣地。轩辕黄帝曾在此设坛祭天，登顶可一览王屋山全貌。',
    tags: ['3小时时长', '山顶景点', '金牌讲解'],
    price: 168,
    experienceCount: 2567,
    fontClass: 'webfont'
  },
  2: {
    id: 2,
    name: '道境广场',
    subtitle: '王屋山起点',
    image: 'https://youke.xn--y7xa690gmna.cn/s1/2026/01/26/697764e2769a2.webp',
    description: '若问古今兴废事，请君只看王屋山。售票处与景区入口，文化之旅起点。',
    tags: ['精品小团', '文化之旅', '2小时精讲'],
    price: 208,
    experienceCount: 568,
    fontClass: 'webfont2'
  }
};

Page({
  data: {
    spot: null,
    guides: [],
    selectedGuideId: null,
    selectedGuide: null,
    showBookModal: false,
    bookDate: '',
    bookCount: 1,
    bookName: '',
    bookPhone: '',
    bookAgreed: false,
    today: ''
  },

  onLoad(options) {
    const id = options.id ? parseInt(options.id, 10) : 1;
    const spot = SPOTS[id] || SPOTS[1];
    const guides = GUIDES_BY_SPOT[id] || GUIDES_BY_SPOT[1] || [];
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    wx.setNavigationBarTitle({ title: spot.name + ' · 导游预定' });
    this.setData({ spot, guides, today });
  },

  onSelectGuide(e) {
    const id = e.currentTarget.dataset.id;
    const guide = (this.data.guides || []).find(g => g.id === id) || null;
    this.setData({ selectedGuideId: id, selectedGuide: guide });
  },

  onBookTap() {
    if (!this.data.selectedGuide) {
      wx.showToast({ title: '请先选择一位导游', icon: 'none' });
      return;
    }
    this.setData({ showBookModal: true });
  },

  preventClose() {},

  closeBookModal() {
    this.setData({
      showBookModal: false,
      bookDate: '',
      bookCount: 1,
      bookName: '',
      bookPhone: '',
      bookAgreed: false
    });
  },

  onBookAgreeChange(e) {
    this.setData({ bookAgreed: e.detail.value && e.detail.value.length > 0 });
  },

  onDateChange(e) {
    this.setData({ bookDate: e.detail.value });
  },

  onCountChange(e) {
    const idx = parseInt(e.detail.value, 10);
    this.setData({ bookCount: isNaN(idx) ? 1 : Math.min(10, Math.max(1, idx + 1)) });
  },

  onNameInput(e) {
    this.setData({ bookName: (e.detail.value || '').trim() });
  },

  onPhoneInput(e) {
    this.setData({ bookPhone: (e.detail.value || '').trim() });
  },

  submitBooking() {
    const { spot, bookDate, bookCount, bookName, bookPhone, bookAgreed } = this.data;
    if (!bookAgreed) {
      wx.showToast({ title: '请先阅读并同意用户服务协议与隐私政策', icon: 'none', duration: 2500 });
      return;
    }
    if (!bookDate) {
      wx.showToast({ title: '请选择预约日期', icon: 'none' });
      return;
    }
    if (!bookName) {
      wx.showToast({ title: '请填写姓名', icon: 'none' });
      return;
    }
    if (!bookPhone) {
      wx.showToast({ title: '请填写手机号', icon: 'none' });
      return;
    }
    const phoneReg = /^1\d{10}$/;
    if (!phoneReg.test(bookPhone)) {
      wx.showToast({ title: '请填写正确手机号', icon: 'none' });
      return;
    }
    this.closeBookModal();
    wx.showToast({
      title: '导游预约已提交',
      icon: 'success',
      duration: 2000
    });
    // 可在此调用后端接口保存导游预约
  }
});
