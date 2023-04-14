import type { App } from 'vue'
import DatavWrapper from './_internal/datav-wrapper.vue'

import VBasicBar from './bar/basic-bar'
import VLineBar from './lineBar/line-bar'
import VBasicLine from './line/basic-line'
import VChina2d from './map/china2d'
import VThreeEarth from './map/threeEarth'
import VWordCloud from './chart/word-cloud'
import VMainTitle from './text/main-title'
import VMarquee from './text/marquee'
import VNumberTitleFlop from './text/number-title-flop'
import VParagraph from './text/paragraph'
import VTimer from './text/timer'
import VCarouselTable from './table/carousel-table'
import VFullScreen from './button/full-screen'
import VBgBox from './media/bg-box'
import VBorderBox from './media/border-box'
import VDecoration from './media/decoration'
import VMainImg from './media/main-img'
import VDatePicker from './other/date-picker'
import VTableBar from './table/table-bar'
import VDvBorder1 from './datav/border/dv-border-1'
import VDvBorder2 from './datav/border/dv-border-2'
import VDvBorder3 from './datav/border/dv-border-3'
import VDvBorder4 from './datav/border/dv-border-4'
import VDvBorder5 from './datav/border/dv-border-5'
import VDvBorder6 from './datav/border/dv-border-6'
import VDvBorder7 from './datav/border/dv-border-7'
import VDvBorder8 from './datav/border/dv-border-8'
import VDvBorder9 from './datav/border/dv-border-9'
import VDvBorder10 from './datav/border/dv-border-10'
import VDvBorder11 from './datav/border/dv-border-11'
import VDvBorder12 from './datav/border/dv-border-12'

import VDvDecorate1 from './datav/decorates/dv-decorate-1'
import VDvDecorate2 from './datav/decorates/dv-decorate-2'
import VDvDecorate3 from './datav/decorates/dv-decorate-3'
import VDvDecorate4 from './datav/decorates/dv-decorate-4'
import VDvDecorate5 from './datav/decorates/dv-decorate-5'
import VDvDecorate6 from './datav/decorates/dv-decorate-6'
import VInfeedBar from './bar/infeed-bar'
import VArcBar from './bar/arc-bar'
import VBasicArea from './line/basic-area'
import VBasicPie from './pie/basic-pie'
import VProcess from './pie/process'
import VWaterPolo from './bar/water-polo'
import VBasicScatter from './scatter/basic-scatter'
import VTreeLine from './tree/tree-line'
import VPercentageBar from './pie/percentage-bar'
import VMapA from './map/map-a'
import VImgCarousel from './media/img-carousel'
import VDvBorder13 from './datav/border/dv-border-13'
import VCadar from './chart/cadar'
import VFunnel from './chart/funnel'
import VTitleBg from './datav/title-bg'
import VPie3d from './pie/pie3d'
import VSemicircle from './pie/semicircle'
import VTreeGif from './media/tree-gif'
import VGauge from './chart/gauge'
import VModel3d from './media/model3d'
// -- prepend placeholder 1 --

const components = [
  VBasicBar,
  VLineBar,
  VBasicLine,
  VChina2d,
  VThreeEarth,

  VWordCloud,
  VMainTitle,
  VMarquee,
  VNumberTitleFlop,
  VParagraph,
  VTimer,
  VCarouselTable,
  VFullScreen,
  VBgBox,
  VBorderBox,
  VDecoration,
  VMainImg,
  VDatePicker,
  VTableBar,
  VDvBorder1,
  VDvBorder2,
  VDvBorder3,
  VDvBorder4,
  VDvBorder5,
  VDvBorder6,
  VDvBorder7,
  VDvBorder8,
  VDvBorder9,
  VDvBorder10,
  VDvBorder11,
  VDvBorder12,
  VDvBorder13,

  VDvDecorate1,
  VDvDecorate2,
  VDvDecorate3,
  VDvDecorate4,
  VDvDecorate5,
  VDvDecorate6,
  VInfeedBar,
  VArcBar,
  VBasicArea,
  VBasicPie,
  VProcess,
  VWaterPolo,
  VBasicScatter,
  VTreeLine,
  VPercentageBar,
  VMapA,
  VImgCarousel,
  VCadar,
  VFunnel,
  VTitleBg,
  VPie3d,
  VSemicircle,
  VTreeGif,
  VGauge,
  VModel3d,
// -- prepend placeholder 2 --
]

const install = (app: App): void => {
  app.component('DatavWrapper', DatavWrapper)

  components.forEach(component => {
    app.use(component)
  })
}

export default {
  install,
}
