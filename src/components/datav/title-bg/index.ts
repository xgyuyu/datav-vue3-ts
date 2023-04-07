import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import TitleBg from './src/index.vue'

TitleBg.install = (app: App): void => {
  app.component('VTitleBg', TitleBg)
  app.component('VTitleBgProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default TitleBg as SFCWithInstall<typeof TitleBg>
