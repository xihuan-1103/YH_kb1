<template>
  <div class="page-404">
    <h1>404</h1>
    <p>页面未找到</p>
    <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
  </div>
</template>

<style lang="scss" scoped>
.page-404 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #fff;
  h1 { font-size: 120px; margin: 0; }
  p { font-size: 24px; opacity: 0.7; }
}
</style>
