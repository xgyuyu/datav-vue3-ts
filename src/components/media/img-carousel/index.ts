import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import ImgCarousel from './src/index.vue'

ImgCarousel.install = (app: App): void => {
  app.component('VImgCarousel', ImgCarousel)
  app.component('VImgCarouselProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default ImgCarousel as SFCWithInstall<typeof ImgCarousel>
