Page({
    data: {
      query: {},
      // 存储完整原始数据 - 包含原有的2家和新加的4家民宿
      allShopList: [
        {
          id: 6,
          name: "老家精品民宿",
          image: "https://gitee.com/ty-4895/picture/raw/master/20250822143424842.jpg",
          address: "王屋山景区入口愚公村新小区四排8号",       
          price: 100,
          lianjie: "http://dpurl.cn/8bPHHk4z",
          type: "民宿",
          reason: "整洁卫生；农家菜推荐；有自助烧烤",
          wechat: "chunli903510"
        },
        {
          id: 7,
          name: "山里人家精品民宿",
          image: "https://gitee.com/ty-4895/picture/raw/master/20250822143443043.jpg",
          address: "王屋山风景区入口愚公村",       
          price: 100,
          lianjie: "http://dpurl.cn/mRDGu39z",
          type: "民宿",
          reason: "性价比较高；农家菜推荐；含带黄河三峡门票",
          wechat: "longge461059"
        },
        // 新增的4家民宿
        {
          id: 15,
          name: "老乡亲精品民宿",
          image: "https://gitee.com/ty-4895/picture/raw/master/20251115233435844.png", 
          address: "济源市王屋镇愚公新社区南1排4号",       
          price: 200,
          lianjie: "#",
          type: "民宿",
          reason: "王屋山特色风格的建筑，旅店配有活动场所，方便休闲娱乐，具有非常强的适居性",
          wechat: "wxid_g6m80xinwujk22"
        },
        {
          id: 16,
          name: "老房东民宿馆",
          image: "https://gitee.com/ty-4895/picture/raw/master/20251115233412125.png", 
          address: "济源市王屋镇王屋山停车场东50米愚公新社区南一排三号",       
          price: 135,
          lianjie: "#",
          type: "民宿",
          reason: "房屋整洁干净，具有较多绿植，是以中国传统式建筑为基调的具有现代化特色的旅店",
          wechat: "lfd15539116763"
        },
        {
          id: 17,
          name: "秋缘农家乐",
          image: "https://gitee.com/ty-4895/picture/raw/master/20251115233449543.png", 
          address: "河南省济源市王屋山景区南侧约300米",       
          price: 100,
          lianjie: "#",
          type: "农家乐",
          reason: "饭菜可口，房主热情，价格实惠，临近街道",
          wechat: "wxid_4bdv3i8obgx422"
        },
        {
          id: 18,
          name: "常相聚农家乐",
          image: "https://gitee.com/ty-4895/picture/raw/master/20251115233353798.png",
          address: "河南省济源市愚公村一排2号",       
          price: 100,
          lianjie: "#",
          type: "农家乐",
          reason: "靠近王屋老街和王屋山景区入口，房间干净，布施整洁",
          wechat: "wxid_ljj074vmrexr12"
        }
      ],
      // 用于渲染的数组（分页加载的内容）
      shopList: [],
      page: 1,
      pageSize: 5,
      total: 0,
      loading: false,

      // 表单相关数据
      showBookModal: false,
      showPaymentModal: false,
      currentHotel: null,
      currentPaymentQRCode: '',
      currentWechat: '',
      paymentAmount: 0,
      paymentDetail: {}, // 支付明细
      formData: {
        name: '',
        phone: '',
        roomType: 'single',
        quantity: 1,
        checkInDate: '',
        checkOutDate: '',
        meals: ['breakfast'],
        dietaryRequirements: ''
      },
      formAgreed: false,
      roomTypes: [
        { name: '单人间', value: 'single' },
        { name: '双人间', value: 'double' },
        { name: '三人间', value: 'triple' }
      ],
      mealOptions: [
        { name: '早餐', value: 'breakfast' },
        { name: '午餐', value: 'lunch' },
        { name: '晚餐', value: 'dinner' }
      ]
    },

    // 页面加载
    onLoad(options) {
      this.setData({
        query: options,
        total: this.data.allShopList.length
      });
      this.getShopList();
    },

    // 获取民宿列表（分页）
    getShopList(cb) {
      this.setData({ loading: true });
      wx.showLoading({ title: '加载中...' });
      setTimeout(() => {
        const start = (this.data.page - 1) * this.data.pageSize;
        const end = start + this.data.pageSize;
        const newPageData = this.data.allShopList.slice(start, end);
        const targetData = this.data.page === 1
          ? newPageData
          : [...this.data.shopList, ...newPageData];
        this.setData({ shopList: targetData, loading: false });
        wx.hideLoading();
        cb && cb();
      }, 400);
    },

    // 下拉刷新
    onPullDownRefresh() {
      this.setData({ page: 1 });
      this.getShopList(() => wx.stopPullDownRefresh());
    },

    // 上拉加载更多
    onReachBottom() {
      if (this.data.shopList.length >= this.data.total) {
        return wx.showToast({ title: '已加载全部', icon: 'none' });
      }
      this.setData({ page: this.data.page + 1 });
      this.getShopList();
    },

    // 显示预订表单
    showBookForm: function(event) {
      const index = event.currentTarget.dataset.index;
      const hotel = this.data.shopList[index];
      
      this.setData({
        showBookModal: true,
        currentHotel: hotel,
        formData: {
          name: '',
          phone: '',
          roomType: 'single',
          quantity: 1,
          checkInDate: this.getTomorrowDate(),
          checkOutDate: '',
          meals: ['breakfast'],
          dietaryRequirements: ''
        }
      });
    },

    // 隐藏表单
    hideBookModal: function() {
      this.setData({
        showBookModal: false
      });
    },

    // 阻止点击弹窗内容区域时关闭（仅点击遮罩关闭）
    preventClose: function() {},

    // 获取明天日期
    getTomorrowDate: function() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    },

    // 表单输入处理
    onNameInput: function(e) {
      this.setData({
        'formData.name': e.detail.value
      });
    },

    onPhoneInput: function(e) {
      this.setData({
        'formData.phone': e.detail.value
      });
    },

    onRoomTypeChange: function(e) {
      this.setData({
        'formData.roomType': e.currentTarget.dataset.value
      });
    },

    // 修复：正确处理多选框变化
    onMealChange: function(e) {
      console.log('多选框变化:', e.detail.value);
      this.setData({
        'formData.meals': e.detail.value
      });
    },

    onDietaryInput: function(e) {
      this.setData({
        'formData.dietaryRequirements': e.detail.value
      });
    },

    // 入住日期选择，添加日期验证
    onCheckInDateChange: function(e) {
      const checkInDate = e.detail.value;
      const checkOutDate = this.data.formData.checkOutDate;
      
      this.setData({
        'formData.checkInDate': checkInDate
      });
      
      // 如果已选择退房日期且退房日期小于等于入住日期，清空退房日期
      if (checkOutDate && checkOutDate <= checkInDate) {
        wx.showToast({
          title: '入住日期已变更，请重新选择退房日期',
          icon: 'none'
        });
        this.setData({
          'formData.checkOutDate': ''
        });
      }
    },

    // 退房日期选择，添加日期验证
    onCheckOutDateChange: function(e) {
      const checkOutDate = e.detail.value;
      const checkInDate = this.data.formData.checkInDate;
      
      // 验证退房日期是否大于入住日期
      if (checkInDate && checkOutDate <= checkInDate) {
        wx.showToast({
          title: '退房日期必须大于入住日期',
          icon: 'none'
        });
        return;
      }
      
      this.setData({
        'formData.checkOutDate': checkOutDate
      });
    },

    // 数量调整
    increaseQuantity: function() {
      if (this.data.formData.quantity < 10) {
        this.setData({
          'formData.quantity': this.data.formData.quantity + 1
        });
      }
    },

    decreaseQuantity: function() {
      if (this.data.formData.quantity > 1) {
        this.setData({
          'formData.quantity': this.data.formData.quantity - 1
        });
      }
    },

    // 获取民宿对应的付款码和客服微信 - 更新为6家民宿
    getHotelPaymentInfo: function(hotelId) {
      const paymentInfo = {
        6: {//老家精品民宿
          qrCode: "https://picui.ogmua.cn/s1/2026/03/13/69b39e769e375.webp",
          wechat: "chunli903510"
        },
        7: {//山里人家精品民宿
          qrCode: "https://picui.ogmua.cn/s1/2026/03/13/69b39e88a048f.webp",
          wechat: "longge461059"
        },
        15: {//老乡亲精品民宿
          qrCode: "https://picui.ogmua.cn/s1/2026/03/13/69b39e76e2313.webp",
          wechat: "wxid_g6m80xinwujk22"
        },
        16: {//老房东精品民宿馆
          qrCode: "https://picui.ogmua.cn/s1/2026/03/13/69b39e75a5d1d.webp",
          wechat: "lfd15539116763"
        },
        17: {//秋缘农家乐
          qrCode: "https://picui.ogmua.cn/s1/2026/03/13/69b39e7754e13.webp",
          wechat: "wxid_4bdv3i8obgx422"
        },
        18: {//常相聚农家乐
          qrCode: "https://picui.ogmua.cn/s1/2026/03/13/69b39e74b6407.webp",
          wechat: "wxid_ljj074vmrexr12"
        }
      };
      return paymentInfo[hotelId] || {
        qrCode: "https://你的图床地址.com/默认付款码.jpg",
        wechat: "wgcygc001"
      };
    },

    // 计算入住晚数 - 修正版（退房当天不住人）
    calculateNights: function(checkInDate, checkOutDate) {
      if (!checkInDate || !checkOutDate) {
        return 1; // 默认1晚
      }
      
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      
      // 验证日期有效性
      if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
        return 1; // 日期无效时返回1晚
      }
      
      // 计算两个日期之间的天数差（不包括退房当天）
      // 例如：1月1日入住，1月2日退房 = 住1晚
      const timeDiff = checkOut.getTime() - checkIn.getTime();
      const nights = Math.floor(timeDiff / (1000 * 3600 * 24)); // 关键修改：使用Math.floor
      
      console.log('入住天数详细计算:', {
        入住日期: checkInDate,
        退房日期: checkOutDate,
        入住时间: checkIn.toLocaleDateString(),
        退房时间: checkOut.toLocaleDateString(),
        时间差毫秒: timeDiff,
        计算晚数: nights
      });
      
      // 确保至少住1晚
      return nights > 0 ? nights : 1;
    },

    // 计算金额 - 使用正确的入住天数
    calculateAmount: function(basePrice, quantity, checkInDate, checkOutDate) {
      // 计算入住天数（正确版本）
      const nights = this.calculateNights(checkInDate, checkOutDate);
      
      const totalAmount = basePrice * quantity * nights;
      
      console.log('完整金额计算:', {
        民宿: this.data.currentHotel?.name,
        每晚价格: basePrice,
        房间数量: quantity,
        入住日期: checkInDate,
        退房日期: checkOutDate,
        入住晚数: nights,
        总金额: totalAmount,
        计算公式: `${basePrice} × ${quantity} × ${nights} = ${totalAmount}`
      });
      
      return totalAmount;
    },

    // 勾选同意协议
    onFormAgreeChange: function(e) {
      this.setData({ formAgreed: e.detail.value && e.detail.value.length > 0 });
    },

    // 提交预订 - 修正版，添加入住天数确认
    submitBooking: function() {
      const formData = this.data.formData;
      const hotel = this.data.currentHotel;
      
      if (!this.data.formAgreed) {
        wx.showToast({ title: '请先阅读并同意用户服务协议与隐私政策', icon: 'none', duration: 2500 });
        return;
      }
      
      // 表单验证
      if (!formData.name.trim()) {
        wx.showToast({ title: '请输入姓名', icon: 'none' });
        return;
      }
      
      if (!formData.phone.trim() || !/^1[3-9]\d{9}$/.test(formData.phone)) {
        wx.showToast({ title: '请输入正确手机号', icon: 'none' });
        return;
      }
      
      if (!formData.checkInDate || !formData.checkOutDate) {
        wx.showToast({ title: '请选择入住退房日期', icon: 'none' });
        return;
      }
      
      // 验证退房日期是否大于入住日期
      if (formData.checkOutDate <= formData.checkInDate) {
        wx.showToast({ title: '退房日期必须大于入住日期', icon: 'none' });
        return;
      }
      
      // 计算入住天数
      const nights = this.calculateNights(formData.checkInDate, formData.checkOutDate);
      
      // 显示入住天数给用户确认
      wx.showModal({
        title: '确认预订信息',
        content: `您将入住 ${nights} 晚\n入住：${formData.checkInDate}\n退房：${formData.checkOutDate}\n确认继续支付？`,
        success: (res) => {
          if (res.confirm) {
            // 用户确认后计算金额
            const amount = this.calculateAmount(
              hotel.price, 
              formData.quantity, 
              formData.checkInDate, 
              formData.checkOutDate
            );
            
            // 获取对应民宿的付款码和客服微信
            const paymentInfo = this.getHotelPaymentInfo(hotel.id);
            
            // 显示付款码，同时显示计算明细
            this.showPaymentQRCode(amount, paymentInfo.qrCode, paymentInfo.wechat, {
              basePrice: hotel.price,
              quantity: formData.quantity,
              checkInDate: formData.checkInDate,
              checkOutDate: formData.checkOutDate,
              nights: nights
            });
          }
        }
      });
    },

    // 显示付款码
    showPaymentQRCode: function(amount, qrCode, wechat, detail) {
      this.setData({
        showBookModal: false,
        showPaymentModal: true,
        paymentAmount: amount,
        currentPaymentQRCode: qrCode,
        currentWechat: wechat,
        paymentDetail: detail // 保存支付明细用于显示
      });
    },

    // 点击收款码放大预览
    previewPaymentQRCode: function() {
      const url = this.data.currentPaymentQRCode;
      if (!url) return;
      wx.previewImage({
        current: url,
        urls: [url]
      });
    },

    // 隐藏付款码
    hidePaymentModal: function() {
      this.setData({
        showPaymentModal: false
      });
    },

    // 确认支付完成
    confirmPayment: function() {
      const wechat = this.data.currentWechat;
      
      this.setData({
        showPaymentModal: false
      });
      
      wx.showModal({
        title: '支付完成',
        content: `请添加客服微信：${wechat} 发送支付截图确认订单`,
        showCancel: false,
        confirmText: '复制客服微信',
        success: () => {
          wx.setClipboardData({
            data: wechat,
            success: () => {
              wx.showToast({
                title: '客服微信已复制',
                icon: 'success'
              });
            }
          });
        }
      });
    }
  })