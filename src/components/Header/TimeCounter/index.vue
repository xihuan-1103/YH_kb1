<template>
  <div class="completion-date">{{ completionDate }}</div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'TimeCounter',
  data() {
    return {
      timer: null,
      completionDate: ''
    }
  },
  mounted() {
    this.getTime()
    this.timer = setInterval(() => {
      this.getTime()
    }, 1000)
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    getTime() {
      this.completionDate = dayjs(Date.now()).format('YYYY年MM月DD日 HH:mm:ss')
    }
  }
}
</script>

<style lang="scss" scoped>
.completion-date {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  opacity: 0.75;
  letter-spacing: 0.03em;
}
</style>
