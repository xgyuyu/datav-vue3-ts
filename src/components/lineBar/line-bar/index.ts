import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import VLineBar from './src/index.vue'

VLineBar.install = (app: App): void => {
  app.component('VLineBar', VLineBar)
  app.component('VLineBarProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default VLineBar as SFCWithInstall<typeof VLineBar>
