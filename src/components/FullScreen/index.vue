<template>
  <div class="fullscreen-btn" @click="toggle">
    <i :class="isFullscreen ? 'el-icon-copy-document' : 'el-icon-full-screen'" />
  </div>
</template>

<script>
export default {
  name: 'FullScreen',
  data() {
    return { isFullscreen: false }
  },
  mounted() {
    document.addEventListener('fullscreenchange', this.onFullscreenChange)
  },
  destroyed() {
    document.removeEventListener('fullscreenchange', this.onFullscreenChange)
  },
  methods: {
    toggle() {
      if (!this.isFullscreen) {
        document.documentElement.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    },
    onFullscreenChange() {
      this.isFullscreen = !!document.fullscreenElement
    }
  }
}
</script>

<style lang="scss" scoped>
.fullscreen-btn {
  cursor: pointer;
  color: #fff;
  font-size: 18px;
  opacity: 0.75;
  margin-left: 16px;
  &:hover { opacity: 1; }
}
</style>
