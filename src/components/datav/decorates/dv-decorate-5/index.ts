import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import VDvDecorate5 from './src/index.vue'

VDvDecorate5.install = (app: App): void => {
  app.component('VDvDecorate5', VDvDecorate5)
  app.component('VDvDecorate5Prop', loadAsyncComponent(() => import('./src/config.vue')))
}

export default VDvDecorate5 as SFCWithInstall<typeof VDvDecorate5>
