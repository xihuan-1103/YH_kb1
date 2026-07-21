<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      freshTimeout: null,
      resizeListener: null
    }
  },
  created() {
    this.$nextTick(() => {
      document.oncontextmenu = new Function('event.returnValue=false')
      document.onselectstart = new Function('event.returnValue=false')
    })
  },
  mounted() {
    this.refresh()
    this.resizeListener = () => {
      clearTimeout(this.freshTimeout)
      this.freshTimeout = setTimeout(() => {
        this.refresh()
      }, 10)
    }
    window.addEventListener('resize', this.resizeListener)
  },
  destroyed() {
    clearTimeout(this.freshTimeout)
    window.removeEventListener('resize', this.resizeListener)
  },
  methods: {
    refresh() {
      const ratioX = window.innerWidth / 1920
      const ratioY = window.innerHeight / 1080
      const bodyDom = document.getElementById('bodyid')
      if (!bodyDom) return
      bodyDom.style.transform = `scale(${ratioX},${ratioY})`
      bodyDom.style.webkitTransformOrigin = 'left top'
      const html = document.getElementsByTagName('html')[0]
      const screenWidth = window.innerWidth || (document.body && document.body.clientWidth) || 1920
      html.style.fontSize = `${screenWidth / 150}px`
    }
  }
}
</script>
