import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import MapA from './src/index.vue'

MapA.install = (app: App): void => {
  app.component('VMapA', MapA)
  app.component('VMapAProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default MapA as SFCWithInstall<typeof MapA>
