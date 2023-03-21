import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import InfeedBar from './src/index.vue'

InfeedBar.install = (app: App): void => {
  app.component('VInfeedBar', InfeedBar)
  app.component('VInfeedBarProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default InfeedBar as SFCWithInstall<typeof InfeedBar>
