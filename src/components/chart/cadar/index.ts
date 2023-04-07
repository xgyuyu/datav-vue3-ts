import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import Cadar from './src/index.vue'

Cadar.install = (app: App): void => {
  app.component('VCadar', Cadar)
  app.component('VCadarProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default Cadar as SFCWithInstall<typeof Cadar>
