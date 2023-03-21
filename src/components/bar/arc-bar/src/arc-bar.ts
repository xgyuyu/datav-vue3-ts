import {DatavChartSeries, DatavComponent} from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'
import {EChartEasing} from "@/components/_models/echarts-animation";

export class BasicBarSeries extends DatavChartSeries {
  constructor(name: string) {
    super('bar', name)
  }

  color = {
    type: 'solid',
    value: '#00baff',
    from: '#fff',
    to: '#000',
  }
}

/**
 * VrcBar
 */
export class ArcBar extends DatavComponent {
  config = {
    global: {
      fontFamily: 'Microsoft Yahei',
      margin: {
        top: 40,
        bottom: 50,
        left: 50,
        right: 10,
      },
      innerPadding: 20,
      outerPadding: 30,
      barWidth: 'auto',
      background: {
        show: true,
        color: 'rgba(255, 255, 255, 0.1)',
      },
    },
    label: {
      show: false,
      position: 'top',
      textStyle: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.6)',
        fontWeight: 'normal',
      },
      offsetX: 0,
      offsetY: 0,
    },
    angleAxis: {
      startAngle: 90,
      axisLine: {
        show: true,
        lineStyle: {
          type: 'solid',
          width: 1,
          color: 'rgba(255, 255, 255, 0.5)',
        }
      },
      axisTick: {
        show: true,
        lineStyle: {
          type: 'solid',
          width: 1,
          color: 'rgba(255, 255, 255, 0.5)',
        }
      },
      min: 'auto',
      max: 'auto',
      axisLabel: {
        show: true,
        valueFormat: 'auto',
        boundaryGap: 0,
        display: {
          rotate: 0,
          margin: 8,
        },
        align: 'right',
        textStyle: {
          fontSize: 12,
          color: 'rgba(255, 255, 255, 0.6)',
          fontWeight: 'normal',
        },
      },
    },
    radiusAxis: {
      type: 'category',
      boundaryGap: true,
      splitNumber: 5,
      axisLine: {
        show: true,
        lineStyle: {
          type: 'solid',
          width: 1,
          color: 'rgba(255, 255, 255, 0.5)',
        }
      },
      axisTick: {
        show: true,
        lineStyle: {
          type: 'solid',
          width: 1,
          color: 'rgba(255, 255, 255, 0.5)',
        }
      },
      axisLabel: {
        show: true,
        valueFormat: 'auto',
        boundaryGap: 0,
        display: {
          rotate: 0,
          margin: 8,
        },
        align: 'right',
        textStyle: {
          fontSize: 12,
          color: 'rgba(255, 255, 255, 0.6)',
          fontWeight: 'normal',
        },
      },
    },
    tooltip: {
      show: true,
      textStyle: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'normal',
      },
      background: {
        padding: {
          h: 5,
          v: 5,
        },
        color: 'rgba(0, 0, 0, 0.65)',
      },
      pointer: {
        show: true,
        line: {
          type: 'dashed',
          width: 1,
          color: '#f5dc69',
          dashedLength: 4,
          dashedSpace: 4,
        },
      },
    },
    legend: {
      show: true,
      position: 'top-center',
      orient: 'horizontal',
      textStyle: {
        fontSize: 12,
        color: '#90a0ae',
        fontWeight: 'normal',
      },
      symbol: {
        show: true,
        icon: 'auto',
        width: 25,
        height: 14,
        gap: 10,
      },
      page: {
        enabled: false,
        size: {
          width: 100,
          height: 100,
        },
        button: {
          size: 15,
          color: '#000',
          inactiveColor: '#000',
        },
        pageNumColor: '#90a0ae',
      },
    },
    series: [new BasicBarSeries('系列1')],
    animation: {
      enabled: true,
      duration: 1000,
      easing: EChartEasing.cubicOut,
      delay: 0,
    },
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>

  constructor() {
    super('ArcBar', { w: 400, h: 400 })

    this.initData()
  }

  initData() {
    const fields: any = [
      createField('x', { description: '类目' }),
      createField('y', { description: '值' }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
      description: '玉环图接口',
    })

    setApiData(this)

    this.events = {}
    this.actions = {}

    return this
  }

  async loadData() {
    try {
      // 组件静态数据来源，当前项目统一管理目录：public/data/*
      // 如：public/data/demo/data.json 简写为 => demo/data
      const path = 'bar/basic-bar'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default ArcBar
