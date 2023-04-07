import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import Semicircle from './src/index.vue'

Semicircle.install = (app: App): void => {
  app.component('VSemicircle', Semicircle)
  app.component('VSemicircleProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default Semicircle as SFCWithInstall<typeof Semicircle>
