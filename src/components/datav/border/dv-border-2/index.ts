import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import VDvBorder2 from './src/index.vue'

VDvBorder2.install = (app: App): void => {
  app.component('VDvBorder2', VDvBorder2)
  app.component('VDvBorder2Prop', loadAsyncComponent(() => import('./src/config.vue')))
}

export default VDvBorder2 as SFCWithInstall<typeof VDvBorder2>
