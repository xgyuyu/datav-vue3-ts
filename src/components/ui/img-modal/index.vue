<template>
  <n-modal v-model:show="props.showModal" :on-update:show="closeModal">
    <n-card
        style="width: 800px"
        title="图库"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <div>
        <img
            v-for="item in props.imgArr"
            @click="clickImg(item)"
            :key="item"
            :src="item"
            style="width: 160px;height: 100px;margin-right: 20px"
            :style="props.imgStyle"
        />
      </div>
<!--      <template #footer>-->
<!--        -->
<!--      </template>-->
    </n-card>
  </n-modal>
</template>
<script setup lang="ts">
import {ref, PropType, defineEmits, computed, toRef} from 'vue'
const props = defineProps({
  imgArr: {
    type: Array as PropType<any>,
  },
  showModal: {
    type: Boolean as PropType<Boolean>,
  },
  imgStyle: {
    type: String as PropType<String>,
  },
})
const emits = defineEmits(['clickImg', 'closeModal'])

const clickImg = (item) => {
  emits('clickImg', item)
}
const closeModal = () => {
  emits('closeModal')
}

</script>
<style lang="scss" scoped>
.n-card.n-modal{
  background: #0f2a42;
}
</style>