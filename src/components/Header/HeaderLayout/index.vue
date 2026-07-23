<template>
  <div class="top">
    <div class="header-base-bar"></div>
    <el-row type="flex" align="middle" justify="space-between">
      <el-col :span="6" class="left">
        <slot name="left" />
      </el-col>
      <el-col :span="12" class="middle">
        <slot name="middle" />
      </el-col>
      <el-col :span="6" class="right">
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
  height: 92px;
  width: 1920px;
  position: relative;
  box-sizing: border-box;
  background: transparent;
  overflow: visible;
}

.header-base-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  background: linear-gradient(180deg, rgba(24, 75, 155, 0.85) 0%, rgba(14, 52, 115, 0.85) 100%);
  border-bottom: 1px solid rgba(100, 185, 255, 0.4);
  box-shadow: 0 4px 20px rgba(0, 40, 100, 0.35);
  z-index: 1;
}

.left,
.middle,
.right {
  height: 100%;
  display: flex;
  position: relative;
  z-index: 2;
}

.left {
  align-items: flex-start;
  justify-content: flex-start;
}

.middle {
  align-items: flex-start;
  justify-content: center;
}

.right {
  align-items: flex-start;
  justify-content: flex-end;
}

::v-deep .el-row {
  height: 100%;
  width: 100%;
}
</style>
