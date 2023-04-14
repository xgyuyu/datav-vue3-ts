<template>
  <div class="setting-panel-gui">
    <g-field
      label="图片类型"
    >
      <n-radio-group
        v-model:value="config.imageType"
        size="small"
      >
        <n-radio-button
          v-for="em in imageTypes"
          :key="em.id"
          :value="em.id"
        >
          {{ em.value }}
        </n-radio-button>
      </n-radio-group>
    </g-field>
    <g-field
      label="背景图"
      v-if="config.imageType === 'bitmap'"
    >
      <g-upload-image
        v-model="config.backgroundImage"
      >
        <n-icon @click="setImgModal" color="#fff" style="cursor: pointer;background: #2483ff">
          <IconImg />
        </n-icon>
      </g-upload-image>
    </g-field>
    <g-field
      v-if="config.imageType === 'vector'"
      label="矢量图"
    >
      <g-upload-image
        v-model="config.vectorImage"
      >
        <n-icon @click="setImgModal" color="#fff" style="cursor: pointer;background: #2483ff">
          <IconImg />
        </n-icon>
      </g-upload-image>
    </g-field>
    <g-field
      v-if="config.imageType === 'vector'"
      label="填充色"
    >
      <g-color-picker
        v-model="config.vectorFill"
      />
    </g-field>
    <g-field
      label="图片重复"
    >
      <g-select
        v-model="config.repeat"
        :data="repeatTypes"
      />
    </g-field>
    <g-field
      label="圆角"
    >
      <g-input-number
        v-model="config.radius"
        :min="0"
        :step="1"
        suffix="px"
      />
    </g-field>
    <g-field-collapse
      tooltip="点击图片区域可跳转至设定的超链接"
      label="超链接配置"
    >
      <g-field
        :level="2"
        label="超链接"
      >
        <g-input
          v-model="config.urlConfig.url"
        />
      </g-field>
      <g-field
        :level="2"
        label="是否打开新窗口"
      >
        <n-switch
          v-model:value="config.urlConfig.ifBlank"
        />
      </g-field>
    </g-field-collapse>
    <g-field
      label="手势光标"
    >
      <n-switch
        v-model:value="config.cursor"
      />
    </g-field>
    <img-modal
        :showModal="showImgModal"
        :imgArr="imgArr"
        imgStyle="width: 80px;height: 80px;margin-right: 10px"
        @clickImg="clickImg"
        @closeModal="closeModal"
    />
  </div>
</template>

<script lang='ts'>
import {defineComponent, PropType, ref, toRef} from 'vue'
import {
  imageTypes,
  repeatTypes,
} from '@/data/select-options'
import { MainImg } from './main-img'
import { IconImg } from '@/icons'

export default defineComponent({
  name: 'VMainImgProp',
  props: {
    com: {
      type: Object as PropType<MainImg>,
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

    const clickImg = (item) => {
      showImgModal.value = false
      config.value.imageType === 'vector' ? config.value.vectorImage = item : config.value.backgroundImage = item
    }
    const closeModal = () => {
      showImgModal.value = false
    }
    const setImgModal = () => {
      showImgModal.value = true
      const arr1 = Array.from({length: 17}).map((v, i) => `./source/pc${i+1}.png`);
      const arr2 = Array.from({length: 24}).map((v, i) => `./source/pc${i+1}.svg`);
      imgArr.value = config.value.imageType === 'vector' ? arr2 : arr1
    }
    return {
      config,
      showImgModal,
      imgArr,
      clickImg,
      setImgModal,
      closeModal,
      imageTypes,
      repeatTypes,
    }
  },
})
</script>
