export const CONTENT = {
  logoName: '欧普',
  logoImg: 'https://marslight.bj.bcebos.com/v1/marslight/m5/1569217185487.png',
  templetMode: 4,
  cardList: [
    {
      location: 0,
      cardNum: 0,
      path: 'cardWeather',
      city: ['上海', '上海', '浦东新区']
    },
    {
      location: 1,
      cardNum: 3,
      path: 'cardHump',
      cardName: '湿度传感器：湿度',
      macId: 'E11BFCAE3026'
    },
    {
      location: 2,
      cardNum: 2,
      path: 'cardTemp',
      cardName: '温度传感器：温度',
      macId: 'E2609E7F4D25'
    },
    {
      location: 3,
      cardNum: 4,
      path: 'cardLight',
      cardName: '环境光传感器：光照'
    }
  ],
  menus: [
    {
      path: 'peopleManage',
      name: '监控安保',
      num: 1
    },
    {
      path: 'safe',
      name: '区域管控',
      num: 3
    },
    {
      path: 'seatManage',
      name: '主动告警',
      num: 4
    },
    {
      path: 'assetsManage',
      name: '资产管理',
      num: 5
    }
  ],
  macIdsAssets: [],
  areaIds: []
}
// 初始化蜂鸟地图的参数
export const OPTIONS_MAP3D = {
  appName: '智向3d',
  key: '8137fcb436a3ebc1242ab57dcd4a34c0',
  defaultMapScale: 150,
  zoomOffset: {
    x: 20,
    y: -26
  },
  toolOffset: {
    x: 0,
    y: 0
  },
  floorOffset: {
    x: -20,
    y: -20
  },
  compassOffset: [20, -100],
  compassSize: 30
}
// 定义人员定位的数据
export const PEOPLE_FIXED_MACID = [
  {
    macId: 'C119032A861F'
  }, {
    macId: 'C119031E4114'
  }, {
    macId: 'C11903C47782'
  }, {
    macId: 'C119036C20E2'
  }, {
    macId: 'C11903E02E1D'
  }
]
// 员工定位
export const STAFF_MACID = ['C119032A861F', 'C119031E4114', 'C11903C47782']
// 访客定位
export const VISITOR_MACID = ['C119036C20E2', 'C11903E02E1D']
// 区域管控
export const SAFE_FENCEID = ['88', '87']
// 定位资产mac
export const ASSETS_FIXED_MACID = [
  { macId: 'C11903BBB262', img: 'noteBook.png' },
  { macId: 'C11903A7200D', img: 'phone.png' },
  { macId: 'C11903A18D9D', img: 'Projector.png' },
  { macId: 'C1190191320F', img: 'sount.png' },
  { macId: 'C119032C1337', img: 'Speaker.png' }
]
/**
 *资产管理电子围栏 电子围栏权限设置 eventType：0 进入 离开都有权限 1:进入,2:离开
 */
export const FENCE_ALARM_INFO = [
  {
    labelMacId: 'C119032C1337',
    fenceInfo: [{ fenceId: 2, eventType: 2 }]
  }
]
