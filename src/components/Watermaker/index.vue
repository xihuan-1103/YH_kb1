<template>
  <div />
</template>

<script>
import { setWaterMark, removeWaterMark } from '@/utils/watermark'

export default {
  name: 'WaterMaker',
  mounted() {
    setWaterMark()
  },
  destroyed() {
    removeWaterMark()
  }
}
</script>
