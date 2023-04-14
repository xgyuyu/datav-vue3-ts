import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import TreeGif from './src/index.vue'

TreeGif.install = (app: App): void => {
  app.component('VTreeGif', TreeGif)
  app.component('VTreeGifProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default TreeGif as SFCWithInstall<typeof TreeGif>
