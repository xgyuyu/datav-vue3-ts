<template>
  <div class="setting-panel-gui">

  </div>
</template>
<script lang='ts' setup>
import { toRef } from 'vue'
import VThreeEarth from "./three-earth"

const props = defineProps<{
  com: VThreeEarth
}>();
const config = toRef(props.com, 'config')


</script>