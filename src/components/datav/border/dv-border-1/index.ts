import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import VDvBorder1 from './src/index.vue'

VDvBorder1.install = (app: App): void => {
  app.component('VDvBorder1', VDvBorder1)
  app.component('VDvBorder1Prop', loadAsyncComponent(() => import('./src/config.vue')))
}

export default VDvBorder1 as SFCWithInstall<typeof VDvBorder1>
