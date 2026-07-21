<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="width"
    :before-close="handleClose"
    custom-class="pro-dialog"
    append-to-body
  >
    <slot />
  </el-dialog>
</template>

<script>
export default {
  name: 'ProDialog',
  props: {
    title: { type: String, default: '' },
    visible: { type: Boolean, default: false },
    width: { type: String, default: '600px' }
  },
  computed: {
    dialogVisible: {
      get() { return this.visible },
      set(val) { this.$emit('update:visible', val) }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss">
.pro-dialog {
  background: #0a2044 !important;
  border: 1px solid #295e97;
  border-radius: 8px;

  .el-dialog__header {
    border-bottom: 1px solid #295e97;
    .el-dialog__title { color: #fff; }
    .el-dialog__headerbtn .el-dialog__close { color: #8dccf5; }
  }

  .el-dialog__body {
    color: #fff;
    padding: 20px;
  }
}
</style>
