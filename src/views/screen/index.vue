<template>
  <div
    id="datav-loading"
    :style="{
      background: 'rgb(15, 42, 66)',
      display: loading ? 'block' : 'none',
    }"
  >
    <a target="_blank" href="javascript:;">
      <img class="datav-logo" :src="`${cdn}/datav/datav-loading.gif`">
    </a>
  </div>
  <div class="datav-layout" :style="{ visibility: loading ? 'hidden' : 'visible' }">
    <a
      v-if="pageConfig.useWatermark"
      href="/"
      target="_blank"
      class="datav-watermark"
    >
      <img :src="LOGO">
    </a>
    <div class="scene">
      <datav-com v-for="com in coms" :key="com.id" :com="com" />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { globalConfig } from '@/config'
import { useEditorStore } from '@/store/editor'
import { useFilterStore } from '@/store/filter'
import { useComStore } from '@/store/com'
import { useEventStore } from '@/store/event'
import { PageConfig, ZoomMode } from '@/domains/editor'
import { setStyle, on } from '@/utils/dom'
import { getScreen } from '@/api/screen'
import DatavCom from './datav/index.vue'

const cdn = import.meta.env.VITE_APP_CDN

const localData = '{"screen":{"id":0,"name":"","share":"","thumbnail":"","groupId":0},"config":{"width":1920,"height":1080,"bgimage":"./source/bg8.jpeg","bgcolor":"rgba(13,42,67,0)","grid":8,"screenshot":"","zoomMode":1,"useWatermark":true,"styleFilterParams":{"enable":false,"hue":0,"saturate":100,"brightness":100,"contrast":100,"opacity":100}},"coms":[{"id":"TitleBg_4c7NS0usw","name":"VTitleBg","type":"com","alias":"主标题背景","icon":"v-icon-datav-com","img":"./img/title.jpg","locked":false,"hided":false,"selected":false,"hovered":false,"renameing":false,"tag":0,"scaling":{"zoom":false,"w":1920,"h":80,"sx":1,"sy":1},"attr":{"x":0,"y":0,"w":1920,"h":80,"deg":0,"opacity":1,"filpV":false,"filpH":false},"projectId":0,"config":{"img":"./source/title1.png"},"apis":{},"apiData":{},"events":{},"actions":{}},{"id":"MainTitle__jy-G5FGt","name":"VMainTitle","type":"com","alias":"通用标题","icon":"v-icon-title","img":"//files.pengxiaotian.com/com-thum/main-title-370-208.png","locked":false,"hided":false,"selected":false,"hovered":false,"renameing":false,"tag":0,"scaling":{"zoom":false,"w":644,"h":56,"sx":1,"sy":1},"attr":{"x":639,"y":10,"w":644,"h":56,"deg":0,"opacity":1,"filpV":false,"filpH":false},"projectId":0,"config":{"title":"我是标题数据","textStyle":{"fontFamily":"Microsoft Yahei","fontSize":48,"color":"#5395FFFF","fontWeight":"900"},"textAlign":"center","writingMode":"horizontal-tb","letterSpacing":22,"backgroundStyle":{"show":false,"bgColor":"#008bff","borderRadius":15,"borderColor":"#fff","borderStyle":"solid","borderWidth":1},"ellipsis":false,"urlConfig":{"url":"","isBlank":false}},"apis":{"source":{"fields":{"title":{"type":"string","map":"","description":"标题值","optional":true},"url":{"type":"string","map":"","description":"超链接","optional":true}},"description":"","useAutoUpdate":false,"autoUpdate":1,"handler":"render"}},"apiData":{"source":{"id":"WwAnT8J5bY","type":"static","pageFilters":[],"config":{"useFilter":false,"data":"{\n  \"title\": \"智慧机房管理\",\n  \"url\": \"\"\n}"},"comId":"MainTitle__jy-G5FGt"}},"events":{},"actions":{}},{"id":"DvBorder13__zhlQSprJ","name":"VDvBorder13","type":"com","alias":"边框13","icon":"v-icon-datav-com","img":"//files.pengxiaotian.com/com-thum/border-box-370-208.png","locked":false,"hided":false,"selected":false,"hovered":false,"renameing":false,"tag":0,"scaling":{"zoom":false,"w":590,"h":453,"sx":1,"sy":1},"attr":{"x":0,"y":79,"w":590,"h":453,"deg":0,"opacity":1,"filpV":false,"filpH":false},"projectId":0,"config":{"img":"./source/border3.png"},"apis":{},"apiData":{},"events":{},"actions":{}},{"id":"VMainTitle_j8mmDDpJo","name":"VMainTitle","type":"com","alias":"小标题","icon":"v-icon-title","img":"//files.pengxiaotian.com/com-thum/main-title-370-208.png","locked":false,"hided":false,"selected":false,"hovered":false,"renameing":false,"tag":0,"scaling":{"zoom":false,"w":210,"h":56,"sx":1,"sy":1},"attr":{"x":69,"y":99,"w":210,"h":56,"deg":0,"opacity":1,"filpV":false,"filpH":false},"projectId":0,"config":{"title":"我是标题数据","textStyle":{"fontFamily":"Microsoft Yahei","fontSize":28,"color":"#49AFCDFF","fontWeight":"900"},"textAlign":"center","writingMode":"horizontal-tb","letterSpacing":2,"backgroundStyle":{"show":false,"bgColor":"#008bff","borderRadius":15,"borderColor":"#fff","borderStyle":"solid","borderWidth":1},"ellipsis":false,"urlConfig":{"url":"","isBlank":false}},"apis":{"source":{"fields":{"title":{"type":"string","map":"","description":"标题值","optional":true},"url":{"type":"string","map":"","description":"超链接","optional":true}},"description":"","useAutoUpdate":false,"autoUpdate":1,"handler":"render"}},"apiData":{"source":{"id":"CbZS9betlp","type":"static","pageFilters":[],"config":{"useFilter":false,"data":"{\n  \"title\": \"MBB当班产能\",\n  \"url\": \"\"\n}"},"comId":"VMainTitle_j8mmDDpJo"}},"events":{},"actions":{}},{"id":"BasicBar_DDh85mZMw","name":"VBasicBar","type":"com","alias":"柱状图","icon":"v-icon-chart-bar","img":"//files.pengxiaotian.com/com-thum/basic-bar-368-208.png","locked":false,"hided":false,"selected":false,"hovered":false,"renameing":false,"tag":0,"scaling":{"zoom":false,"w":551,"h":353,"sx":1,"sy":1},"attr":{"x":19,"y":157,"w":551,"h":353,"deg":0,"opacity":1,"filpV":false,"filpH":false},"projectId":0,"config":{"global":{"fontFamily":"Microsoft Yahei","margin":{"top":40,"bottom":50,"left":50,"right":10},"innerPadding":20,"outerPadding":30,"barWidth":"auto","background":{"show":true,"color":"rgba(255, 255, 255, 0.1)"}},"label":{"show":false,"position":"top","textStyle":{"fontSize":12,"color":"rgba(255, 255, 255, 0.6)","fontWeight":"normal"},"offsetX":0,"offsetY":0},"xAxis":{"show":true,"type":"category","boundaryGap":true,"title":{"show":true,"name":"X轴","location":"center","display":{"rotate":0,"offset":20},"textStyle":{"fontSize":12,"color":"#90a0ae","fontWeight":"normal"}},"axisLine":{"show":true,"type":"solid","width":1,"color":"rgba(255, 255, 255, 0.5)"},"axisTick":{"show":true,"type":"solid","width":1,"color":"rgba(255, 255, 255, 0.5)"},"axisLabel":{"show":true,"valueFormat":"d","timeFormat":"MM/DD","interval":"auto","display":{"rotate":0,"margin":10},"align":"center","textStyle":{"fontSize":12,"color":"rgba(255, 255, 255, 0.6)","fontWeight":"normal"}},"grid":{"show":true,"line":{"type":"dashed","width":1,"color":"rgba(233, 228, 228, 0.1)","dashedLength":4,"dashedSpace":4}}},"yAxis":{"show":true,"extent":{"min":"auto","max":"auto"},"splitNumber":0,"title":{"show":false,"name":"Y轴","location":"center","display":{"rotate":90,"offset":20},"textStyle":{"fontSize":12,"color":"#90a0ae","fontWeight":"normal"}},"axisLine":{"show":true,"type":"solid","width":1,"color":"rgba(255, 255, 255, 0.5)"},"axisTick":{"show":true,"type":"solid","width":1,"color":"rgba(255, 255, 255, 0.5)"},"axisLabel":{"show":true,"valueFormat":"auto","boundaryGap":0,"display":{"rotate":0,"margin":8},"align":"right","textStyle":{"fontSize":12,"color":"rgba(255, 255, 255, 0.6)","fontWeight":"normal"}},"grid":{"show":true,"line":{"type":"dashed","width":1,"color":"rgba(233, 228, 228, 0.1)","dashedLength":4,"dashedSpace":4}}},"tooltip":{"show":true,"textStyle":{"fontSize":14,"color":"#fff","fontWeight":"normal"},"background":{"padding":{"h":5,"v":5},"color":"rgba(0, 0, 0, 0.65)"},"pointer":{"show":true,"line":{"type":"dashed","width":1,"color":"#f5dc69","dashedLength":4,"dashedSpace":4}}},"legend":{"show":true,"position":"top-center","orient":"horizontal","textStyle":{"fontSize":12,"color":"#90a0ae","fontWeight":"normal"},"symbol":{"show":true,"icon":"auto","width":25,"height":14,"gap":10},"page":{"enabled":false,"size":{"width":100,"height":100},"button":{"size":15,"color":"#000","inactiveColor":"#000"},"pageNumColor":"#90a0ae"}},"series":[{"type":"bar","id":"系列1_PB0UQq1cvK","name":"系列1","color":{"type":"solid","value":"#00baff","from":"#fff","to":"#000"}}],"animation":{"enabled":true,"duration":1000,"easing":"cubicOut","delay":0}},"apis":{"source":{"fields":{"x":{"type":"string","map":"","description":"类目","optional":false},"y":{"type":"string","map":"","description":"值","optional":false}},"description":"基本柱状图接口","useAutoUpdate":false,"autoUpdate":1,"handler":"render"}},"apiData":{"source":{"id":"zR6tBjyIp6","type":"static","pageFilters":[],"config":{"useFilter":false,"data":"[{\"x\":\"上海\",\"y\":23},{\"x\":\"深圳\",\"y\":13},{\"x\":\"合肥\",\"y\":2},{\"x\":\"成都\",\"y\":9},{\"x\":\"安徽\",\"y\":5},{\"x\":\"北京\",\"y\":10},{\"x\":\"杭州\",\"y\":14},{\"x\":\"长沙\",\"y\":24}]"},"comId":"BasicBar_DDh85mZMw"}},"events":{"click":{"description":"当点击数据项时","fields":{"x":{"type":"string","map":"","description":"类目","optional":false},"y":{"type":"string","map":"","description":"值","optional":false}}}},"actions":{}},{"id":"DvBorder13_5yOW3-9vU","name":"VDvBorder13","type":"com","alias":"边框13","icon":"v-icon-datav-com","img":"//files.pengxiaotian.com/com-thum/border-box-370-208.png","locked":false,"hided":false,"selected":false,"hovered":false,"renameing":false,"tag":0,"scaling":{"zoom":false,"w":593,"h":552,"sx":1,"sy":1},"attr":{"x":-2,"y":533,"w":593,"h":552,"deg":0,"opacity":1,"filpV":false,"filpH":false},"projectId":0,"config":{"img":"./source/border2.png"},"apis":{},"apiData":{},"events":{},"actions":{}},{"id":"DvDecorate6_3q7cRVe0G","name":"VDvDecorate6","type":"com","alias":"装饰6","icon":"v-icon-datav-com","img":"//files.pengxiaotian.com/com-thum/decoration-370-208.png","locked":false,"hided":false,"selected":false,"hovered":false,"renameing":false,"tag":0,"scaling":{"zoom":false,"w":531,"h":362,"sx":1,"sy":1},"attr":{"x":31,"y":696,"w":531,"h":362,"deg":0,"opacity":1,"filpV":false,"filpH":false},"projectId":0,"config":{"global":{"img":"./source/icon8.png","opacity":1,"isRotate":false,"dur":4}},"apis":{},"apiData":{},"events":{},"actions":{}},{"id":"TitleBg__hy50TV4a","name":"VTitleBg","type":"com","alias":"主标题背景","icon":"v-icon-datav-com","img":"./img/title.jpg","locked":false,"hided":false,"selected":false,"hovered":false,"renameing":false,"tag":0,"scaling":{"zoom":false,"w":587,"h":76,"sx":1,"sy":1},"attr":{"x":0,"y":553,"w":587,"h":76,"deg":0,"opacity":1,"filpV":false,"filpH":false},"projectId":0,"config":{"img":"./source/subtitle1.png"},"apis":{},"apiData":{},"events":{},"actions":{}},{"id":"VMainTitle_fri5KPlwl","name":"VMainTitle","type":"com","alias":"小标题_copy","icon":"v-icon-title","img":"//files.pengxiaotian.com/com-thum/main-title-370-208.png","locked":false,"hided":false,"selected":false,"hovered":false,"renameing":false,"tag":0,"scaling":{"zoom":false,"w":210,"h":56,"sx":1,"sy":1},"attr":{"x":67,"y":561,"w":210,"h":56,"deg":0,"opacity":1,"filpV":false,"filpH":false},"projectId":0,"config":{"title":"我是标题数据","textStyle":{"fontFamily":"Microsoft Yahei","fontSize":28,"color":"#49AFCDFF","fontWeight":"900"},"textAlign":"center","writingMode":"horizontal-tb","letterSpacing":2,"backgroundStyle":{"show":false,"bgColor":"#008bff","borderRadius":15,"borderColor":"#fff","borderStyle":"solid","borderWidth":1},"ellipsis":false,"urlConfig":{"url":"","isBlank":false}},"apis":{"source":{"fields":{"title":{"type":"string","map":"","description":"标题值","optional":true},"url":{"type":"string","map":"","description":"超链接","optional":true}},"description":"","useAutoUpdate":false,"autoUpdate":1,"handler":"render"}},"apiData":{"source":{"id":"8Fn_ztkrjb","type":"static","pageFilters":[],"config":{"useFilter":false,"data":"{\n  \"title\": \"MBB当班产能\",\n  \"url\": \"\"\n}"},"comId":"VMainTitle_fri5KPlwl"}},"events":{},"actions":{}},{"id":"Pie3d_CK00BWKy2","name":"VPie3d","type":"com","alias":"3d饼图","icon":"v-icon-chart-pie","img":"./img/pie3d.jpg","locked":false,"hided":false,"selected":false,"hovered":false,"renameing":false,"tag":0,"scaling":{"zoom":false,"w":584,"h":396,"sx":1,"sy":1},"attr":{"x":0,"y":618,"w":584,"h":396,"deg":0,"opacity":1,"filpV":false,"filpH":false},"projectId":0,"config":{"dataList":[{"name":"红草莓","y":120,"h":24,"bfb":16},{"name":"白草莓","y":150,"h":31.5,"bfb":21},{"name":"红颜草莓","y":80,"h":16.5,"bfb":11},{"name":"甜宝草莓","y":100,"h":21,"bfb":14},{"name":"红颜草莓","y":60,"h":12,"bfb":8},{"name":"甜宝草莓","y":200,"h":42,"bfb":28}],"colorList":["#BE3075","#EB001F","#64A12D","#FFED00","#000000","#008AC5","#009EE0"],"plotOptions":{"alpha":58,"depth":45,"size":65,"innerSize":95,"center":[50,50]}},"apis":{"source":{"fields":{"value":{"type":"string","map":"","description":"","optional":true}},"description":"","useAutoUpdate":false,"autoUpdate":1,"handler":"render"}},"apiData":{"source":{"id":"2j_NXHEyjk","type":"static","pageFilters":[],"config":{"useFilter":false,"data":"[{\"name\":\"红草莓\",\"y\":120,\"h\":16,\"bfb\":29},{\"name\":\"白草莓\",\"y\":150,\"h\":12,\"bfb\":8},{\"name\":\"红颜草莓\",\"y\":80,\"h\":5,\"bfb\":11},{\"name\":\"甜宝草莓\",\"y\":100,\"h\":9,\"bfb\":11},{\"name\":\"红颜草莓\",\"y\":60,\"h\":8,\"bfb\":13},{\"name\":\"甜宝草莓\",\"y\":200,\"h\":36,\"bfb\":18}]"},"comId":"Pie3d_CK00BWKy2"}},"events":{},"actions":{}},{"id":"DvBorder13_RFfE-D8BP","name":"VDvBorder13","type":"com","alias":"边框13","icon":"v-icon-datav-com","img":"//files.pengxiaotian.com/com-thum/border-box-370-208.png","locked":false,"hided":false,"selected":false,"hovered":false,"renameing":false,"tag":0,"scaling":{"zoom":false,"w":551,"h":455,"sx":1,"sy":1},"attr":{"x":1367,"y":76,"w":551,"h":455,"deg":0,"opacity":1,"filpV":false,"filpH":true},"projectId":0,"config":{"img":"./source/border3.png"},"apis":{},"apiData":{},"events":{},"actions":{}},{"id":"DvBorder5_7KMzwaefI","name":"VDvBorder5","type":"com","alias":"边框5","icon":"v-icon-datav-com","img":"./img/border05.png","locked":false,"hided":false,"selected":false,"hovered":false,"renameing":false,"tag":0,"scaling":{"zoom":false,"w":776,"h":323,"sx":1,"sy":1},"attr":{"x":592,"y":742,"w":776,"h":323,"deg":0,"opacity":1,"filpV":false,"filpH":false},"projectId":0,"config":{"global":{"fontFamily":"Microsoft Yahei","animation":true,"duration":1000,"padding":8,"quantity":5,"loop":true,"looptime":5000,"sort":{"show":true,"sort":"desc"}},"option":{"color1":"#1884EBFF","color2":"#fff","dur":3,"lineHeight":2}},"apis":{},"apiData":{},"events":{},"actions":{}},{"id":"CarouselTable_ltPTG7JBn","name":"VCarouselTable","type":"com","alias":"轮播列表","icon":"v-icon-view-list","img":"//files.pengxiaotian.com/com-thum/carousel-table-370-208.png","locked":false,"hided":false,"selected":false,"hovered":false,"renameing":false,"tag":0,"scaling":{"zoom":false,"w":752,"h":236,"sx":1,"sy":1},"attr":{"x":624,"y":816,"w":752,"h":236,"deg":0,"opacity":1,"filpV":false,"filpH":false},"projectId":0,"config":{"global":{"rowCount":5,"isLoop":true,"fontFamily":"arial","animation":{"mode":"bottom","duration":2,"singleStop":true},"highLight":{"show":false,"isOrder":true,"hlIndex":"3,4","hlStyle":{"textStyle":{"fontFamily":"arial","fontSize":12,"color":"#fff","fontWeight":"normal"},"bgColor":"rgb(154, 205, 50)","border":{"width":1,"style":"solid","color":"#f00"}}},"ifRowHidden":true,"textAnimate":{"ifRun":true,"isSpeed":true,"animateDur":2,"speedRate":0.03},"defaultImg":"https://files.pengxiaotian.com/datav/datav-img-placeholder.png"},"header":{"show":true,"heightPercent":20,"bgColor":"rgba(10, 115, 255, 0)","textStyle":{"textAlign":"left","fontFamily":"arial","color":"#ffffff","fontSize":12,"fontWeight":"normal"}},"row":{"oddBGColor":"rgba(10, 115, 255, 0)","evenBGColor":"rgba(36, 130, 255, 0)"},"idList":{"show":true,"bgColor":"rgba(44, 156, 255, 0)","width":12,"radius":60,"textStyle":{"fontFamily":"Microsoft Yahei","fontWeight":"normal","fontSize":10,"color":"#ffffff"}},"series":[{"columnName":"area","displayName":"地区","width":20,"dataType":"text","widthPercent":50,"margin":{"top":0,"bottom":10,"left":0,"right":10},"isBr":false,"textAlign":"left","textStyle":{"fontFamily":"Microsoft Yahei","fontWeight":"normal","fontSize":12,"color":"rgba(255,255,255,0.8)"}},{"columnName":"pv","displayName":"流量(pv)","width":20,"dataType":"text","widthPercent":50,"margin":{"top":0,"bottom":10,"left":0,"right":10},"isBr":false,"textAlign":"left","textStyle":{"fontFamily":"Microsoft Yahei","fontWeight":"normal","fontSize":12,"color":"rgba(255,255,255,0.8)"}},{"columnName":"attribute","displayName":"用户行为特征","width":53,"dataType":"text","widthPercent":50,"margin":{"top":0,"bottom":10,"left":0,"right":10},"isBr":false,"textAlign":"left","textStyle":{"fontFamily":"Microsoft Yahei","fontWeight":"normal","fontSize":12,"color":"rgba(255,255,255,0.8)"}}]},"apis":{"source":{"fields":{},"description":"","useAutoUpdate":false,"autoUpdate":1,"handler":"render"}},"apiData":{"source":{"id":"szRDq0bG6_","type":"static","pageFilters":[],"config":{"useFilter":false,"data":"[{\"area\":\"中国\",\"pv\":688,\"attribute\":\"xxxxxxxxxxxxxxxxxxx\"},{\"area\":\"美国\",\"pv\":688,\"attribute\":\"xxxxxxxxxxxxxxxxxxx\"},{\"area\":\"俄罗斯\",\"pv\":688,\"attribute\":\"xxxxxxxxxxxxxxxxxxx\"},{\"area\":\"德国\",\"pv\":688,\"attribute\":\"xxxxxxxxxxxxxxxxxxx\"},{\"area\":\"吉尔吉斯斯坦\",\"pv\":688,\"attribute\":\"xxxxxxxxxxxxxxxxxxx\"},{\"area\":\"英国\",\"pv\":688,\"attribute\":\"xxxxxxxxxxxxxxxxxxx\"},{\"area\":\"日本\",\"pv\":688,\"attribute\":\"xxxxxxxxxxxxxxxxxxx\"},{\"area\":\"南非\",\"pv\":688,\"attribute\":\"xxxxxxxxxxxxxxxxxxx\"},{\"area\":\"巴西\",\"pv\":688,\"attribute\":\"xxxxxxxxxxxxxxxxxxx\"},{\"area\":\"印度\",\"pv\":688,\"attribute\":\"xxxxxxxxxxxxxxxxxxx\"},{\"area\":\"新加坡\",\"pv\":688,\"attribute\":\"xxxxxxxxxxxxxxxxxxx\"},{\"area\":\"加拿大\",\"pv\":688,\"attribute\":\"xxxxxxxxxxxxxxxxxxx\"},{\"area\":\"澳大利亚\",\"pv\":688,\"attribute\":\"xxxxxxxxxxxxxxxxxxx\"},{\"area\":\"阿根廷\",\"pv\":688,\"attribute\":\"xxxxxxxxxxxxxxxxxxx\"},{\"area\":\"西班牙\",\"pv\":688,\"attribute\":\"xxxxxxxxxxxxxxxxxxx\"}]"},"comId":"CarouselTable_ltPTG7JBn"}},"events":{"rowClicked":{"description":"当点击单行时","fields":{"index":{"type":"number","map":"","description":"索引值","optional":false}}},"data-flipped":{"description":"当数据滚动时","fields":{"index":{"type":"number","map":"","description":"索引值","optional":false}}},"data-highLight":{"description":"当数据高亮时","fields":{"index":{"type":"number","map":"","description":"索引值","optional":false}}},"scroll-end":{"description":"一轮滚动结束","fields":{"isEnding":{"type":"boolean","map":"","description":"结束","optional":false}}}},"actions":{}},{"id":"DvDecorate5_zUhCN6ar6","name":"VDvDecorate5","type":"com","alias":"装饰5","icon":"v-icon-datav-com","img":"./img/decorates06.png","locked":false,"hided":false,"selected":false,"hovered":false,"renameing":false,"tag":0,"scaling":{"zoom":false,"w":365,"h":55,"sx":1,"sy":1},"attr":{"x":783,"y":750,"w":365,"h":55,"deg":0,"opacity":1,"filpV":false,"filpH":false},"projectId":0,"config":{"global":{"fontFamily":"Microsoft Yahei","animation":true,"duration":1000,"padding":8,"quantity":5,"loop":true,"looptime":5000,"sort":{"show":true,"sort":"desc"}},"option":{"color1":"#1DC1F533","color2":"#1DC1F5FF","lineHeight":2,"dataset":"终检当班产能","textColor":"#fff","textSize":20}},"apis":{},"apiData":{},"events":{},"actions":{}},{"id":"VMainTitle_Y7UWZlBXN","name":"VMainTitle","type":"com","alias":"小标题_copy","icon":"v-icon-title","img":"//files.pengxiaotian.com/com-thum/main-title-370-208.png","locked":false,"hided":false,"selected":false,"hovered":false,"renameing":false,"tag":0,"scaling":{"zoom":false,"w":210,"h":56,"sx":1,"sy":1},"attr":{"x":1635,"y":97,"w":210,"h":56,"deg":0,"opacity":1,"filpV":false,"filpH":false},"projectId":0,"config":{"title":"我是标题数据","textStyle":{"fontFamily":"Microsoft Yahei","fontSize":28,"color":"#49AFCDFF","fontWeight":"900"},"textAlign":"center","writingMode":"horizontal-tb","letterSpacing":2,"backgroundStyle":{"show":false,"bgColor":"#008bff","borderRadius":15,"borderColor":"#fff","borderStyle":"solid","borderWidth":1},"ellipsis":false,"urlConfig":{"url":"","isBlank":false}},"apis":{"source":{"fields":{"title":{"type":"string","map":"","description":"标题值","optional":true},"url":{"type":"string","map":"","description":"超链接","optional":true}},"description":"","useAutoUpdate":false,"autoUpdate":1,"handler":"render"}},"apiData":{"source":{"id":"R4-M7Ots83","type":"static","pageFilters":[],"config":{"useFilter":false,"data":"{\n  \"title\": \"MBB当班产能\",\n  \"url\": \"\"\n}"},"comId":"VMainTitle_Y7UWZlBXN"}},"events":{},"actions":{}},{"id":"BasicLine_4LbeeUgOC","name":"VBasicLine","type":"com","alias":"基本折线图","icon":"v-icon-chart-line","img":"//files.pengxiaotian.com/com-thum/basic-line-368-208.png","locked":false,"hided":false,"selected":false,"hovered":false,"renameing":false,"tag":0,"scaling":{"zoom":false,"w":532,"h":351,"sx":1,"sy":1},"attr":{"x":1375,"y":155,"w":532,"h":351,"deg":0,"opacity":1,"filpV":false,"filpH":false},"projectId":0,"config":{"global":{"fontFamily":"Microsoft Yahei","margin":{"top":40,"bottom":50,"left":60,"right":30},"connectNulls":false},"xAxis":{"show":true,"type":"category","extent":{"min":"auto","max":"auto"},"boundaryGap":true,"title":{"show":true,"name":"X轴","location":"center","display":{"rotate":0,"offset":20},"textStyle":{"fontSize":12,"color":"#90a0ae","fontWeight":"normal"}},"axisLine":{"show":true,"type":"solid","width":1,"color":"rgba(255, 255, 255, 0.5)"},"axisTick":{"show":true,"type":"solid","width":1,"color":"rgba(255, 255, 255, 0.5)"},"axisLabel":{"show":true,"valueFormat":"d","timeFormat":"MM/DD","interval":"auto","display":{"rotate":0,"margin":10},"align":"center","textStyle":{"fontSize":12,"color":"rgba(255, 255, 255, 0.6)","fontWeight":"normal"}},"grid":{"show":true,"line":{"type":"dashed","width":1,"color":"rgba(233, 228, 228, 0.1)","dashedLength":4,"dashedSpace":4}}},"yAxis":{"show":true,"type":"value","extent":{"min":"auto","max":"auto"},"title":{"show":false,"name":"Y轴","location":"center","display":{"rotate":90,"offset":20},"textStyle":{"fontSize":12,"color":"#90a0ae","fontWeight":"normal"}},"axisLine":{"show":true,"type":"solid","width":1,"color":"rgba(255, 255, 255, 0.5)"},"axisTick":{"show":true,"type":"solid","width":1,"color":"rgba(255, 255, 255, 0.5)"},"axisLabel":{"show":true,"valueFormat":"auto","timeFormat":"MM/DD","boundaryGap":0,"display":{"rotate":0,"margin":8},"align":"right","textStyle":{"fontSize":12,"color":"rgba(255, 255, 255, 0.6)","fontWeight":"normal"}},"grid":{"show":true,"line":{"type":"dashed","width":1,"color":"rgba(233, 228, 228, 0.1)","dashedLength":4,"dashedSpace":4}}},"tooltip":{"show":true,"triggerOn":"mousemove","textStyle":{"fontSize":14,"color":"#fff","fontWeight":"normal"},"background":{"padding":{"h":5,"v":5},"color":"rgba(0, 0, 0, 0.65)","borderColor":"rgba(0, 0, 0, 0.25)","borderWidth":1},"pointer":{"show":true,"line":{"type":"dashed","width":1,"color":"#f5dc69","dashedLength":4,"dashedSpace":4}}},"legend":{"show":true,"position":"top-center","orient":"horizontal","textStyle":{"fontSize":12,"color":"#90a0ae","fontWeight":"normal"},"symbol":{"show":true,"icon":"auto","width":25,"height":14,"gap":10},"page":{"enabled":false,"size":{"width":100,"height":100},"button":{"size":15,"color":"#000","inactiveColor":"#000"},"pageNumColor":"#90a0ae"}},"series":[{"type":"line","id":"xy0wGpNqr8","name":"","line":{"color":"#34FFF5","style":"solid","width":1,"opacity":1,"smooth":0.5},"point":{"icon":"roundRect","color":"#34FFF5","borderColor":"rgba(0, 0, 0, 0.44)","borderWidth":1,"borderType":"solid","opacity":1},"label":{"show":false,"field":"y","valueFormat":"auto","describe":{"prefix":"","suffix":""},"offset":{"x":0,"y":0},"rotate":0,"textStyle":{"fontSize":12,"color":"#ddd","fontWeight":"normal"},"stroke":{"color":"#000","width":0}}},{"type":"line","id":"Ch-BtTL92t","name":"","line":{"color":"#30D9F1","style":"solid","width":1,"opacity":1,"smooth":0.5},"point":{"icon":"roundRect","color":"#30D9F1","borderColor":"rgba(0, 0, 0, 0.44)","borderWidth":1,"borderType":"solid","opacity":1},"label":{"show":false,"field":"y","valueFormat":"auto","describe":{"prefix":"","suffix":""},"offset":{"x":0,"y":0},"rotate":0,"textStyle":{"fontSize":12,"color":"#ddd","fontWeight":"normal"},"stroke":{"color":"#000","width":0}}},{"type":"line","id":"jGdBYU8izY","name":"","line":{"color":"#2CB4ED","style":"solid","width":1,"opacity":1,"smooth":0.5},"point":{"icon":"roundRect","color":"#2CB4ED","borderColor":"rgba(0, 0, 0, 0.44)","borderWidth":1,"borderType":"solid","opacity":1},"label":{"show":false,"field":"y","valueFormat":"auto","describe":{"prefix":"","suffix":""},"offset":{"x":0,"y":0},"rotate":0,"textStyle":{"fontSize":12,"color":"#ddd","fontWeight":"normal"},"stroke":{"color":"#000","width":0}}},{"type":"line","id":"C2fVaq0v-M","name":"","line":{"color":"#288EE8","style":"solid","width":1,"opacity":1,"smooth":0.5},"point":{"icon":"roundRect","color":"#288EE8","borderColor":"rgba(0, 0, 0, 0.44)","borderWidth":1,"borderType":"solid","opacity":1},"label":{"show":false,"field":"y","valueFormat":"auto","describe":{"prefix":"","suffix":""},"offset":{"x":0,"y":0},"rotate":0,"textStyle":{"fontSize":12,"color":"#ddd","fontWeight":"normal"},"stroke":{"color":"#000","width":0}}},{"type":"line","id":"GMfhwFaTLy","name":"","line":{"color":"#2469E4","style":"solid","width":1,"opacity":1,"smooth":0.5},"point":{"icon":"roundRect","color":"#2469E4","borderColor":"rgba(0, 0, 0, 0.44)","borderWidth":1,"borderType":"solid","opacity":1},"label":{"show":false,"field":"y","valueFormat":"auto","describe":{"prefix":"","suffix":""},"offset":{"x":0,"y":0},"rotate":0,"textStyle":{"fontSize":12,"color":"#ddd","fontWeight":"normal"},"stroke":{"color":"#000","width":0}}}],"animation":{"enabled":true,"duration":1000,"easing":"cubicOut","delay":0}},"apis":{"source":{"fields":{"x":{"type":"string","map":"","description":"类目","optional":false},"y":{"type":"string","map":"","description":"值","optional":false},"s":{"type":"string","map":"","description":"系列","optional":false}},"description":"基本折线图接口","useAutoUpdate":false,"autoUpdate":1,"handler":"render"}},"apiData":{"source":{"id":"-trcuB-lhI","type":"static","pageFilters":[],"config":{"useFilter":false,"data":"[{\"x\":\"2000\",\"y\":2845,\"s\":\"类型A\"},{\"x\":\"2000\",\"y\":2327,\"s\":\"类型B\"},{\"x\":\"2000\",\"y\":1289,\"s\":\"类型C\"},{\"x\":\"2000\",\"y\":226,\"s\":\"类型D\"},{\"x\":\"2000\",\"y\":46,\"s\":\"类型E\"},{\"x\":\"2001\",\"y\":2848,\"s\":\"类型A\"},{\"x\":\"2001\",\"y\":2445,\"s\":\"类型B\"},{\"x\":\"2001\",\"y\":1316,\"s\":\"类型C\"},{\"x\":\"2001\",\"y\":237,\"s\":\"类型D\"},{\"x\":\"2001\",\"y\":47,\"s\":\"类型E\"},{\"x\":\"2002\",\"y\":2832,\"s\":\"类型A\"},{\"x\":\"2002\",\"y\":2518,\"s\":\"类型B\"},{\"x\":\"2002\",\"y\":1342,\"s\":\"类型C\"},{\"x\":\"2002\",\"y\":252,\"s\":\"类型D\"},{\"x\":\"2002\",\"y\":49,\"s\":\"类型E\"},{\"x\":\"2003\",\"y\":2958,\"s\":\"类型A\"},{\"x\":\"2003\",\"y\":2695,\"s\":\"类型B\"},{\"x\":\"2003\",\"y\":1397,\"s\":\"类型C\"},{\"x\":\"2003\",\"y\":276,\"s\":\"类型D\"},{\"x\":\"2003\",\"y\":48,\"s\":\"类型E\"},{\"x\":\"2004\",\"y\":3043,\"s\":\"类型A\"},{\"x\":\"2004\",\"y\":2906,\"s\":\"类型B\"},{\"x\":\"2004\",\"y\":1443,\"s\":\"类型C\"},{\"x\":\"2004\",\"y\":298,\"s\":\"类型D\"},{\"x\":\"2004\",\"y\":54,\"s\":\"类型E\"},{\"x\":\"2005\",\"y\":3068,\"s\":\"类型A\"},{\"x\":\"2005\",\"y\":3108,\"s\":\"类型B\"},{\"x\":\"2005\",\"y\":1485,\"s\":\"类型C\"},{\"x\":\"2005\",\"y\":320,\"s\":\"类型D\"},{\"x\":\"2005\",\"y\":60,\"s\":\"类型E\"},{\"x\":\"2006\",\"y\":3091,\"s\":\"类型A\"},{\"x\":\"2006\",\"y\":3293,\"s\":\"类型B\"},{\"x\":\"2006\",\"y\":1534,\"s\":\"类型C\"},{\"x\":\"2006\",\"y\":356,\"s\":\"类型D\"},{\"x\":\"2006\",\"y\":62,\"s\":\"类型E\"},{\"x\":\"2007\",\"y\":3071,\"s\":\"类型A\"},{\"x\":\"2007\",\"y\":3422,\"s\":\"类型B\"},{\"x\":\"2007\",\"y\":1562,\"s\":\"类型C\"},{\"x\":\"2007\",\"y\":382,\"s\":\"类型D\"},{\"x\":\"2007\",\"y\":66,\"s\":\"类型E\"},{\"x\":\"2008\",\"y\":3103,\"s\":\"类型A\"},{\"x\":\"2008\",\"y\":3587,\"s\":\"类型B\"},{\"x\":\"2008\",\"y\":1630,\"s\":\"类型C\"},{\"x\":\"2008\",\"y\":388,\"s\":\"类型D\"},{\"x\":\"2008\",\"y\":69,\"s\":\"类型E\"},{\"x\":\"2009\",\"y\":3042,\"s\":\"类型A\"},{\"x\":\"2009\",\"y\":3590,\"s\":\"类型B\"},{\"x\":\"2009\",\"y\":1584,\"s\":\"类型C\"},{\"x\":\"2009\",\"y\":415,\"s\":\"类型D\"},{\"x\":\"2009\",\"y\":66,\"s\":\"类型E\"},{\"x\":\"2010\",\"y\":3107,\"s\":\"类型A\"},{\"x\":\"2010\",\"y\":3812,\"s\":\"类型B\"},{\"x\":\"2010\",\"y\":1696,\"s\":\"类型C\"},{\"x\":\"2010\",\"y\":446,\"s\":\"类型D\"},{\"x\":\"2010\",\"y\":67,\"s\":\"类型E\"},{\"x\":\"2011\",\"y\":3134,\"s\":\"类型A\"},{\"x\":\"2011\",\"y\":4055,\"s\":\"类型B\"},{\"x\":\"2011\",\"y\":1756,\"s\":\"类型C\"},{\"x\":\"2011\",\"y\":494,\"s\":\"类型D\"},{\"x\":\"2011\",\"y\":64,\"s\":\"类型E\"},{\"x\":\"2012\",\"y\":3200,\"s\":\"类型A\"},{\"x\":\"2012\",\"y\":4106,\"s\":\"类型B\"},{\"x\":\"2012\",\"y\":1783,\"s\":\"类型C\"},{\"x\":\"2012\",\"y\":519,\"s\":\"类型D\"},{\"x\":\"2012\",\"y\":65,\"s\":\"类型E\"},{\"x\":\"2013\",\"y\":3220,\"s\":\"类型A\"},{\"x\":\"2013\",\"y\":4126,\"s\":\"类型B\"},{\"x\":\"2013\",\"y\":1806,\"s\":\"类型C\"},{\"x\":\"2013\",\"y\":554,\"s\":\"类型D\"},{\"x\":\"2013\",\"y\":68,\"s\":\"类型E\"},{\"x\":\"2014\",\"y\":3280,\"s\":\"类型A\"},{\"x\":\"2014\",\"y\":4117,\"s\":\"类型B\"},{\"x\":\"2014\",\"y\":1823,\"s\":\"类型C\"},{\"x\":\"2014\",\"y\":568,\"s\":\"类型D\"},{\"x\":\"2014\",\"y\":68,\"s\":\"类型E\"}]"},"comId":"BasicLine_4LbeeUgOC"}},"events":{"click":{"description":"当点击数据项时","fields":{"x":{"type":"string","map":"","description":"类目","optional":false},"y":{"type":"string","map":"","description":"值","optional":false},"s":{"type":"string","map":"","description":"系列","optional":false}}}},"actions":{}},{"id":"DvBorder4_IeqK9xVor","name":"VDvBorder4","type":"com","alias":"边框4","icon":"v-icon-datav-com","img":"./img/border04.png","locked":false,"hided":false,"selected":false,"hovered":false,"renameing":false,"tag":0,"scaling":{"zoom":false,"w":550,"h":546,"sx":1,"sy":1},"attr":{"x":1372,"y":531,"w":550,"h":546,"deg":0,"opacity":1,"filpV":false,"filpH":false},"projectId":0,"config":{"global":{"fontFamily":"Microsoft Yahei","animation":true,"duration":1000,"padding":8,"quantity":5,"loop":true,"looptime":5000,"sort":{"show":true,"sort":"desc"}},"option":{"color1":"#8aaafb","color2":"#1f33a2","borderTitle":"边框4","borderTitleWidth":250,"borderTitleHeight":32,"borderTitleSize":18,"borderTitleColor":"#fff"}},"apis":{},"apiData":{},"events":{},"actions":{}},{"id":"Cadar_QN6Yjb-yK","name":"VCadar","type":"com","alias":"雷达图","icon":"v-icon-other","img":"./img/radar.png","locked":false,"hided":false,"selected":false,"hovered":false,"renameing":false,"tag":0,"scaling":{"zoom":false,"w":227,"h":191,"sx":1,"sy":1},"attr":{"x":1386,"y":867,"w":227,"h":191,"deg":0,"opacity":1,"filpV":false,"filpH":false},"projectId":0,"config":{"animation":{"enabled":true,"duration":1000,"easing":"cubicOut","delay":0},"tooltip":{"show":true,"textStyle":{"fontSize":14,"color":"#fff","fontWeight":"normal"},"background":{"padding":{"h":5,"v":5},"color":"rgba(0, 0, 0, 0.65)"},"pointer":{"show":true,"line":{"type":"dashed","width":1,"color":"#f5dc69","dashedLength":4,"dashedSpace":4}}},"legend":{"show":true,"position":"top-center","orient":"horizontal","textStyle":{"fontSize":12,"color":"#90a0ae","fontWeight":"normal"},"symbol":{"show":true,"icon":"auto","width":25,"height":14,"gap":10},"page":{"enabled":false,"size":{"width":100,"height":100},"button":{"size":15,"color":"#000","inactiveColor":"#000"},"pageNumColor":"#90a0ae"}},"radar":{"shape":"polygon","radius":["0%","60%"],"center":["50%","55%"],"splitArea":{"show":true},"splitLine":{"show":true},"axisName":{"show":true,"color":"#eee","fontSize":12},"axisLine":{"show":true},"axisTick":{"show":true}},"series":[{"name":"radar","type":"radar","areaStyle":{"opacity":0.1}}]},"apis":{"source":{"fields":{"value":{"type":"string","map":"","description":"","optional":true}},"description":"","useAutoUpdate":false,"autoUpdate":1,"handler":"render"}},"apiData":{"source":{"id":"ne8tbm5-kl","type":"static","pageFilters":[],"config":{"useFilter":false,"data":"{\"radarIndicator\":[{\"name\":\"数据1\",\"max\":6500},{\"name\":\"数据2\",\"max\":16000},{\"name\":\"数据3\",\"max\":30000},{\"name\":\"数据4\",\"max\":38000},{\"name\":\"数据5\",\"max\":52000},{\"name\":\"数据6\",\"max\":25000}],\"seriesData\":[{\"name\":\"data1\",\"value\":[4200,3000,20000,35000,50000,18000]},{\"name\":\"data2\",\"value\":[5000,14000,28000,26000,42000,21000]}]}"},"comId":"Cadar_QN6Yjb-yK"}},"events":{},"actions":{}},{"id":"BasicArea_2Z26_70oq","name":"VBasicArea","type":"com","alias":"区域图","icon":"v-icon-chart-line","img":"//files.pengxiaotian.com/com-thum/basic-area-368-208.png","locked":false,"hided":false,"selected":false,"hovered":false,"renameing":false,"tag":0,"scaling":{"zoom":false,"w":527,"h":296,"sx":1,"sy":1},"attr":{"x":1375,"y":592,"w":527,"h":296,"deg":0,"opacity":1,"filpV":false,"filpH":false},"projectId":0,"config":{"global":{"fontFamily":"Microsoft Yahei","margin":{"top":40,"bottom":50,"left":60,"right":30},"connectNulls":false},"xAxis":{"show":true,"type":"category","extent":{"min":"auto","max":"auto"},"boundaryGap":true,"title":{"show":true,"name":"X轴","location":"center","display":{"rotate":0,"offset":20},"textStyle":{"fontSize":12,"color":"#90a0ae","fontWeight":"normal"}},"axisLine":{"show":true,"type":"solid","width":1,"color":"rgba(255, 255, 255, 0.5)"},"axisTick":{"show":true,"type":"solid","width":1,"color":"rgba(255, 255, 255, 0.5)"},"axisLabel":{"show":true,"valueFormat":"d","timeFormat":"MM/DD","interval":"auto","display":{"rotate":0,"margin":10},"align":"center","textStyle":{"fontSize":12,"color":"rgba(255, 255, 255, 0.6)","fontWeight":"normal"}},"grid":{"show":true,"line":{"type":"dashed","width":1,"color":"rgba(233, 228, 228, 0.1)","dashedLength":4,"dashedSpace":4}}},"yAxis":{"show":true,"type":"value","extent":{"min":"auto","max":"auto"},"title":{"show":false,"name":"Y轴","location":"center","display":{"rotate":90,"offset":20},"textStyle":{"fontSize":12,"color":"#90a0ae","fontWeight":"normal"}},"axisLine":{"show":true,"type":"solid","width":1,"color":"rgba(255, 255, 255, 0.5)"},"axisTick":{"show":true,"type":"solid","width":1,"color":"rgba(255, 255, 255, 0.5)"},"axisLabel":{"show":true,"valueFormat":"auto","timeFormat":"MM/DD","boundaryGap":0,"display":{"rotate":0,"margin":8},"align":"right","textStyle":{"fontSize":12,"color":"rgba(255, 255, 255, 0.6)","fontWeight":"normal"}},"grid":{"show":true,"line":{"type":"dashed","width":1,"color":"rgba(233, 228, 228, 0.1)","dashedLength":4,"dashedSpace":4}}},"tooltip":{"show":true,"triggerOn":"mousemove","textStyle":{"fontSize":14,"color":"#fff","fontWeight":"normal"},"background":{"padding":{"h":5,"v":5},"color":"rgba(0, 0, 0, 0.65)","borderColor":"rgba(0, 0, 0, 0.25)","borderWidth":1},"pointer":{"show":true,"line":{"type":"dashed","width":1,"color":"#f5dc69","dashedLength":4,"dashedSpace":4}}},"legend":{"show":true,"position":"top-center","orient":"horizontal","textStyle":{"fontSize":12,"color":"#90a0ae","fontWeight":"normal"},"symbol":{"show":true,"icon":"auto","width":25,"height":14,"gap":10},"page":{"enabled":false,"size":{"width":100,"height":100},"button":{"size":15,"color":"#000","inactiveColor":"#000"},"pageNumColor":"#90a0ae"}},"series":[{"type":"line","id":"z9GWwr_C9m","name":"","line":{"color":"#34FFF5","style":"solid","width":1,"opacity":1,"smooth":0.5},"point":{"icon":"roundRect","color":"#34FFF5","borderColor":"rgba(0, 0, 0, 0.44)","borderWidth":1,"borderType":"solid","opacity":1},"label":{"show":false,"field":"y","valueFormat":"auto","describe":{"prefix":"","suffix":""},"offset":{"x":0,"y":0},"rotate":0,"textStyle":{"fontSize":12,"color":"#ddd","fontWeight":"normal"},"stroke":{"color":"#000","width":0}},"stack":"Total","areaStyle":{"color":"#34FFF5","opacity":0.7}},{"type":"line","id":"QEBkrSwCqF","name":"","line":{"color":"#30D9F1","style":"solid","width":1,"opacity":1,"smooth":0.5},"point":{"icon":"roundRect","color":"#30D9F1","borderColor":"rgba(0, 0, 0, 0.44)","borderWidth":1,"borderType":"solid","opacity":1},"label":{"show":false,"field":"y","valueFormat":"auto","describe":{"prefix":"","suffix":""},"offset":{"x":0,"y":0},"rotate":0,"textStyle":{"fontSize":12,"color":"#ddd","fontWeight":"normal"},"stroke":{"color":"#000","width":0}},"stack":"Total","areaStyle":{"color":"#30D9F1","opacity":0.7}},{"type":"line","id":"z9GWwr_C9m","name":"","line":{"color":"#34FFF5","style":"solid","width":1,"opacity":1,"smooth":0.5},"point":{"icon":"roundRect","color":"#34FFF5","borderColor":"rgba(0, 0, 0, 0.44)","borderWidth":1,"borderType":"solid","opacity":1},"label":{"show":false,"field":"y","valueFormat":"auto","describe":{"prefix":"","suffix":""},"offset":{"x":0,"y":0},"rotate":0,"textStyle":{"fontSize":12,"color":"#ddd","fontWeight":"normal"},"stroke":{"color":"#000","width":0}},"stack":"Total","areaStyle":{"color":"#34FFF5","opacity":0.7}}],"animation":{"enabled":true,"duration":1000,"easing":"cubicOut","delay":0}},"apis":{"source":{"fields":{"x":{"type":"string","map":"","description":"类目","optional":false},"y":{"type":"string","map":"","description":"值","optional":false},"s":{"type":"string","map":"","description":"系列","optional":false}},"description":"基本折线区域图接口","useAutoUpdate":false,"autoUpdate":1,"handler":"render"}},"apiData":{"source":{"id":"5a_ZRk9OCC","type":"static","pageFilters":[],"config":{"useFilter":false,"data":"[{\"x\":\"2000\",\"y\":2845,\"s\":\"类型A\"},{\"x\":\"2000\",\"y\":2327,\"s\":\"类型B\"},{\"x\":\"2000\",\"y\":1289,\"s\":\"类型C\"},{\"x\":\"2000\",\"y\":226,\"s\":\"类型D\"},{\"x\":\"2000\",\"y\":46,\"s\":\"类型E\"},{\"x\":\"2001\",\"y\":2848,\"s\":\"类型A\"},{\"x\":\"2001\",\"y\":2445,\"s\":\"类型B\"},{\"x\":\"2001\",\"y\":1316,\"s\":\"类型C\"},{\"x\":\"2001\",\"y\":237,\"s\":\"类型D\"},{\"x\":\"2001\",\"y\":47,\"s\":\"类型E\"},{\"x\":\"2002\",\"y\":2832,\"s\":\"类型A\"},{\"x\":\"2002\",\"y\":2518,\"s\":\"类型B\"},{\"x\":\"2002\",\"y\":1342,\"s\":\"类型C\"},{\"x\":\"2002\",\"y\":252,\"s\":\"类型D\"},{\"x\":\"2002\",\"y\":49,\"s\":\"类型E\"},{\"x\":\"2003\",\"y\":2958,\"s\":\"类型A\"},{\"x\":\"2003\",\"y\":2695,\"s\":\"类型B\"},{\"x\":\"2003\",\"y\":1397,\"s\":\"类型C\"},{\"x\":\"2003\",\"y\":276,\"s\":\"类型D\"},{\"x\":\"2003\",\"y\":48,\"s\":\"类型E\"},{\"x\":\"2004\",\"y\":3043,\"s\":\"类型A\"},{\"x\":\"2004\",\"y\":2906,\"s\":\"类型B\"},{\"x\":\"2004\",\"y\":1443,\"s\":\"类型C\"},{\"x\":\"2004\",\"y\":298,\"s\":\"类型D\"},{\"x\":\"2004\",\"y\":54,\"s\":\"类型E\"},{\"x\":\"2005\",\"y\":3068,\"s\":\"类型A\"},{\"x\":\"2005\",\"y\":3108,\"s\":\"类型B\"},{\"x\":\"2005\",\"y\":1485,\"s\":\"类型C\"},{\"x\":\"2005\",\"y\":320,\"s\":\"类型D\"},{\"x\":\"2005\",\"y\":60,\"s\":\"类型E\"},{\"x\":\"2006\",\"y\":3091,\"s\":\"类型A\"},{\"x\":\"2006\",\"y\":3293,\"s\":\"类型B\"},{\"x\":\"2006\",\"y\":1534,\"s\":\"类型C\"},{\"x\":\"2006\",\"y\":356,\"s\":\"类型D\"},{\"x\":\"2006\",\"y\":62,\"s\":\"类型E\"},{\"x\":\"2007\",\"y\":3071,\"s\":\"类型A\"},{\"x\":\"2007\",\"y\":3422,\"s\":\"类型B\"},{\"x\":\"2007\",\"y\":1562,\"s\":\"类型C\"},{\"x\":\"2007\",\"y\":382,\"s\":\"类型D\"},{\"x\":\"2007\",\"y\":66,\"s\":\"类型E\"},{\"x\":\"2008\",\"y\":3103,\"s\":\"类型A\"},{\"x\":\"2008\",\"y\":3587,\"s\":\"类型B\"},{\"x\":\"2008\",\"y\":1630,\"s\":\"类型C\"},{\"x\":\"2008\",\"y\":388,\"s\":\"类型D\"},{\"x\":\"2008\",\"y\":69,\"s\":\"类型E\"},{\"x\":\"2009\",\"y\":3042,\"s\":\"类型A\"},{\"x\":\"2009\",\"y\":3590,\"s\":\"类型B\"},{\"x\":\"2009\",\"y\":1584,\"s\":\"类型C\"},{\"x\":\"2009\",\"y\":415,\"s\":\"类型D\"},{\"x\":\"2009\",\"y\":66,\"s\":\"类型E\"},{\"x\":\"2010\",\"y\":3107,\"s\":\"类型A\"},{\"x\":\"2010\",\"y\":3812,\"s\":\"类型B\"},{\"x\":\"2010\",\"y\":1696,\"s\":\"类型C\"},{\"x\":\"2010\",\"y\":446,\"s\":\"类型D\"},{\"x\":\"2010\",\"y\":67,\"s\":\"类型E\"},{\"x\":\"2011\",\"y\":3134,\"s\":\"类型A\"},{\"x\":\"2011\",\"y\":4055,\"s\":\"类型B\"},{\"x\":\"2011\",\"y\":1756,\"s\":\"类型C\"},{\"x\":\"2011\",\"y\":494,\"s\":\"类型D\"},{\"x\":\"2011\",\"y\":64,\"s\":\"类型E\"},{\"x\":\"2012\",\"y\":3200,\"s\":\"类型A\"},{\"x\":\"2012\",\"y\":4106,\"s\":\"类型B\"},{\"x\":\"2012\",\"y\":1783,\"s\":\"类型C\"},{\"x\":\"2012\",\"y\":519,\"s\":\"类型D\"},{\"x\":\"2012\",\"y\":65,\"s\":\"类型E\"},{\"x\":\"2013\",\"y\":3220,\"s\":\"类型A\"},{\"x\":\"2013\",\"y\":4126,\"s\":\"类型B\"},{\"x\":\"2013\",\"y\":1806,\"s\":\"类型C\"},{\"x\":\"2013\",\"y\":554,\"s\":\"类型D\"},{\"x\":\"2013\",\"y\":68,\"s\":\"类型E\"},{\"x\":\"2014\",\"y\":3280,\"s\":\"类型A\"},{\"x\":\"2014\",\"y\":4117,\"s\":\"类型B\"},{\"x\":\"2014\",\"y\":1823,\"s\":\"类型C\"},{\"x\":\"2014\",\"y\":568,\"s\":\"类型D\"},{\"x\":\"2014\",\"y\":68,\"s\":\"类型E\"}]"},"comId":"BasicArea_2Z26_70oq"}},"events":{},"actions":{}},{"id":"WaterPolo_zgflWnJAU","name":"VWaterPolo","type":"com","alias":"水位图","icon":"v-icon-chart-bar","img":"./img/waterPolo.png","locked":false,"hided":false,"selected":false,"hovered":false,"renameing":false,"tag":0,"scaling":{"zoom":false,"w":218,"h":171,"sx":1,"sy":1},"attr":{"x":1642,"y":881,"w":218,"h":171,"deg":0,"opacity":1,"filpV":false,"filpH":false},"projectId":0,"config":{"dataset":0.5,"series":[{"type":"liquidFill","shape":"circle","radius":"90%","data":[0.5],"center":["50%","50%"],"color":[{"type":"linear","x":0,"y":0,"x2":0,"y2":1,"colorStops":[{"offset":0,"color":"#446bf5"},{"offset":1,"color":"#2ca3e2"}],"globalCoord":false}],"backgroundStyle":{"borderWidth":1,"color":"rgba(51, 66, 127, 0.7)"},"label":{"normal":{"textStyle":{"fontSize":31,"color":"#fff"}}},"outline":{"show":false,"borderDistance":10,"itemStyle":{"borderWidth":2,"borderColor":"#112165"}}}]},"apis":{"source":{"fields":{"value":{"type":"string","map":"","description":"","optional":true}},"description":"基本水位图接口","useAutoUpdate":false,"autoUpdate":1,"handler":"render"}},"apiData":{"source":{"id":"H6txEc0A9h","type":"static","pageFilters":[],"config":{"useFilter":false,"data":"{\"data\":[0.5]}"},"comId":"WaterPolo_zgflWnJAU"}},"events":{},"actions":{}},{"id":"Model3d_ZbnnmR5dM","name":"VModel3d","type":"com","alias":"3d模型","icon":"v-icon-material","img":"./img/tree-gif.jpg","locked":false,"hided":false,"selected":false,"hovered":false,"renameing":false,"tag":0,"scaling":{"zoom":false,"w":774,"h":621,"sx":1,"sy":1},"attr":{"x":589,"y":104,"w":774,"h":621,"deg":0,"opacity":1,"filpV":false,"filpH":false},"projectId":0,"config":{},"apis":{"source":{"fields":{"value":{"type":"string","map":"","description":"","optional":true}},"description":"","useAutoUpdate":false,"autoUpdate":1,"handler":"render"}},"apiData":{"source":{"id":"w7uBVuKmjd","type":"static","pageFilters":[],"config":{"useFilter":false,"data":""},"comId":"Model3d_ZbnnmR5dM"}},"events":{},"actions":{}}],"variables":{"componentsView":{},"publishersView":{},"subscribersView":{}},"dataFilters":[]}'

