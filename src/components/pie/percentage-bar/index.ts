import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import PercentageBar from './src/index.vue'

PercentageBar.install = (app: App): void => {
  app.component('VPercentageBar', PercentageBar)
  app.component('VPercentageBarProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default PercentageBar as SFCWithInstall<typeof PercentageBar>
