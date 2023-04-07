import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import Pie3d from './src/index.vue'

Pie3d.install = (app: App): void => {
  app.component('VPie3d', Pie3d)
  app.component('VPie3dProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default Pie3d as SFCWithInstall<typeof Pie3d>
