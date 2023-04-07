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
        imgStyle="width: 180px;height: 40px;margin-right: 10px"
        @clickImg="changeImgBg"
    />
  </div>
</template>
<script lang='ts'>
import {defineComponent, PropType, ref, toRef} from 'vue'
import { TitleBg } from './title-bg'
import { IconImg } from '@/icons'

export default defineComponent({
  name: 'VBorderBoxProp',
  props: {
    com: {
      type: Object as PropType<TitleBg>,
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
    const setImgModal = () => {
      showImgModal.value = true
      const titleArr1 = Array.from({length: 9}).map((v, i) => `./source/title${i+1}.png`);
      const titleArr2 = Array.from({length: 2}).map((v, i) => `./source/subtitle${i+1}.png`);
      imgArr.value = titleArr1.concat(titleArr2)
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