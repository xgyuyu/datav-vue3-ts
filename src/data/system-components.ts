export interface ComDataDto {
  name: string
  alias: string
  img: string
  thum: string
  used: boolean
  children?: ComDataDto[]
}

export interface ComDataType {
  type: string
  name: string
  icon: string
  data: (ComDataType | ComDataDto)[]
}

export const bar: ComDataType = {
  type: 'bar',
  name: '柱状图',
  icon: 'v-icon-chart-bar',
  data: [
    {
      name: 'VBasicBar',
      alias: '柱状图',
      img: `${import.meta.env.VITE_APP_CDN}/com/basic-bar-332-144.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/basic-bar-368-208.png`,
      used: true,
    }, {
      name: 'VArcBar',
      alias: '玉环图',
      img: `${import.meta.env.VITE_APP_CDN}/com/arc-bar-160-116.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/arc-bar-368-208.png`,
      used: true,
    }, {
      name: 'VLineBar',
      alias: '折线柱图',
      img: `${import.meta.env.VITE_APP_CDN}/com/line-bar-chart-332-144.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/line-bar-chart-368-208.png`,
      used: true,
    }, {
      name: 'VWaterPolo',
      alias: '水位图',
      img: './img/waterPolo.png',
      thum: './img/waterPolo.png',
      used: true,
    },
  ],
}

export const datavBorderCom: ComDataType = {
  type: 'datav',
  name: '边框',
  icon: 'v-icon-datav-com',
  data: [
    {
      name: 'VDvBorder1',
      alias: '边框1',
      img: './img/border01.png',
      thum: './img/border01.png',
      used: true,
    },
    {
      name: 'VDvBorder2',
      alias: '边框2',
      img: './img/border02.png',
      thum: './img/border02.png',
      used: true,
    },
    {
      name: 'VDvBorder3',
      alias: '边框3',
      img: './img/border03.png',
      thum: './img/border03.png',
      used: true,
    },
    {
      name: 'VDvBorder4',
      alias: '边框4',
      img: './img/border04.png',
      thum: './img/border04.png',
      used: true,
    },
    {
      name: 'VDvBorder5',
      alias: '边框5',
      img: './img/border05.png',
      thum: './img/border05.png',
      used: true,
    },
    {
      name: 'VDvBorder6',
      alias: '边框6',
      img: './img/border06.png',
      thum: './img/border06.png',
      used: true,
    },
    {
      name: 'VDvBorder7',
      alias: '边框7',
      img: './img/border07.png',
      thum: './img/border07.png',
      used: true,
    },
    {
      name: 'VDvBorder8',
      alias: '边框8',
      img: './img/border08.png',
      thum: './img/border08.png',
      used: true,
    },
    {
      name: 'VDvBorder9',
      alias: '边框9',
      img: './img/border10.png',
      thum: './img/border10.png',
      used: true,
    },
    {
      name: 'VDvBorder10',
      alias: '边框10',
      img: './img/border11.png',
      thum: './img/border11.png',
      used: true,
    },
    {
      name: 'VDvBorder11',
      alias: '边框11',
      img: './img/border12.png',
      thum: './img/border12.png',
      used: true,
    },
    {
      name: 'VDvBorder12',
      alias: '边框12',
      img: './img/border13.png',
      thum: './img/border13.png',
      used: true,
    },
    {
      name: 'VDvBorder13',
      alias: '边框13',
      img: `${import.meta.env.VITE_APP_CDN}/com/border-box-162-116.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/border-box-370-208.png`,
      used: true,
    },
  ]
}

export const datavDecoratesCom: ComDataType = {
  type: 'datav',
  name: '装饰',
  icon: 'v-icon-datav-com',
  data: [
    {
      name: 'VDvDecorate1',
      alias: '装饰1',
      img: './img/decorates01.png',
      thum: './img/decorates01.png',
      used: true,
    },
    {
      name: 'VDvDecorate2',
      alias: '装饰2',
      img: './img/decorates02.png',
      thum: './img/decorates02.png',
      used: true,
    },
    {
      name: 'VDvDecorate3',
      alias: '装饰3',
      img: './img/decorates03.png',
      thum: './img/decorates03.png',
      used: true,
    },
    {
      name: 'VDvDecorate4',
      alias: '装饰4',
      img: './img/decorates04.png',
      thum: './img/decorates04.png',
      used: true,
    },
    {
      name: 'VDvDecorate5',
      alias: '装饰5',
      img: './img/decorates06.png',
      thum: './img/decorates06.png',
      used: true,
    },
    // {
    //   name: 'VDecoration',
    //   alias: '装饰',
    //   img: `${import.meta.env.VITE_APP_CDN}/com/decoration-162-116.png`,
    //   thum: `${import.meta.env.VITE_APP_CDN}/com-thum/decoration-370-208.png`,
    //   used: true,
    // },
    {
      name: 'VDvDecorate6',
      alias: '装饰6',
      img: `${import.meta.env.VITE_APP_CDN}/com/decoration-162-116.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/decoration-370-208.png`,
      used: true,
    },
  ]
}

