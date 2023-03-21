import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import VDvDecorate4 from './src/index.vue'

VDvDecorate4.install = (app: App): void => {
  app.component('VDvDecorate4', VDvDecorate4)
  app.component('VDvDecorate4Prop', loadAsyncComponent(() => import('./src/config.vue')))
}

export default VDvDecorate4 as SFCWithInstall<typeof VDvDecorate4>
