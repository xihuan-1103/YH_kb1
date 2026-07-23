<template>
  <div class="top" :style="{ backgroundImage: 'url(' + bgTop + ')' }">
    <el-row type="flex" align="middle" justify="space-between">
      <el-col :span="7" class="left">
        <slot name="left" />
      </el-col>
      <el-col :span="10" class="middle">
        <slot name="middle" />
      </el-col>
      <el-col :span="7" class="right">
        <slot name="right" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import bgTop from '@/assets/bg_top.png'

export default {
  name: 'HeaderLayout',
  data() {
    return {
      bgTop
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  padding: 0 16px;
  height: 95px;
  width: 1920px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center top;
  position: relative;
  box-sizing: border-box;
  background-color: rgba(6, 20, 48, 0.85);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6), inset 0 -1px 0 rgba(0, 243, 255, 0.3);
}

.left,
.middle,
.right {
  height: 100%;
  display: flex;
  align-items: center;
}

.left {
  justify-content: flex-start;
}

.middle {
  justify-content: center;
}

.right {
  justify-content: flex-end;
}

::v-deep .el-row {
  height: 100%;
  width: 100%;
}
</style>