export const titleBg: ComDataType = {
  type: 'datav',
  name: '主标题背景',
  icon: 'v-icon-datav-com',
  data: [
    {
      name: 'VTitleBg',
      alias: '主标题背景',
      img: `./img/title.jpg`,
      thum: `./img/title.jpg`,
      used: true,
    },
  ],
}

export const horizontalBar: ComDataType = {
  type: 'infeed-bar',
  name: '条形图',
  icon: 'v-icon-chart-bar',
  data: [
    {
      name: 'VInfeedBar',
      alias: '水平基本柱状图',
      img: `${import.meta.env.VITE_APP_CDN}/com/hori-basic-bar-332-144.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/hori-basic-bar-368-208.png`,
      used: true,
    },
  ],
}

export const line: ComDataType = {
  type: 'line',
  name: '折线图',
  icon: 'v-icon-chart-line',
  data: [
    {
      name: 'VBasicLine',
      alias: '基本折线图',
      img: `${import.meta.env.VITE_APP_CDN}/com/basic-line-332-144.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/basic-line-368-208.png`,
      used: true,
    },
  ],
}

export const scatter: ComDataType = {
  type: 'scatter',
  name: '散点图',
  icon: 'v-icon-chart-scatter',
  data: [
    {
      name: 'VBasicScatter',
      alias: '基本散点图',
      img: './img/scatter.png',
      thum: './img/scatter.png',
      used: true,
    },
  ],
}

export const area: ComDataType = {
  type: 'area',
  name: '区域图',
  icon: 'v-icon-chart-line',
  data: [
    {
      name: 'VBasicArea',
      alias: '区域图',
      img: `${import.meta.env.VITE_APP_CDN}/com/basic-area-332-144.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/basic-area-368-208.png`,
      used: true,
    },
  ],
}

export const pie: ComDataType = {
  type: 'pie',
  name: '饼环图',
  icon: 'v-icon-chart-pie',
  data: [
    {
      name: 'VBasicPie',
      alias: '基本饼图',
      img: `${import.meta.env.VITE_APP_CDN}/com/basic-pie-160-116.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/basic-pie-368-208.png`,
      used: true,
    },
    {
      name: 'VProcess',
      alias: '指标占比饼图',
      img: `${import.meta.env.VITE_APP_CDN}/com/pie-one-value-160-116.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/pie-one-value-368-208.png`,
      used: true,
    },
    {
      name: 'VSemicircle',
      alias: '半圆饼图',
      img: './img/semicircle.jpg',
      thum: './img/semicircle.jpg',
      used: true,
    },
    {
      name: 'VPie3d',
      alias: '3d饼图',
      img: './img/pie3d.jpg',
      thum: './img/pie3d.jpg',
      used: true,
    },
  ],
}

export const relation: ComDataType = {
  type: 'relation',
  name: '关系图',
  icon: 'v-icon-relation',
  data: [
    {
      name: 'VTreeLine',
      alias: '树图',
      img: `${import.meta.env.VITE_APP_CDN}/com/tree.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com/tree.png`,
      used: true,
    },
  ],
}

export const chart: ComDataType = {
  type: 'chart',
  name: '其他',
  icon: 'v-icon-other',
  data: [
    {
      name: 'VWordCloud',
      alias: '词云',
      img: `${import.meta.env.VITE_APP_CDN}/com/word-cloud-160-116.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/word-cloud-370-208.png`,
      used: true,
    },
    {
      name: 'VCadar',
      alias: '雷达图',
      img: './img/radar.png',
      thum: './img/radar.png',
      used: true,
    },
    {
      name: 'VFunnel',
      alias: '漏斗图',
      img: './img/funnel.png',
      thum: './img/funnel.png',
      used: true,
    },
    {
      name: 'VGauge',
      alias: '仪表盘',
      img: './img/gauge.jpg',
      thum: './img/gauge.jpg',
      used: true,
    },
  ],
}

