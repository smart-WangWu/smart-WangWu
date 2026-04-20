// pages/onepage/onepage.js
Page({
  data: {
    sections: [
      {
        id: '1',
        title: '核心人文景点',
        fontClass: 'webfont-dakai',
        list: [
          { id: 1, name: '天坛极顶', description: '王屋山主峰，海拔1715米，道教圣地。轩辕黄帝曾在此设坛祭天，登顶可一览王屋山全貌。', imageUrl: 'https://wang-img-bed.oss-cn-beijing.aliyuncs.com/img/%E5%A4%A9%E5%9D%9B%E6%9E%81%E9%A1%B6.png', rating: 4.8, bestTime: '清晨观云海' },
          { id: 2, name: '愚公移山群雕', description: '高10.5米，刻画愚公及子孙挖山场景，体现“改造中国”精神。旁有愚公故居、古井等战国风貌展示。', imageUrl: 'https://wang-img-bed.oss-cn-beijing.aliyuncs.com/img/%E6%84%9A%E5%85%AC%E7%A7%BB%E5%B1%B1.jpg', rating: 4.9, bestTime: '全年' },
          { id: 3, name: '阳台宫', description: '王屋山道教建筑起点，现存明代三清殿与玉皇阁。玉皇阁为三重檐阁式建筑，石刻柱雕有云龙、八仙过海等图案，艺术价值极高。', imageUrl: 'https://wang-img-bed.oss-cn-beijing.aliyuncs.com/img/%E9%98%B3%E5%8F%B0%E5%AE%AB.jpg', rating: 4.7, bestTime: '全年' }
        ]
      },
      {
        id: '2',
        title: '自然与生态奇观',
        fontClass: 'webfont-eco',
        list: [
          { id: 1, name: '千年银杏', description: '树龄2500年的银杏树，高45米，需7人合围。秋季满树金黄，为道教神树。', imageUrl: 'https://gitee.com/ty-4895/picture/raw/master/20250822181451334.jpg', rating: 4.6, bestTime: '10月下旬-11月' },
          { id: 2, name: '王母洞与灵山洞', description: '天然溶洞深60余米，传为王母娘娘修炼地。洞内冬暖夏凉，钟乳石形态各异。', imageUrl: 'https://gitee.com/ty-4895/picture/raw/master/20250822181502317.jpg', rating: 4.5, bestTime: '夏季' }
        ]
      },
      {
        id: '3',
        title: '地质与登山景观',
        fontClass: 'webfont-geology',
        list: [
          { id: 1, name: '天坛神路', description: '4公里山脊步道，连接看山庙、雷公庙等十余座小庙，需攀爬4631级台阶，沿途可见女娲补天石、仙人桥等奇石。', imageUrl: 'https://gitee.com/ty-4895/picture/raw/master/20250822181526290.jpg', rating: 4.6, bestTime: '全年' },
          { id: 2, name: '天坛索道', description: '全长1526米，提升高度660米（1号支架高86米，亚洲第一）。原需3小时登山，乘索道仅10分钟达日精峰，再步行30分钟至天坛顶。', imageUrl: 'https://gitee.com/ty-4895/picture/raw/master/20250822181451334.jpg', rating: 4.5, bestTime: '全年' }
        ]
      },
      {
        id: '4',
        title: '道教文化遗址',
        fontClass: 'webfont-taoist',
        list: [
          { id: 1, name: '轩辕殿', description: '轩辕黄帝访广成子之地，后为司马承祯著经处。现存基址，坐北朝南，主轴直对天坛峰。', imageUrl: 'https://gitee.com/ty-4895/picture/raw/master/20250822181502317.jpg', rating: 4.6, bestTime: '全年' },
          { id: 2, name: '紫微宫', description: '王屋山道教“三宫之首”，建于高台上，对应星象紫微星，寓意中枢之地。', imageUrl: 'https://wang-img-bed.oss-cn-beijing.aliyuncs.com/img/%E9%98%B3%E5%8F%B0%E5%AE%AB.jpg', rating: 4.5, bestTime: '全年' }
        ]
      },
      {
        id: '5',
        title: '季节限定景观',
        fontClass: 'webfont-season',
        list: [
          { id: 1, name: '王屋红叶', description: '10月底至11月中旬，百里层林尽染，以五斗峰、华盖峰周边最盛。华盖峰春有桃花、秋有红叶，又称“花果山”。', imageUrl: 'https://wang-img-bed.oss-cn-beijing.aliyuncs.com/img/%E7%8E%8B%E5%B1%8B%E7%BA%A2%E5%8F%B6.jpg', rating: 4.6, bestTime: '10月下旬-11月' }
        ]
      }
    ]
  },

  onTitleImgError(e) {
    console.error('[风景页] 标题装饰图加载失败', e.detail);
  },

  onLoad() {},

  onPullDownRefresh() {
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 300);
  },

  onReachBottom() {
    wx.showToast({ title: '已加载全部', icon: 'none' });
  },

  onShareAppMessage() {}
});
