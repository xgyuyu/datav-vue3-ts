import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import VDvBorder9 from './src/index.vue'

VDvBorder9.install = (app: App): void => {
  app.component('VDvBorder9', VDvBorder9)
  app.component('VDvBorder9Prop', loadAsyncComponent(() => import('./src/config.vue')))
}

export default VDvBorder9 as SFCWithInstall<typeof VDvBorder9>