export const map: ComDataType = {
  type: 'map',
  name: '地图',
  icon: 'v-icon-map',
  data: [
    {
      name: 'VChina2d',
      alias: '基础平面中国地图',
      img: `${import.meta.env.VITE_APP_CDN}/com/2d-china-332-144.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/2d-china-368-208.png`,
      used: true,
      children: [
        {
          name: 'VChina2dArea',
          alias: '区域热力层',
          img: `${import.meta.env.VITE_APP_CDN}/com/2d-china-area-180-180.png`,
          thum: `${import.meta.env.VITE_APP_CDN}/com/2d-china-area-180-180.png`,
          used: true,
        },
        {
          name: 'VChina2dBubbles',
          alias: '呼吸气泡层',
          img: `${import.meta.env.VITE_APP_CDN}/com/2d-china-bubbles-180-180.png`,
          thum: `${import.meta.env.VITE_APP_CDN}/com/2d-china-bubbles-180-180.png`,
          used: true,
        }, {
          name: 'VChina2dFlyingline',
          alias: '飞线层',
          img: `${import.meta.env.VITE_APP_CDN}/com/2d-china-flyingline-180-180.png`,
          thum: `${import.meta.env.VITE_APP_CDN}/com/2d-china-flyingline-180-180.png`,
          used: true,
        },
      ],
    },
    {
      name: 'VMapA',
      alias: '高德地图',
      img: `${import.meta.env.VITE_APP_CDN}/com/2d-map-664-288.jpg`,
      thum: `${import.meta.env.VITE_APP_CDN}/com/2d-map-664-288.jpg`,
      used: true,
    },
    // {
    //   name: 'VMap3d',
    //   alias: '3D平面地图',
    //   img: `${import.meta.env.VITE_APP_CDN}/com/3d-map-664-288.jpg`,
    //   thum: `${import.meta.env.VITE_APP_CDN}/com/3d-map-664-288.jpg`,
    //   used: false,
    // },
    {
      name: 'VThreeEarth',
      alias: '3D地球',
      img: `${import.meta.env.VITE_APP_CDN}/com/3d-earth-664-288.jpg`,
      thum: `${import.meta.env.VITE_APP_CDN}/com/3d-earth-664-288.jpg`,
      used: true,
    },
  ],
}

export const title: ComDataType = {
  type: 'title',
  name: '标题',
  icon: 'v-icon-title',
  data: [
    {
      name: 'VMainTitle',
      alias: '通用标题',
      img: `${import.meta.env.VITE_APP_CDN}/com/main-title-332-144.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/main-title-370-208.png`,
      used: true,
    }, {
      name: 'VMarquee',
      alias: '跑马灯',
      img: `${import.meta.env.VITE_APP_CDN}/com/marquee-332-144.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/marquee-370-208.png`,
      used: true,
    }, {
      name: 'VNumberTitleFlop',
      alias: '数字翻牌器',
      img: `${import.meta.env.VITE_APP_CDN}/com/number-title-flop-160-116.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/number-title-flop-370-208.png`,
      used: true,
    }, {
      name: 'VParagraph',
      alias: '多行文本',
      img: `${import.meta.env.VITE_APP_CDN}/com/paragraph-160-116.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/paragraph-370-208.png`,
      used: true,
    }, {
      name: 'VTimer',
      alias: '时间器',
      img: `${import.meta.env.VITE_APP_CDN}/com/timer-160-116.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/timer-370-208.png`,
      used: true,
    },
  ],
}

export const list: ComDataType = {
  type: 'list',
  name: '列表',
  icon: 'v-icon-view-list',
  data: [
    {
      name: 'VCarouselTable',
      alias: '轮播列表',
      img: `${import.meta.env.VITE_APP_CDN}/com/carousel-table-332-144.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/carousel-table-370-208.png`,
      used: true,
    }, {
      name: 'VTableBar',
      alias: '轮播列表柱状图',
      img: `${import.meta.env.VITE_APP_CDN}/com/table-bar-332-144.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/table-bar-370-208.png`,
      used: true,
    },
  ],
}

export const button: ComDataType = {
  type: 'button',
  name: '按钮类',
  icon: 'v-icon-interact',
  data: [
    {
      name: 'VFullScreen',
      alias: '全屏切换',
      img: `${import.meta.env.VITE_APP_CDN}/com/full-screen-332-144.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/full-screen-368-208.png`,
      used: true,
    },
  ],
}

