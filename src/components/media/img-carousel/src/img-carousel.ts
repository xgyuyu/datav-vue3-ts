import { DatavComponent } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'

/**
 * ImgCarousel
 */
export class ImgCarousel extends DatavComponent {
  config = {
    // 图片资源列表
    dataset: [
      'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg',
      'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg',
      'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg',
    ],
    // 自动播放
    autoplay: true,
    // 自动播放的间隔（豪秒）
    interval: 5000,
    // 每页显示的图片数量
    slidesPerview: 1,
    // 轮播方向
    direction: "horizontal",
    // 拖曳切换
    draggable: true,
    // 居中显示
    centeredSlides: false,
    // 过渡效果
    effect: "slide",
    // 是否显示指示点
    showDots: true,
    // 指示器样式
    dotType: "dot",
    // 指示器位置
    dotPlacement: "bottom",
    // 显示箭头
    showArrow: false,
    // 图片样式
    fit: "contain",
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>

  constructor() {
    super('ImgCarousel', { w: 200, h: 200 })

    this.initData()
  }

  initData() {
    const fields: any = [
      createField('value', { description: '', optional: true }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
    })

    setApiData(this)
    this.apis = {}
    this.apiData = {}
    this.events = {}
    this.actions = {}

    return this
  }

  async loadData() {
    try {
      // 组件静态数据来源，当前项目统一管理目录：public/data/*
      // 如：public/data/demo/data.json 简写为 => demo/data
      // const path = ''
      // const res = await getStaticData(this.id, path)
      // this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default ImgCarousel
