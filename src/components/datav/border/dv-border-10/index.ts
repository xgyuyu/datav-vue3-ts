import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import VDvBorder10 from './src/index.vue'

VDvBorder10.install = (app: App): void => {
  app.component('VDvBorder10', VDvBorder10)
  app.component('VDvBorder10Prop', loadAsyncComponent(() => import('./src/config.vue')))
}

export default VDvBorder10 as SFCWithInstall<typeof VDvBorder10>