export const select: ComDataType = {
  type: 'select',
  name: '选择类',
  icon: 'v-icon-interact',
  data: [
    {
      name: 'VTabList',
      alias: 'Tab列表',
      img: `${import.meta.env.VITE_APP_CDN}/com/tab-list-332-144.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/tab-list-368-208.png`,
      used: false,
    },
  ],
}

export const interactData: ComDataType = {
  type: 'interact-data',
  name: '数据类',
  icon: 'v-icon-interact',
  data: [
    {
      name: 'VPercentageBar',
      alias: '进度条',
      img: `${import.meta.env.VITE_APP_CDN}/com/percentage-bar-332-144.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/percentage-bar-370-208.png`,
      used: true,
    },
  ],
}

export const material: ComDataType = {
  type: 'material',
  name: '素材',
  icon: 'v-icon-material',
  data: [
    {
      name: 'VBgBox',
      alias: '自定义背景块',
      img: `${import.meta.env.VITE_APP_CDN}/com/bg-box-334-144.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/bg-box-370-208.png`,
      used: true,
    },
    // {
    //   name: 'VBorderBox',
    //   alias: '边框',
    //   img: `${import.meta.env.VITE_APP_CDN}/com/border-box-162-116.png`,
    //   thum: `${import.meta.env.VITE_APP_CDN}/com-thum/border-box-370-208.png`,
    //   used: true,
    // },
    {
      name: 'VMainImg',
      alias: '单张图片',
      img: `${import.meta.env.VITE_APP_CDN}/com/main-img-334-144.png`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/main-img-370-208.png`,
      used: true,
    },
    {
      name: 'VImgCarousel',
      alias: '轮播图',
      img: `./img/imgCarousel.png`,
      thum: `./img/imgCarousel.png`,
      used: true,
    },
    {
      name: 'VTreeGif',
      alias: '树背景',
      img: `./img/tree-gif.jpg`,
      thum: `./img/tree-gif.jpg`,
      used: true,
    },
    {
      name: 'VModel3d',
      alias: '3d模型',
      img: `./img/tree-gif.jpg`,
      thum: `./img/tree-gif.jpg`,
      used: true,
    },
  ],
}

export const other: ComDataType = {
  type: 'other',
  name: '其他',
  icon: 'v-icon-other',
  data: [
    {
      name: 'VDatePicker',
      alias: '日期选择器',
      img: `${import.meta.env.VITE_APP_CDN}/com/date-picker.jpg`,
      thum: `${import.meta.env.VITE_APP_CDN}/com-thum/time-selector.jpg`,
      used: true,
    },
  ],
}

export const classifications: ComDataType[] = [
  {
    type: 'regular',
    name: '图表',
    icon: 'v-icon-chart',
    data: [bar, horizontalBar, line, scatter, area, pie, relation, chart],
  },
  {
    type: 'map',
    name: '地图',
    icon: 'v-icon-map',
    data: [map],
  },
  {
    type: 'DataV',
    name: 'DataV',
    icon: 'v-icon-datav-com',
    data: [datavBorderCom, datavDecoratesCom, titleBg],
  },
  {
    type: 'text',
    name: '信息',
    icon: 'v-icon-com-info',
    data: [title],
  },
  {
    type: 'table',
    name: '表格',
    icon: 'v-icon-table',
    data: [list],
  },
  {
    type: 'interact',
    name: '控件',
    icon: 'v-icon-interact',
    data: [button, interactData],
  },
  {
    type: 'media',
    name: '媒体',
    icon: 'v-icon-media',
    data: [material],
  },
  {
    type: 'other',
    name: '其他',
    icon: 'v-icon-other',
    data: [other],
  },
]

const getCom = (coms: ComDataDto[], name: string) => {
  for (let i = 0, len = coms.length; i < len; i++) {
    const com = coms[i]
    if (com.name === name) {
      return com
    }

    if (com.children) {
      const subCom = getCom(com.children, name)
      if (subCom) {
        return subCom
      }
    }
  }

  return null
}

export function getSystemSubComs(name: string) {
  const subComs = map.data.find(m => m.name === name) as ComDataDto
  return subComs && subComs.children ? subComs.children : []
}

export function findComByName(name: string) {
  for (const classification of classifications) {
    for (const category of classification.data as ComDataType[]) {
      const com = getCom(category.data as ComDataDto[], name)
      if (com) {
        return {
          classification,
          category,
          com,
        }
      }
    }
  }

  return null
}

export const supportedSubComs = [
  ...map.data.map(m => m.name),
]
