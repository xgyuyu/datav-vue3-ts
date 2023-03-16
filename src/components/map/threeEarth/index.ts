import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import VThreeEarth from './src/index.vue'

VThreeEarth.install = (app: App): void => {
  app.component('VThreeEarth', VThreeEarth)
  app.component('VThreeEarthProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default VThreeEarth as SFCWithInstall<typeof VThreeEarth>
