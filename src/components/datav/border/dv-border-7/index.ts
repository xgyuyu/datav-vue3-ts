import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import VDvBorder7 from './src/index.vue'

VDvBorder7.install = (app: App): void => {
  app.component('VDvBorder7', VDvBorder7)
  app.component('VDvBorder7Prop', loadAsyncComponent(() => import('./src/config.vue')))
}

export default VDvBorder7 as SFCWithInstall<typeof VDvBorder7>
