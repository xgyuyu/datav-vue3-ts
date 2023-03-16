import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import VDvDecorate3 from './src/index.vue'

VDvDecorate3.install = (app: App): void => {
  app.component('VDvDecorate3', VDvDecorate3)
  app.component('VDvDecorate3Prop', loadAsyncComponent(() => import('./src/config.vue')))
}

export default VDvDecorate3 as SFCWithInstall<typeof VDvDecorate3>
