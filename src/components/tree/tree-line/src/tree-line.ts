import { DatavComponent } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'
import {EChartEasing} from "@/components/_models/echarts-animation";

/**
 * TreeLine
 */
export class TreeLine extends DatavComponent {
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
    series: [
      {
        type: 'tree',
        id: 0,
        name: 'tree1',
        data: [],
        top: '10%',
        left: '8%',
        bottom: '22%',
        right: '20%',
        symbolSize: 6,
        edgeShape: 'polyline',
        edgeForkPosition: '6%',
        initialTreeDepth: 3,
        lineStyle: {
          width: 2
        },
        label: {
          // backgroundColor: '#fff',
          position: 'left',
          verticalAlign: 'middle',
          align: 'right',
          textStyle: {
            fontSize: 12,
            color: 'rgba(255, 255, 255, 0.6)',
            fontWeight: 'normal',
          },
        },
        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left'
          }
        },
        emphasis: {
          focus: 'descendant'
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750
      }
    ],
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
    super('TreeLine', { w: 400, h: 400 })

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

    this.events = {}
    this.actions = {}

    return this
  }

  async loadData() {
    try {
      // 组件静态数据来源，当前项目统一管理目录：public/data/*
      // 如：public/data/demo/data.json 简写为 => demo/data
      const path = 'tree/tree-line'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default TreeLine
