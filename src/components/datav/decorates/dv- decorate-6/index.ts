import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import VDvDecorate6 from './src/index.vue'

VDvDecorate6.install = (app: App): void => {
  app.component('VDvDecorate6', VDvDecorate6)
  app.component('VDvDecorate6Prop', loadAsyncComponent(() => import('./src/config.vue')))
}

export default VDvDecorate6 as SFCWithInstall<typeof VDvDecorate6>
