import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import TreeLine from './src/index.vue'

TreeLine.install = (app: App): void => {
  app.component('VTreeLine', TreeLine)
  app.component('VTreeLineProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default TreeLine as SFCWithInstall<typeof TreeLine>