export default defineComponent({
  name: 'Preview',
  components: {
    DatavCom,
  },
  props: {
    screenId: {
      type: [String, Number],
      required: true,
    },
  },
  setup(props) {
    const filterStore = useFilterStore()
    const editorStore = useEditorStore()
    const comStore = useComStore()
    const eventStore = useEventStore()
    const loading = ref(true)
    const { pageConfig } = storeToRefs(editorStore)
    const { coms } = storeToRefs(comStore)
    console.log('coms=====', coms);
    const styleFilter = computed(() => {
      const sf = pageConfig.value.styleFilterParams
      let filter = ''
      if (sf.enable) {
        filter = `hue-rotate(${sf.hue}deg) contrast(${sf.contrast}%) opacity(${sf.opacity}%) saturate(${sf.saturate}%) brightness(${sf.brightness}%)`
      }
      return filter
    })

    const resizeAuto = (width: number, height: number) => {
      const cw = document.documentElement.clientWidth
      const ch = document.documentElement.clientHeight
      const ratioX = cw / width
      const ratioY = ch / height
      setStyle(document.body, {
        transform: `scale(${ratioX}, ${ratioY})`,
        transformOrigin: 'left top',
        backgroundSize: '100% 100%',
      } as CSSStyleDeclaration)
    }

    const resizeWidth = (width: number) => {
      const ratio = document.documentElement.clientWidth / width
      setStyle(document.body, {
        transform: `scale(${ratio})`,
        transformOrigin: 'left top',
        backgroundSize: '100%',
      } as CSSStyleDeclaration)
    }

    const resizeHeight = (width: number, height: number) => {
      const cw = document.documentElement.clientWidth
      const ch = document.documentElement.clientHeight
      const ratio = ch / height
      const gap = (cw - width * ratio) / 2
      setStyle(document.body, {
        transform: `scale(${ratio})`,
        transformOrigin: 'left top',
        backgroundSize: `${(width / cw * ratio) * 100}% 100%`,
        backgroundPosition: `${gap.toFixed(3)}px top`,
        marginLeft: `${gap.toFixed(3)}px`,
      } as CSSStyleDeclaration)
    }

    const resizeFull = (width: number, height: number) => {
      const cw = document.documentElement.clientWidth
      const ch = document.documentElement.clientHeight
      const ratio = ch / height
      const gap = (cw - width * ratio) / 2
      setStyle(document.body, {
        transform: `scale(${ratio})`,
        transformOrigin: 'left top',
        backgroundSize: `${(width / cw * ratio) * 100}% 100%`,
        backgroundPosition: `${gap.toFixed(3)}px top`,
        // marginLeft: `${gap.toFixed(3)}px`,
      } as CSSStyleDeclaration)

      document.documentElement.style.overflowX = 'scroll'
    }

    const resizeNone = () => {
      setStyle(document.body, {
        overflow: 'hidden',
        position: 'relative',
      } as CSSStyleDeclaration)
    }

    const resize = (config: PageConfig) => {
      switch (config.zoomMode) {
        case ZoomMode.auto:
          resizeAuto(config.width, config.height)
          break
        case ZoomMode.width:
          resizeWidth(config.width)
          break
        case ZoomMode.height:
          resizeHeight(config.width, config.height)
          break
        case ZoomMode.full:
          resizeFull(config.width, config.height)
          break
        default:
          resizeNone()
          break
      }
    }

    const initPageInfo = (config: PageConfig) => {
      document.title = editorStore.screen.name
      document.querySelector('meta[name="viewport"]')
        .setAttribute('content', `width=${config.width}`)

      setStyle(document.documentElement, {
        overflowX: 'hidden',
        overflowY: 'visible',
      } as CSSStyleDeclaration)

      setStyle(document.body, {
        width: `${config.width}px`,
        height: `${config.height}px`,
        backgroundImage: `url(${pageConfig.value.bgimage})`,
        backgroundColor: pageConfig.value.bgcolor,
      } as CSSStyleDeclaration)

      resize(config)
    }

    const router = useRouter()

    onMounted(async () => {
      try {
        const data = await getScreen(+props.screenId)
        if (data) {
          editorStore.setEditorOption({
            screen: data.screen,
            config: data.config,
          })
          initPageInfo(data.config)

          comStore.load(data.coms)
          const { componentsView, publishersView, subscribersView } = data.variables
          eventStore.$patch({ componentsView, publishersView, subscribersView })
          filterStore.$patch({ dataFilters: data.dataFilters ?? [] })

          setTimeout(() => {
            loading.value = false
          }, 500)

          on(window, 'resize', () => {
            resize(pageConfig.value)
          })
        } else {
          throw new Error('404')
        }
      } catch (error) {
        router.replace({
          name: 'NotFound',
          params: { catchAll: 'error' },
        })
      }
    })

    return {
      cdn,
      LOGO: globalConfig.logo,
      loading,
      pageConfig,
      coms,
      styleFilter,
    }
  },
})
</script>

<style lang="scss">
html,
body {
  min-width: auto;
}

#datav-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0f2a42;
  z-index: 2;

  .datav-logo,
  .text-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .datav-logo {
    width: 120px;
  }

  .text-logo {
    margin-top: 73px;
    width: 100px;
  }
}

.datav-layout {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;

  .-datav-com.absolute {
    position: absolute !important;
    margin: 0 !important;
  }
}

.datav-watermark {
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 99999999;
  width: 50px;

  img {
    width: 32px;
    height: 32px;
    vertical-align: middle;
  }
}
</style>
