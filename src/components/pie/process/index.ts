import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import Process from './src/index.vue'

Process.install = (app: App): void => {
  app.component('VProcess', Process)
  app.component('VProcessProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default Process as SFCWithInstall<typeof Process>
