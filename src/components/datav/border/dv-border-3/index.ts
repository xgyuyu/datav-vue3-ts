import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import VDvBorder3 from './src/index.vue'

VDvBorder3.install = (app: App): void => {
  app.component('VDvBorder3', VDvBorder3)
  app.component('VDvBorder3Prop', loadAsyncComponent(() => import('./src/config.vue')))
}

export default VDvBorder3 as SFCWithInstall<typeof VDvBorder3>
