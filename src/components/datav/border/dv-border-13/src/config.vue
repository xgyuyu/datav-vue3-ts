<template>
  <div class="setting-panel-gui">
    <g-field
        :level="2"
        label="边框样式"
    >
<!--      <g-select-image-->
<!--          v-model="config.boxStyle.style"-->
<!--          :images="presetImages"-->
<!--      />-->
      <g-upload-image v-model="config.img">
        <n-icon @click="setImgModal" color="#fff" style="cursor: pointer;background: #2483ff">
          <IconImg />
        </n-icon>
      </g-upload-image>
    </g-field>
    <img-modal
        :showModal="showImgModal"
        :imgArr="imgArr"
        imgStyle="width: 80px;height: 80px;margin-right: 10px"
        @clickImg="changeImgBg"
        @closeModal="closeModal"

    />
  </div>
</template>

<script lang='ts'>
import {defineComponent, PropType, ref, toRef} from 'vue'
import { VDvBorder13, borderArr } from './dv-border-13'
import { IconImg } from '@/icons'

export default defineComponent({
  name: 'VBorderBoxProp',
  props: {
    com: {
      type: Object as PropType<VDvBorder13>,
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
      config.value.img = item
    }
    const closeModal = () => {
      showImgModal.value = false
    }
    const setImgModal = () => {
      showImgModal.value = true
      const arr1 = Array.from({length: 14}).map((v, i) => `./source/border${i+1}.png`);
      imgArr.value = borderArr.concat(arr1)
    }
    return {
      config,
      showImgModal,
      imgArr,
      closeModal,
      changeImgBg,
      setImgModal,
    }
  },
})
</script>
