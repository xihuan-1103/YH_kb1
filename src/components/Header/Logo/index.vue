<template>
  <div class="logo">
    <div class="banner-text">交科养护集团 · 驾驶舱</div>
    <div class="title">
      <span>{{ leftTitle }}</span>
      <span><img class="dotted-line" src="@/assets/line.png" alt="|" /></span>
      <span>{{ rightTitle }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    leftTitle: {
      type: String,
      default: '交科养护集团'
    },
    rightTitle: {
      type: String,
      default: '养护看板'
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.banner-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 4px;
  font-weight: 400;
  padding-top: 16px;
}

.title {
  font-family: '黑体', serif;
  text-align: center;
  font-size: 36px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 4px 10px #0e8eff, 0 4px 14px #0e8eff;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: row;
  margin-top: 16px;

  > span {
    display: flex;
    align-self: center;
  }
}

.dotted-line {
  margin: 0 16px;
  height: 30px;
  width: 2px;
}
</style>
