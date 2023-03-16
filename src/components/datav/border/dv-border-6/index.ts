import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import VDvBorder6 from './src/index.vue'

VDvBorder6.install = (app: App): void => {
  app.component('VDvBorder6', VDvBorder6)
  app.component('VDvBorder6Prop', loadAsyncComponent(() => import('./src/config.vue')))
}

export default VDvBorder6 as SFCWithInstall<typeof VDvBorder6>
