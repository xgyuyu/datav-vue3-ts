import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import BasicArea from './src/index.vue'

BasicArea.install = (app: App): void => {
  app.component('VBasicArea', BasicArea)
  app.component('VBasicAreaProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default BasicArea as SFCWithInstall<typeof BasicArea>
