// pages/threepage/threepage.js - 王屋山攻略
Page({
  data: {
    recommendActive: 'food',
    routeList: [
      {
        id: 1,
        badge: '经典路线',
        title: '步行登山路线',
        image: 'https://gitee.com/ty-4895/picture/raw/master/20250822181526290.jpg',
        durationShort: '4-5小时',
        difficultyShort: '挑战级',
        duration: '4-5小时',
        difficultyStars: '★★★',
        stops: '道境广场(售票处)→王屋老街→上阳台帖→愚公故居→愚公移山像→地质博物馆→财神殿→灵官殿→玄坛殿→太乙池→舍身崖→总仙宫(天坛极顶)'
      },
      {
        id: 2,
        badge: '推荐路线',
        title: '索道步行路线',
        image: 'https://gitee.com/ty-4895/picture/raw/master/20250822181502317.jpg',
        durationShort: '2-3小时',
        difficultyShort: '中等难度',
        duration: '2-3小时',
        difficultyStars: '★★',
        stops: '道境广场(售票处)→地质博物馆→索道下站→索道上站→扶条阁→白皮松紫薇长廊→清风台→休闲服务区→太乙池→舍身崖→总仙宫(天坛极顶)'
      },
      {
        id: 3,
        badge: '轻松路线',
        title: '索道游览路线',
        image: 'https://gitee.com/ty-4895/picture/raw/master/20250822181451334.jpg',
        durationShort: '1.5-2小时',
        difficultyShort: '轻松级',
        duration: '1.5-2小时',
        difficultyStars: '★',
        stops: '道境广场(售票处)→地质博物馆→索道下站→索道上站→扶条阁→白皮松→紫薇长廊时空隧道→飞天崖入口→清风台→休闲服务区→总仙宫(天坛极顶)'
      }
    ],
    foodRecommend: [],
    homestayRecommend: [
      { id: 6, name: '老家精品民宿', desc: '整洁卫生，农家菜推荐', price: '100', image: 'https://gitee.com/ty-4895/picture/raw/master/20250822143424842.jpg' },
      { id: 7, name: '山里人家精品民宿', desc: '性价比高，含黄河三峡门票', price: '100', image: 'https://gitee.com/ty-4895/picture/raw/master/20250822143443043.jpg' },
      { id: 15, name: '老乡亲精品民宿', desc: '王屋山特色风格，活动场所齐全', price: '200', image: 'https://gitee.com/ty-4895/picture/raw/master/20251115233435844.png' }
    ],
    budgetQA: [
      { id: 1, question: '门票大概多少钱？', answer: '王屋山景区门票约 50–65 元/人（以景区公示为准），索道往返另计，约 80–120 元。建议提前在官方或合作平台购票。', open: false },
      { id: 2, question: '住宿一晚预算多少？', answer: '景区周边民宿、农家乐约 100–200 元/晚，节假日可能上浮。提前预订更划算。', open: false },
      { id: 3, question: '餐饮一天大概花多少？', answer: '景区内及周边简餐、农家菜人均约 40–80 元/天，丰俭由人。', open: false },
      { id: 4, question: '一日游 / 两日游总预算参考？', answer: '一日游（含门票、索道、餐饮）：约 200–350 元/人。两日游（含一晚住宿）：约 400–600 元/人。', open: false }
    ]
  },

  onLoad() {},

  setRecommendActive(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({ recommendActive: type });
  },

  toggleQA(e) {
    const index = e.currentTarget.dataset.index;
    const list = this.data.budgetQA.map((item, i) => ({ ...item, open: i === index ? !item.open : false }));
    this.setData({ budgetQA: list });
  },

  goFood() {
    wx.navigateTo({ url: '/pages/fourpage/fourpage' });
  },

  goHomestay() {
    wx.navigateTo({ url: '/pages/twopage/twopage' });
  }
});
