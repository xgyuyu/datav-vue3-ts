import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import Funnel from './src/index.vue'

Funnel.install = (app: App): void => {
  app.component('VFunnel', Funnel)
  app.component('VFunnelProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default Funnel as SFCWithInstall<typeof Funnel>
