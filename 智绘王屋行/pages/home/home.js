// pages/home/home.js
Page({
  data: {
    statusBarHeight: 20,
    navBarHeight: 64,
    imgUrls: [
      'https://picui.ogmua.cn/s1/2026/03/10/69afe6ccabe60.webp',
      'https://picui.ogmua.cn/s1/2026/03/10/69afe6cbe0783.webp',
      'https://picui.ogmua.cn/s1/2026/03/10/69afe6cb58582.webp',
      'https://gitee.com/ty-4895/picture/raw/master/20250822181451334.jpg',
      'https://gitee.com/ty-4895/picture/raw/master/20250822181502317.jpg',
      'https://gitee.com/ty-4895/picture/raw/master/20250822181526290.jpg'
    ],
    current: 0,
    // 天气信息
    weather: {
      tempRange: '0~4℃',
      condition: '小雨',
      cloudSeaProb: 60,
      sunriseTime: '7:00',
      visibilityProb: 45
    },
    // 核心景点列表
    sceneryList: [
      {
        id: 1,
        name: '天坛极顶',
        image: 'https://wang-img-bed.oss-cn-beijing.aliyuncs.com/img/%E5%A4%A9%E5%9D%9B%E6%9E%81%E9%A1%B6.png'
      },
      {
        id: 2,
        name: '道境广场',
        image: 'https://wang-img-bed.oss-cn-beijing.aliyuncs.com/img/%E9%81%93%E5%A2%83%E5%B9%BF%E5%9C%BA.jpg'
      },
      {
        id: 3,
        name: '阳台宫',
        image: 'https://wang-img-bed.oss-cn-beijing.aliyuncs.com/img/%E9%98%B3%E5%8F%B0%E5%AE%AB.jpg'
      },
      {
        id: 4,
        name: '千年银杏',
        image: 'https://gitee.com/ty-4895/picture/raw/master/20250822181451334.jpg'
      },
      {
        id: 5,
        name: '太乙池',
        image: 'https://gitee.com/ty-4895/picture/raw/master/20250822181502317.jpg'
      },
      {
        id: 6,
        name: '天坛神路',
        image: 'https://gitee.com/ty-4895/picture/raw/master/20250822181526290.jpg'
      }
    ],
    // 首页民宿推荐（展示 2 个）
    homestayPreviewList: [
      {
        id: 6,
        name: "老家精品民宿",
        image: "https://gitee.com/ty-4895/picture/raw/master/20250822143424842.jpg",
        price: 100,
        type: "民宿",
        reason: "整洁卫生；农家菜推荐；有自助烧烤"
      },
      {
        id: 7,
        name: "山里人家精品民宿",
        image: "https://gitee.com/ty-4895/picture/raw/master/20250822143443043.jpg",
        price: 100,
        type: "民宿",
        reason: "性价比较高；农家菜推荐；含带黄河三峡门票"
      },
      {
        id: 15,
        name: "老乡亲精品民宿",
        image: "https://gitee.com/ty-4895/picture/raw/master/20251115233435844.png",
        price: 200,
        type: "民宿",
        reason: "王屋山特色风格建筑，配有活动场所，适合休闲娱乐"
      }
    ],
    // 民宿地图（用于在三种路线地图中叠加显示民宿）
    homestayList: [
      {
        id: 6,
        name: "老家精品民宿",
        address: "王屋山景区入口愚公村新小区四排8号",
        price: 100,
        type: "民宿",
        image: "https://gitee.com/ty-4895/picture/raw/master/20250822143424842.jpg"
      },
      {
        id: 7,
        name: "山里人家精品民宿",
        address: "王屋山风景区入口愚公村",
        price: 100,
        type: "民宿",
        image: "https://gitee.com/ty-4895/picture/raw/master/20250822143443043.jpg"
      },
      {
        id: 15,
        name: "老乡亲精品民宿",
        address: "济源市王屋镇愚公新社区南1排4号",
        price: 200,
        type: "民宿",
        image: "https://gitee.com/ty-4895/picture/raw/master/20251115233435844.png"
      },
      {
        id: 16,
        name: "老房东民宿馆",
        address: "济源市王屋镇王屋山停车场东50米愚公新社区南一排三号",
        price: 135,
        type: "民宿",
        image: "https://gitee.com/ty-4895/picture/raw/master/20251115233412125.png"
      },
      {
        id: 17,
        name: "秋缘农家乐",
        address: "河南省济源市王屋山景区南侧约300米",
        price: 100,
        type: "农家乐",
        image: "https://gitee.com/ty-4895/picture/raw/master/20251115233449543.png"
      },
      {
        id: 18,
        name: "常相聚农家乐",
        address: "河南省济源市愚公村一排2号",
        price: 100,
        type: "农家乐",
        image: "https://gitee.com/ty-4895/picture/raw/master/20251115233353798.png"
      }
    ],
    // 搜索用：全部景点名称（与风景页一致，便于搜索）
    allSceneryList: [
      { name: '天坛极顶' }, { name: '愚公移山群雕' }, { name: '阳台宫' },
      { name: '千年银杏' }, { name: '王母洞与灵山洞' }, { name: '天坛神路' }, { name: '天坛索道' },
      { name: '轩辕殿' }, { name: '紫微宫' }, { name: '王屋红叶' }, { name: '道境广场' }, { name: '太乙池' }
    ],
    // 搜索浮层
    searchShow: false,
    searchKeyword: '',
    searchSceneryResults: [],
    searchHomestayResults: [],
    // 腾讯地图 key，用于把“民宿地址”自动转换为经纬度
    tencentMapKey: '4MGBZ-FQ4EL-FDMPF-E2JHJ-RKRDT-3NB3Y',
    // 自定义气泡用：有坐标的民宿列表（name/price/image），供 callout 插槽渲染
    homestayCalloutList: [],
    // 民宿经纬度（腾讯地图解析；解析前用兜底坐标保证能显示）
    homestayLocations: {
      6: { latitude: 35.2069, longitude: 112.4468 },
      7: { latitude: 35.2074, longitude: 112.4475 },
      15: { latitude: 35.2066, longitude: 112.4483 },
      16: { latitude: 35.2068, longitude: 112.4489 },
      17: { latitude: 35.2059, longitude: 112.4479 },
      18: { latitude: 35.2062, longitude: 112.4471 }
    },
    // 地图相关数据
    longitude: 112.4530,  // 王屋山风景区中心经度（调整以包含所有景点）
    latitude: 35.2100,   // 王屋山风景区中心纬度
    scale: 14,           // 地图缩放级别（调小以显示更大范围，包含所有路线）
    scaleLabel: '500米', // 比例尺文字（仅米制，随缩放更新）
    markers: [
      {
        id: 1,
        longitude: 112.4567,
        latitude: 35.2134,
        width: 22,
        height: 22,
        title: '总仙宫（天坛极顶）',
        callout: {
          content: '总仙宫（天坛极顶）\n海拔1715米，道教圣地',
          color: '#333333',
          fontSize: 16,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 12,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      {
        id: 2,
        longitude: 112.4489,
        latitude: 35.2089,
        width: 22,
        height: 22,
        title: '愚公移山像',
        callout: {
          content: '愚公移山像\n高10.5米，体现改造中国精神',
          color: '#333333',
          fontSize: 16,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 12,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      {
        id: 23,
        longitude: 112.4487,
        latitude: 35.2087,
        width: 22,
        height: 22,
        title: '愚公故居',
        callout: {
          content: '愚公故居\n愚公居住地',
          color: '#333333',
          fontSize: 14,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 10,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      {
        id: 3,
        longitude: 112.4523,
        latitude: 35.2101,
        width: 22,
        height: 22,
        title: '阳台宫',
        callout: {
          content: '阳台宫\n王屋山道教建筑起点',
          color: '#333333',
          fontSize: 16,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 12,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      {
        id: 4,
        longitude: 112.4512,
        latitude: 35.2098,
        width: 22,
        height: 22,
        title: '千年银杏',
        callout: {
          content: '千年银杏\n树龄2500年，高45米',
          color: '#333333',
          fontSize: 16,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 12,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      {
        id: 5,
        longitude: 112.4545,
        latitude: 35.2112,
        width: 22,
        height: 22,
        title: '王母洞',
        callout: {
          content: '王母洞与灵山洞\n天然溶洞，传为王母修炼地',
          color: '#333333',
          fontSize: 16,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 12,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      {
        id: 6,
        longitude: 112.4578,
        latitude: 35.2145,
        width: 22,
        height: 22,
        title: '天坛神路',
        callout: {
          content: '天坛神路\n4公里山脊步道，4631级台阶',
          color: '#333333',
          fontSize: 16,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 12,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      {
        id: 7,
        longitude: 112.4556,
        latitude: 35.2123,
        width: 22,
        height: 22,
        title: '天坛索道',
        callout: {
          content: '天坛索道\n全长1526米，提升高度660米',
          color: '#333333',
          fontSize: 16,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 12,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      {
        id: 8,
        longitude: 112.4501,
        latitude: 35.2078,
        width: 22,
        height: 22,
        title: '轩辕殿',
        callout: {
          content: '轩辕殿\n轩辕黄帝访广成子之地',
          color: '#333333',
          fontSize: 16,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 12,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      {
        id: 9,
        longitude: 112.4495,
        latitude: 35.2095,
        width: 22,
        height: 22,
        title: '紫微宫',
        callout: {
          content: '紫微宫\n王屋山道教"三宫之首"',
          color: '#333333',
          fontSize: 16,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 12,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      // 路线上的关键景点标记
      {
        id: 10,
        longitude: 112.4470,
        latitude: 35.2070,
        width: 22,
        height: 22,
        title: '道境广场（售票处）',
        callout: {
          content: '道境广场（售票处）\n路线起点',
          color: '#333333',
          fontSize: 14,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 10,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      {
        id: 11,
        longitude: 112.4485,
        latitude: 35.2085,
        width: 22,
        height: 22,
        title: '王屋老街',
        callout: {
          content: '王屋老街\n历史文化街区',
          color: '#333333',
          fontSize: 14,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 10,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      {
        id: 12,
        longitude: 112.4500,
        latitude: 35.2095,
        width: 22,
        height: 22,
        title: '上阳台帖',
        callout: {
          content: '上阳台帖\n文化景点',
          color: '#333333',
          fontSize: 14,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 10,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      {
        id: 13,
        longitude: 112.4495,
        latitude: 35.2095,
        width: 22,
        height: 22,
        title: '地质博物馆',
        callout: {
          content: '地质博物馆\n地质知识展示',
          color: '#333333',
          fontSize: 14,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 10,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      {
        id: 14,
        longitude: 112.4550,
        latitude: 35.2105,
        width: 22,
        height: 22,
        title: '索道下站',
        callout: {
          content: '索道下站\n索道起点',
          color: '#333333',
          fontSize: 14,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 10,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      {
        id: 15,
        longitude: 112.4560,
        latitude: 35.2128,
        width: 22,
        height: 22,
        title: '扶桑阁',
        callout: {
          content: '扶桑阁\n观景平台',
          color: '#333333',
          fontSize: 14,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 10,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      {
        id: 16,
        longitude: 112.4562,
        latitude: 35.2130,
        width: 22,
        height: 22,
        title: '白皮松',
        callout: {
          content: '白皮松\n古树名木',
          color: '#333333',
          fontSize: 14,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 10,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      {
        id: 17,
        longitude: 112.4558,
        latitude: 35.2125,
        width: 22,
        height: 22,
        title: '紫藤长廊',
        callout: {
          content: '紫藤长廊\n景观步道',
          color: '#333333',
          fontSize: 14,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 10,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      {
        id: 18,
        longitude: 112.4560,
        latitude: 35.2127,
        width: 22,
        height: 22,
        title: '清风台',
        callout: {
          content: '清风台\n观景台',
          color: '#333333',
          fontSize: 14,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 10,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      {
        id: 19,
        longitude: 112.4562,
        latitude: 35.2129,
        width: 22,
        height: 22,
        title: '休闲服务区',
        callout: {
          content: '休闲服务区\n休息服务',
          color: '#333333',
          fontSize: 14,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 10,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      {
        id: 20,
        longitude: 112.4550,
        latitude: 35.2118,
        width: 22,
        height: 22,
        title: '舍身崖',
        callout: {
          content: '舍身崖\n险峻景观',
          color: '#333333',
          fontSize: 14,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 10,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      {
        id: 21,
        longitude: 112.4555,
        latitude: 35.2125,
        width: 22,
        height: 22,
        title: '老子祠',
        callout: {
          content: '老子祠\n道教文化',
          color: '#333333',
          fontSize: 14,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 10,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      {
        id: 22,
        longitude: 112.4561,
        latitude: 35.2127,
        width: 22,
        height: 22,
        title: '飞天魔毯入口',
        callout: {
          content: '飞天魔毯入口\n特殊交通工具',
          color: '#333333',
          fontSize: 14,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 10,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      {
        id: 24,
        longitude: 112.4501,
        latitude: 35.2078,
        width: 22,
        height: 22,
        title: '财神殿',
        callout: {
          content: '财神殿\n道教神殿',
          color: '#333333',
          fontSize: 14,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 10,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      {
        id: 25,
        longitude: 112.4505,
        latitude: 35.2080,
        width: 22,
        height: 22,
        title: '灵官殿',
        callout: {
          content: '灵官殿\n道教神殿',
          color: '#333333',
          fontSize: 14,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 10,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      },
      {
        id: 26,
        longitude: 112.4508,
        latitude: 35.2082,
        width: 22,
        height: 22,
        title: '玄坛殿',
        callout: {
          content: '玄坛殿\n道教神殿',
          color: '#333333',
          fontSize: 14,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 10,
          display: 'BYCLICK',
          textAlign: 'center'
        }
      }
    ],
    // 地图相关数据
    longitude: 112.4530,  // 王屋山风景区中心经度（调整以包含所有景点）
    latitude: 35.2100,   // 王屋山风景区中心纬度
    scale: 14,           // 地图缩放级别（调小以显示更大范围，包含所有路线）
    currentRoute: 'walking', // 当前选择的路线
    // 路线数据
    routes: {
      // 步行登山路线 - 将所有景点串联为一条完整路线
      walking: [
        {
          points: [
            { longitude: 112.4470, latitude: 35.2070 }, // 道境广场（售票处）- 起点
            { longitude: 112.4485, latitude: 35.2085 }, // 王屋老街
            { longitude: 112.4487, latitude: 35.2087 }, // 愚公故居
            { longitude: 112.4489, latitude: 35.2089 }, // 愚公移山像
            { longitude: 112.4495, latitude: 35.2095 }, // 地质博物馆/紫微宫
            { longitude: 112.4500, latitude: 35.2095 }, // 上阳台帖
            { longitude: 112.4501, latitude: 35.2078 }, // 财神殿/轩辕殿
            { longitude: 112.4505, latitude: 35.2080 }, // 灵官殿
            { longitude: 112.4508, latitude: 35.2082 }, // 玄坛殿
            { longitude: 112.4512, latitude: 35.2098 }, // 千年银杏
            { longitude: 112.4523, latitude: 35.2101 }, // 阳台宫
            { longitude: 112.4545, latitude: 35.2112 }, // 太乙池/王母洞
            { longitude: 112.4550, latitude: 35.2105 }, // 索道下站
            { longitude: 112.4550, latitude: 35.2118 }, // 舍身崖
            { longitude: 112.4555, latitude: 35.2125 }, // 老子祠
            { longitude: 112.4556, latitude: 35.2123 }, // 索道上站
            { longitude: 112.4558, latitude: 35.2125 }, // 紫藤长廊
            { longitude: 112.4560, latitude: 35.2127 }, // 清风台
            { longitude: 112.4560, latitude: 35.2128 }, // 扶桑阁
            { longitude: 112.4561, latitude: 35.2127 }, // 飞天魔毯入口
            { longitude: 112.4562, latitude: 35.2129 }, // 休闲服务区
            { longitude: 112.4562, latitude: 35.2130 }, // 白皮松
            { longitude: 112.4578, latitude: 35.2145 }, // 天坛神路
            { longitude: 112.4567, latitude: 35.2134 }  // 总仙宫（天坛极顶）- 终点
          ],
          color: '#4CAF50', // 绿色表示步行
          width: 6,
          borderColor: '#ffffff',
          borderWidth: 2,
          arrowLine: true
        }
      ],
      // 索道步行路线
      'cable-walk': [
        {
          points: [
            { longitude: 112.4470, latitude: 35.2070 }, // 道境广场（售票处）
            { longitude: 112.4495, latitude: 35.2095 }, // 地质博物馆（观光车）
            { longitude: 112.4550, latitude: 35.2105 }  // 索道下站（上山大巴）
          ],
          color: '#FF9800', // 橙色表示交通工具
          width: 6,
          borderColor: '#ffffff',
          borderWidth: 2,
          arrowLine: true
        },
        {
          points: [
            { longitude: 112.4550, latitude: 35.2105 }, // 索道下站
            { longitude: 112.4556, latitude: 35.2123 }  // 索道上站（索道）
          ],
          color: '#FF9800',
          width: 6,
          borderColor: '#ffffff',
          borderWidth: 2,
          arrowLine: true
        },
        {
          points: [
            { longitude: 112.4556, latitude: 35.2123 }, // 索道上站
            { longitude: 112.4560, latitude: 35.2128 }, // 扶桑阁
            { longitude: 112.4562, latitude: 35.2130 }  // 白皮松
          ],
          color: '#4CAF50', // 绿色表示步行
          width: 6,
          borderColor: '#ffffff',
          borderWidth: 2,
          arrowLine: true
        },
        {
          points: [
            { longitude: 112.4556, latitude: 35.2123 }, // 索道上站
            { longitude: 112.4558, latitude: 35.2125 }, // 紫藤长廊
            { longitude: 112.4560, latitude: 35.2127 }, // 清风台
            { longitude: 112.4562, latitude: 35.2129 }  // 休闲服务区
          ],
          color: '#4CAF50',
          width: 6,
          borderColor: '#ffffff',
          borderWidth: 2,
          arrowLine: true
        },
        {
          points: [
            { longitude: 112.4556, latitude: 35.2123 }, // 索道上站
            { longitude: 112.4545, latitude: 35.2112 }, // 太乙池
            { longitude: 112.4550, latitude: 35.2118 }, // 舍身崖
            { longitude: 112.4555, latitude: 35.2125 }  // 老子祠
          ],
          color: '#4CAF50',
          width: 6,
          borderColor: '#ffffff',
          borderWidth: 2,
          arrowLine: true
        },
        {
          points: [
            { longitude: 112.4556, latitude: 35.2123 }, // 索道上站
            { longitude: 112.4567, latitude: 35.2134 }  // 总仙宫（天坛极顶）
          ],
          color: '#4CAF50',
          width: 6,
          borderColor: '#ffffff',
          borderWidth: 2,
          arrowLine: true
        }
      ],
      // 索道魔毯路线
      'cable-magic': [
        {
          points: [
            { longitude: 112.4470, latitude: 35.2070 }, // 道境广场（售票处）
            { longitude: 112.4495, latitude: 35.2095 }, // 地质博物馆（观光车）
            { longitude: 112.4550, latitude: 35.2105 }  // 索道下站（上山大巴）
          ],
          color: '#FF9800', // 橙色表示交通工具
          width: 6,
          borderColor: '#ffffff',
          borderWidth: 2,
          arrowLine: true
        },
        {
          points: [
            { longitude: 112.4550, latitude: 35.2105 }, // 索道下站
            { longitude: 112.4556, latitude: 35.2123 }  // 索道上站（索道）
          ],
          color: '#FF9800',
          width: 6,
          borderColor: '#ffffff',
          borderWidth: 2,
          arrowLine: true
        },
        {
          points: [
            { longitude: 112.4556, latitude: 35.2123 }, // 索道上站
            { longitude: 112.4560, latitude: 35.2128 }, // 扶桑阁
            { longitude: 112.4562, latitude: 35.2130 }  // 白皮松
          ],
          color: '#4CAF50', // 绿色表示步行
          width: 6,
          borderColor: '#ffffff',
          borderWidth: 2,
          arrowLine: true
        },
        {
          points: [
            { longitude: 112.4556, latitude: 35.2123 }, // 索道上站
            { longitude: 112.4558, latitude: 35.2125 }, // 紫藤长廊
            { longitude: 112.4560, latitude: 35.2126 }, // 时空滑道（滑道）
            { longitude: 112.4561, latitude: 35.2127 }  // 飞天魔毯入口（魔毯）
          ],
          color: '#9C27B0', // 紫色表示特殊交通工具
          width: 6,
          borderColor: '#ffffff',
          borderWidth: 2,
          arrowLine: true
        },
        {
          points: [
            { longitude: 112.4556, latitude: 35.2123 }, // 索道上站
            { longitude: 112.4560, latitude: 35.2127 }, // 清风台
            { longitude: 112.4562, latitude: 35.2129 }  // 休闲服务区
          ],
          color: '#4CAF50',
          width: 6,
          borderColor: '#ffffff',
          borderWidth: 2,
          arrowLine: true
        },
        {
          points: [
            { longitude: 112.4556, latitude: 35.2123 }, // 索道上站
            { longitude: 112.4567, latitude: 35.2134 }  // 总仙宫（天坛极顶）
          ],
          color: '#4CAF50',
          width: 6,
          borderColor: '#ffffff',
          borderWidth: 2,
          arrowLine: true
        }
      ]
    },
    currentPolyline: [], // 当前显示的路线
    // 起点和终点圆点标记
    circles: [
      {
        // 起点 - 道境广场（售票处）
        longitude: 112.4470,
        latitude: 35.2070,
        color: '#4CAF50',  // 绿色表示起点
        fillColor: '#4CAF50',
        radius: 30,
        strokeWidth: 4,
        strokeColor: '#ffffff'
      },
      {
        // 终点 - 天坛极顶
        longitude: 112.4567,
        latitude: 35.2134,
        color: '#FF5722',  // 红色表示终点
        fillColor: '#FF5722',
        radius: 30,
        strokeWidth: 4,
        strokeColor: '#ffffff'
      }
    ]
  },

  onLoad(options) {
    const win = wx.getWindowInfo();
    const statusBarHeight = win.statusBarHeight || 20;
    const navBarHeight = statusBarHeight + 44;
    this.setData({ statusBarHeight, navBarHeight });

    // 加载真实天气数据
    this.fetchWeather();

    // 刀隶体（与 app.onLaunch 重复加载无妨，确保首页有字体）
    wx.loadFontFace({
      family: '阿里妈妈刀隶体 Regular',
      source: 'url("https://at.alicdn.com/wf/webfont/5LuYNrGy8FTF/3ehsW3D6cVN0.woff")',
      global: true,
      success: () => { this.setData({ _fontTick: Date.now() }); },
      fail: (e) => console.warn('刀隶体加载失败，请到微信公众平台添加 request 合法域名 at.alicdn.com', e)
    });
    wx.loadFontFace({
      family: '阿里妈妈刀隶体 客流',
      source: 'url("https://at.alicdn.com/wf/webfont/5LuYNrGy8FTF/6uVGLuPy6GCa.woff")',
      global: true,
      success: () => {},
      fail: () => {}
    });
    wx.loadFontFace({
      family: '阿里妈妈刀隶体 Regular 2',
      source: 'url("https://at.alicdn.com/wf/webfont/5LuYNrGy8FTF/0YmgSqcioysB.woff")',
      global: true,
      success: () => {},
      fail: (e) => console.warn('刀隶体 Regular 2 加载失败', e)
    });

    // 缓存“景点路线模式”的 markers/circles，避免切到“民宿分布”后丢失
    this._scenicMarkersCache = JSON.parse(JSON.stringify((this.data.markers || []).filter(m => (m?.id || 0) < 1000)));
    this._scenicCirclesCache = JSON.parse(JSON.stringify(this.data.circles || []));
    
    // 初始化上次已知缩放级别，用于缩放失败时的降级处理
    this._lastKnownScale = this.data.scale || 14;

    // 兜底坐标 + 本地缓存合并（缓存优先，保证至少显示兜底）
    const savedLocations = wx.getStorageSync('homestayLocations') || {};
    const fallback = this.data.homestayLocations || {};
    const merged = { ...fallback };
    if (savedLocations && typeof savedLocations === 'object') {
      Object.keys(savedLocations).forEach(function (id) {
        const loc = savedLocations[id];
        if (loc && typeof loc.latitude === 'number' && typeof loc.longitude === 'number') {
          merged[id] = loc;
        }
      });
      this.setData({ homestayLocations: merged });
    }

    // 腾讯地图根据地址解析经纬度（解析成功后会覆盖兜底并写缓存）
    this.geocodeHomestays();

    // 初始化显示步行路线
    this.switchRoute({ currentTarget: { dataset: { route: 'walking' } } });
  },

  onSearchTap() {
    this.setData({
      searchShow: true,
      searchKeyword: '',
      searchSceneryResults: [],
      searchHomestayResults: []
    });
  },
  onSearchClose() {
    this.setData({ searchShow: false, searchKeyword: '' });
  },
  onSearchInput(e) {
    const keyword = (e.detail.value || '').trim();
    const sceneryList = this.data.allSceneryList || [];
    const homestayList = this.data.homestayList || [];
    const searchSceneryResults = keyword
      ? sceneryList.filter(item => item.name.indexOf(keyword) !== -1)
      : [];
    const searchHomestayResults = keyword
      ? homestayList.filter(item =>
          item.name.indexOf(keyword) !== -1 ||
          (item.type && item.type.indexOf(keyword) !== -1) ||
          (item.address && item.address.indexOf(keyword) !== -1)
        )
      : [];
    this.setData({
      searchKeyword: e.detail.value || '',
      searchSceneryResults,
      searchHomestayResults
    });
  },
  onSearchResultTap(e) {
    const { type } = e.currentTarget.dataset;
    const { index } = e.currentTarget.dataset;
    this.setData({ searchShow: false });
    if (type === 'scenery') {
      wx.navigateTo({ url: '/pages/onepage/onepage' });
    } else if (type === 'homestay') {
      const item = this.data.searchHomestayResults[index];
      if (item) {
        wx.navigateTo({ url: `/pages/homestay-detail/index?id=${item.id}` });
      } else {
        wx.navigateTo({ url: '/pages/twopage/twopage' });
      }
    }
  },
  onLocationTap() {
    wx.openLocation({
      latitude: this.data.latitude || 35.21,
      longitude: this.data.longitude || 112.453,
      name: '王屋山风景区',
      scale: 14
    }).catch(() => wx.showToast({ title: '请授权位置', icon: 'none' }));
  },

  swiperChange: function(e) {
    this.setData({
      current: e.detail.current
    })
  },

  // 地图标记点点击事件
  onMarkerTap: function(e) {
    const markerId = e.detail.markerId;
    const marker = this.data.markers.find(m => m.id === markerId);
    if (!marker) return;

    // 民宿标记：直接打开腾讯地图导航
    if (markerId >= 1000) {
      const homestayId = markerId - 1000;
      const homestay = (this.data.homestayList || []).find(h => h.id === homestayId);
      const name = marker.title || (homestay && homestay.name) || '民宿';
      const address = (homestay && homestay.address) || '';
      wx.openLocation({
        latitude: marker.latitude,
        longitude: marker.longitude,
        name: name,
        address: address,
        scale: 18
      });
      return;
    }

    // 景点标记：仅展示说明
    const content = marker.callout && marker.callout.content
      ? marker.callout.content
      : ' ';
    wx.showModal({
      title: marker.title,
      content: content || ' ',
      showCancel: false,
      confirmText: '知道了'
    });
  },

  onMapTap() {},

  // 地图区域变化（缩放结束时更新比例尺与标签）
  onRegionChange: function(e) {
    // 只在缩放结束时处理，避免频繁更新影响性能
    if (e.type === 'end') {
      // 使用防抖，延迟处理，避免频繁更新
      if (this.scaleUpdateTimer) {
        clearTimeout(this.scaleUpdateTimer);
      }
      
      this.scaleUpdateTimer = setTimeout(() => {
        this.updateMarkersByScale();
      }, 300); // 减少延迟时间，提高响应速度
    }
  },

  // 根据缩放级别得到仅米制的比例尺文字（中文：X米 / X公里）
  getScaleLabel: function(scale) {
    const s = Math.max(3, Math.min(20, Math.round(scale || 14)));
    const labels = {
      3: '1000公里', 4: '500公里', 5: '200公里', 6: '100公里', 7: '50公里', 8: '25公里',
      9: '20公里', 10: '10公里', 11: '5公里', 12: '2公里', 13: '1公里', 14: '500米',
      15: '200米', 16: '100米', 17: '50米', 18: '20米', 19: '10米', 20: '5米'
    };
    return labels[s] || '500米';
  },

  // 根据缩放级别更新标记点
  updateMarkersByScale: function() {
    const mapCtx = wx.createMapContext('wangwushanMap', this);
    const that = this;
    
    // 尝试获取缩放级别
    if (mapCtx.getScale && typeof mapCtx.getScale === 'function') {
      mapCtx.getScale({
        success: (res) => {
          const currentScale = res.scale || that.data.scale || 14;
          // 保存成功获取的缩放级别
          that._lastKnownScale = currentScale;
          that.updateMarkersCallout(currentScale);
          that.setData({ scaleLabel: that.getScaleLabel(currentScale) });
        },
        fail: () => {
          // 获取失败时，使用上次保存的缩放级别
          const currentScale = that._lastKnownScale || that.data.scale || 14;
          that.setData({ scaleLabel: that.getScaleLabel(currentScale) });
          that.updateMarkersCallout(currentScale);
        }
      });
    } else {
      const currentScale = that.data.scale || 14;
      that.setData({ scaleLabel: that.getScaleLabel(currentScale) });
      that.updateMarkersCallout(currentScale);
    }
  },

  estimateScaleAndUpdate: function() {
    this.setData({ scaleLabel: this.getScaleLabel(this.data.scale) });
    this.updateMarkersCallout(this.data.scale);
  },

  // 更新标记点的callout显示状态
  updateMarkersCallout: function(scale) {
    // 确保scale在有效范围内
    scale = Math.max(3, Math.min(20, Math.round(scale || 14)));
    
    const shouldShowCallout = scale >= 16;
    const currentDisplay = this.data.markers[0]?.callout?.display || 'BYCLICK';
    
    // 检查是否需要更新（避免不必要的setData）
    const needUpdate = (shouldShowCallout && currentDisplay !== 'ALWAYS') ||
                       (!shouldShowCallout && currentDisplay !== 'BYCLICK');
    
    if (!needUpdate && this.data.scale === scale) {
      // 既不需要更新callout状态，scale也没变化，直接返回
      return;
    }
    
    // 更新 markers 的 callout 显示状态
    const markers = needUpdate ? this.data.markers.map(marker => ({
      ...marker,
      callout: {
        ...marker.callout,
        display: shouldShowCallout ? 'ALWAYS' : 'BYCLICK'
      }
    })) : this.data.markers;
    
    this.setData({
      markers: markers,
      scale: scale
    });

    // 只缓存景点marker（id < 1000），避免把民宿marker也缓存进去
    if (needUpdate) {
      this._scenicMarkersCache = JSON.parse(JSON.stringify(markers.filter(m => (m?.id || 0) < 1000)));
    }
  },

  // 使用腾讯地图根据民宿地址解析经纬度
  geocodeHomestays: function() {
    const that = this;
    const key = this.data.tencentMapKey;
    if (!key) {
      return;
    }

    const list = this.data.homestayList || [];
    let locations = this.data.homestayLocations || {};

    list.forEach((homestay) => {
      const id = homestay.id;
      // 已经有坐标的就不再请求
      if (locations[id] && typeof locations[id].latitude === 'number' && typeof locations[id].longitude === 'number') {
        return;
      }

      wx.request({
        url: 'https://apis.map.qq.com/ws/geocoder/v1/',
        method: 'GET',
        data: {
          address: homestay.address,
          key: key
        },
        success(res) {
          if (res.data && res.data.status === 0 && res.data.result && res.data.result.location) {
            const loc = res.data.result.location;
            locations = {
              ...locations,
              [id]: {
                latitude: loc.lat,
                longitude: loc.lng
              }
            };
            // 更新数据和本地缓存
            that.setData({
              homestayLocations: locations
            });
            wx.setStorageSync('homestayLocations', locations);

            // 坐标更新后，刷新当前路线的 markers，让民宿标注立即显示
            const currentRoute = that.data.currentRoute || 'walking';
            that.switchRoute({
              currentTarget: {
                dataset: { route: currentRoute }
              }
            });
          }
        }
      });
    });
  },

  // 用于自定义气泡的民宿列表（有坐标的才展示）
  getHomestayCalloutList: function() {
    const locations = this.data.homestayLocations || {};
    return (this.data.homestayList || [])
      .filter((h) => {
        const loc = locations[h.id];
        return loc && typeof loc.latitude === 'number' && typeof loc.longitude === 'number';
      })
      .map((h) => ({
        id: h.id,
        name: h.name,
        price: h.price,
        image: h.image || ''
      }));
  },

  // 生成民宿 markers（气泡内用 customCallout 显示民宿照片+文字）
  buildHomestayMarkers: function() {
    const locations = this.data.homestayLocations || {};
    const scale = this.data.scale || 14;
    const shouldShowCallout = scale >= 16;

    return (this.data.homestayList || [])
      .map((h) => {
        const loc = locations[h.id];
        if (!loc || typeof loc.latitude !== 'number' || typeof loc.longitude !== 'number') {
          return null;
        }
        return {
          id: 1000 + h.id,
          longitude: loc.longitude,
          latitude: loc.latitude,
          iconPath: '/images/minsu.png',
          width: 26,
          height: 26,
          title: h.name,
          callout: {
            content: h.name + '\n¥' + h.price + '/晚起',
            color: '#333333',
            fontSize: 14,
            borderRadius: 10,
            bgColor: '#ffffff',
            padding: 12,
            display: 'ALWAYS',
            textAlign: 'center'
          }
        };
      })
      .filter(Boolean);
  },

  // 切换路线
  switchRoute: function(e) {
    const route = e.currentTarget.dataset.route;
    const routeData = this.data.routes[route] || [];
    
    // 切换路线时，保持当前的标签显示状态
    // 如果当前已经显示标签（放大状态），切换路线后仍然显示
    const currentDisplay = this.data.markers[0]?.callout?.display || 'BYCLICK';

    // 景点路线模式：恢复景点 markers/circles，并切换路线
    const scenicMarkers = JSON.parse(JSON.stringify(this._scenicMarkersCache || []));
    const scenicCircles = JSON.parse(JSON.stringify(this._scenicCirclesCache || []));

    // 根据当前显示状态同步 callout 展示
    const syncedMarkers = scenicMarkers.map((marker) => ({
      ...marker,
      callout: {
        ...marker.callout,
        display: currentDisplay === 'ALWAYS' ? 'ALWAYS' : (marker.callout?.display || 'BYCLICK')
      }
    }));

    // 叠加民宿marker + 自定义气泡数据（气泡里显示民宿照片）
    const homestayMarkers = this.buildHomestayMarkers();
    const combinedMarkers = [...syncedMarkers, ...homestayMarkers];
    const homestayCalloutList = this.getHomestayCalloutList();

    this.setData({
      currentRoute: route,
      markers: combinedMarkers,
      circles: scenicCircles,
      currentPolyline: routeData,
      homestayCalloutList: homestayCalloutList
    });
  },
  // 图片点击放大查看
  onMapImageTap: function() {
    const imageList = [this.data.currentMapImage];
    wx.previewImage({
      current: this.data.currentMapImage,
      urls: imageList
    });
  },

  // 获取真实天气数据
  fetchWeather: function() {
    const that = this;
    
    // 王屋山坐标
    const lat = 35.2100;
    const lon = 112.4530;
    
    // 使用 Open-Meteo 免费API
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset&timezone=Asia%2FShanghai`;
    
    wx.request({
      url: apiUrl,
      method: 'GET',
      timeout: 10000,
      header: {
        'User-Agent': 'Mozilla/5.0'
      },
      success: function(res) {
        if (res.data && res.data.current) {
          const data = res.data;
          const current = data.current;
          const daily = data.daily || {};
          
          // 解析日出日落时间（只取时间部分）
          let sunriseTime = '6:00';
          let sunsetTime = '18:00';
          if (daily.sunrise && daily.sunrise[0]) {
            const sunriseStr = daily.sunrise[0];
            sunriseTime = sunriseStr.split('T')[1]?.substring(0, 5) || '6:00';
          }
          if (daily.sunset && daily.sunset[0]) {
            const sunsetStr = daily.sunset[0];
            sunsetTime = sunsetStr.split('T')[1]?.substring(0, 5) || '18:00';
          }
          
          // 计算温度范围
          const tempMax = Math.round(daily.temperature_2m_max?.[0] || 20);
          const tempMin = Math.round(daily.temperature_2m_min?.[0] || 10);
          
          // 更新天气数据
          that.setData({
            weather: {
              temperature: Math.round(current.temperature_2m || 18),
              humidity: Math.round(current.relative_humidity_2m || 50),
              condition: that.translateWeatherCode(current.weather_code),
              windSpeed: Math.round(current.wind_speed_10m || 0),
              tempRange: `${tempMin}~${tempMax}℃`,
              sunriseTime: sunriseTime,
              sunsetTime: sunsetTime,
              cloudSeaProb: that.estimateCloudSeaProb(current.weather_code, current.wind_speed_10m),
              visibilityProb: that.estimateVisibility(current.weather_code)
            }
          });
        }
      },
      fail: function(err) {
        console.error('获取天气失败', err);
        // API失败时保留默认数据
      }
    });
  },

  // 天气代码转换
  translateWeatherCode: function(code) {
    const weatherMap = {
      0: '晴',
      1: '晴间多云',
      2: '多云',
      3: '阴',
      45: '雾',
      48: '雾凇',
      51: '小雨',
      53: '中雨',
      55: '大雨',
      61: '小雨',
      63: '中雨',
      65: '大雨',
      71: '小雪',
      73: '中雪',
      75: '大雪',
      77: '雪粒',
      80: '阵雨',
      81: '中雨',
      82: '大雨',
      85: '阵雪',
      86: '大雪',
      95: '雷暴',
      96: '雷暴冰雹',
      99: '雷暴冰雹'
    };
    return weatherMap[code] || '多云';
  },

  // 估算云海概率（山区特色指标）
  estimateCloudSeaProb: function(weatherCode, windSpeed) {
    // 晴天或多云转晴，云海概率较高
    if (weatherCode === 0 || weatherCode === 1) {
      return Math.floor(Math.random() * 20 + 60); // 60-80%
    }
    // 微风条件下云海概率较高
    if (windSpeed < 10) {
      return Math.floor(Math.random() * 30 + 40); // 40-70%
    }
    // 阴天或雨天，云海概率较低
    return Math.floor(Math.random() * 30 + 20); // 20-50%
  },

  // 估算能见度
  estimateVisibility: function(weatherCode) {
    // 晴天能见度最好
    if (weatherCode === 0 || weatherCode === 1) {
      return 85 + Math.floor(Math.random() * 15);
    }
    // 多云
    if (weatherCode === 2 || weatherCode === 3) {
      return 60 + Math.floor(Math.random() * 20);
    }
    // 雾天能见度差
    if (weatherCode === 45 || weatherCode === 48) {
      return 20 + Math.floor(Math.random() * 30);
    }
    // 雨天
    if (weatherCode >= 51 && weatherCode <= 82) {
      return 40 + Math.floor(Math.random() * 30);
    }
    // 雪天
    if (weatherCode >= 71 && weatherCode <= 86) {
      return 30 + Math.floor(Math.random() * 30);
    }
    return 70;
  }
})