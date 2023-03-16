import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import VDvDecorate2 from './src/index.vue'

VDvDecorate2.install = (app: App): void => {
  app.component('VDvDecorate2', VDvDecorate2)
  app.component('VDvDecorate2Prop', loadAsyncComponent(() => import('./src/config.vue')))
}

export default VDvDecorate2 as SFCWithInstall<typeof VDvDecorate2>
