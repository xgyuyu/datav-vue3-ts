import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import Gauge from './src/index.vue'

Gauge.install = (app: App): void => {
  app.component('VGauge', Gauge)
  app.component('VGaugeProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default Gauge as SFCWithInstall<typeof Gauge>
