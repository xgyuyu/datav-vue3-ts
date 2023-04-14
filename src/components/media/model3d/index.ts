import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import Model3d from './src/index.vue'

Model3d.install = (app: App): void => {
  app.component('VModel3d', Model3d)
  app.component('VModel3dProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default Model3d as SFCWithInstall<typeof Model3d>
