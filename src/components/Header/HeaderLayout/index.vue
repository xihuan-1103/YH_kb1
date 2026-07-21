<template>
  <div class="top">
    <el-row>
      <el-col :span="8" class="left">
        <slot name="left" />
      </el-col>
      <el-col :span="8" class="middle">
        <slot name="middle" />
      </el-col>
      <el-col :span="8" class="right">
        <slot name="right" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HeaderLayout'
}
</script>

<style lang="scss" scoped>
.top {
  padding: 0;
  height: 110px;
  width: 1920px;
  background-image: url('~@/assets/bg_top.png');
  background-size: 100% 100%;
}

.left,
.right {
  height: 100%;
}

::v-deep .el-row {
  height: 100%;
}
</style>
