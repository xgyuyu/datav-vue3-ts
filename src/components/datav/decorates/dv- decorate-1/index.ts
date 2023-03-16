import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import VDvDecorate1 from './src/index.vue'

VDvDecorate1.install = (app: App): void => {
  app.component('VDvDecorate1', VDvDecorate1)
  app.component('VDvDecorate1Prop', loadAsyncComponent(() => import('./src/config.vue')))
}

export default VDvDecorate1 as SFCWithInstall<typeof VDvDecorate1>
