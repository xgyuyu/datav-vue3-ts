import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import VDvBorder5 from './src/index.vue'

VDvBorder5.install = (app: App): void => {
  app.component('VDvBorder5', VDvBorder5)
  app.component('VDvBorder5Prop', loadAsyncComponent(() => import('./src/config.vue')))
}

export default VDvBorder5 as SFCWithInstall<typeof VDvBorder5>
