import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import DvBorder13 from './src/index.vue'

DvBorder13.install = (app: App): void => {
  app.component('VDvBorder13', DvBorder13)
  app.component('VDvBorder13Prop', loadAsyncComponent(() => import('./src/config.vue')))
}

export default DvBorder13 as SFCWithInstall<typeof DvBorder13>
