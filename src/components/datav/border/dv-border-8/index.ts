import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import VDvBorder8 from './src/index.vue'

VDvBorder8.install = (app: App): void => {
  app.component('VDvBorder8', VDvBorder8)
  app.component('VDvBorder8Prop', loadAsyncComponent(() => import('./src/config.vue')))
}

export default VDvBorder8 as SFCWithInstall<typeof VDvBorder8>
