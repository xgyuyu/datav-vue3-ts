import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import VDvBorder4 from './src/index.vue'

VDvBorder4.install = (app: App): void => {
  app.component('VDvBorder4', VDvBorder4)
  app.component('VDvBorder4Prop', loadAsyncComponent(() => import('./src/config.vue')))
}

export default VDvBorder4 as SFCWithInstall<typeof VDvBorder4>
