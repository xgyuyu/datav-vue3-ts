import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import WaterPolo from './src/index.vue'

WaterPolo.install = (app: App): void => {
  app.component('VWaterPolo', WaterPolo)
  app.component('VWaterPoloProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default WaterPolo as SFCWithInstall<typeof WaterPolo>
