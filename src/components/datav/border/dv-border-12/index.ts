import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import VDvBorder12 from './src/index.vue'

VDvBorder12.install = (app: App): void => {
  app.component('VDvBorder12', VDvBorder12)
  app.component('VDvBorder12Prop', loadAsyncComponent(() => import('./src/config.vue')))
}

export default VDvBorder12 as SFCWithInstall<typeof VDvBorder12>
