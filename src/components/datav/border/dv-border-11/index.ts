import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import VDvBorder11 from './src/index.vue'

VDvBorder11.install = (app: App): void => {
  app.component('VDvBorder11', VDvBorder11)
  app.component('VDvBorder11Prop', loadAsyncComponent(() => import('./src/config.vue')))
}

export default VDvBorder11 as SFCWithInstall<typeof VDvBorder11>
