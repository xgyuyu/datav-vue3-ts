<template>
  <div class="setting-panel-gui">
    <g-field
        :level="2"
        label="装饰元素"
    >
      <!--      <g-select-image-->
      <!--          v-model="config.global.img"-->
      <!--          :images="images"-->
      <!--      />-->
      <g-upload-image v-model="config.global.img">
        <n-icon @click="setImgModal" color="#fff" style="cursor: pointer;background: #2483ff">
          <IconImg />
        </n-icon>
      </g-upload-image>
    </g-field>
    <g-field
        :level="2"
        label="开启旋转"
    >
      <n-switch
          v-model:value="config.global.isRotate"
      />
    </g-field>
    <g-field
        v-if="config.global.isRotate"
        :level="2"
        label="旋转时间"
    >
      <g-input-number
          v-model="config.global.dur"
          :min="2"
          :max="20"
          :step="1"
          inline="inline"
      />
    </g-field>
    <g-field
        :level="2"
        label="透明度"
    >
      <g-slider
          v-model="config.global.opacity"
          :min="0"
          :max="1"
          :step="0.1"
      />
    </g-field>
    <img-modal
        :showModal="showImgModal"
        :imgArr="imgArr"
        imgStyle="width: 80px;height: 80px;margin-right: 10px"
        @clickImg="changeImgBg"
    />
  </div>
</template>

<script lang='ts'>
import {defineComponent, PropType, ref, toRef} from 'vue'
import {VDvDecorate6, decorateArr} from './dv-decorate-6'
import { IconImg } from '@/icons'

export default defineComponent({
  name: 'VDecorationProp',
  props: {
    com: {
      type: Object as PropType<VDvDecorate6>,
      required: true,
    },
  },
  components: {
    IconImg,
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    const showImgModal = ref(false)
    const imgArr = ref([])

    const changeImgBg = (item) => {
      showImgModal.value = false
      config.value.global.img = item
    }

    const setImgModal = () => {
      showImgModal.value = true
      const arr1 = Array.from({length: 18}).map((v, i) => `./source/icon${i+1}.png`);
      const arr2 = Array.from({length: 41}).map((v, i) => `./source/icon-svg${i+1}.svg`);
      imgArr.value = decorateArr.concat(arr1).concat(arr2)
    }
    return {
      config,
      showImgModal,
      imgArr,
      changeImgBg,
      setImgModal,
    }
  },
})
</script>
