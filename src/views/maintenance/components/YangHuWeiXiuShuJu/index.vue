<template>
  <div class="yanghu-weixiu-shuju">
    <ScreenSubtitle name="养护维修数据" />
    <div class="content-wrap">
      <el-table :data="tableData" size="mini" style="width:100%" max-height="220">
        <el-table-column prop="bridge" label="桥梁" width="100" />
        <el-table-column prop="type" label="类型" width="80" />
        <el-table-column prop="content" label="内容" show-overflow-tooltip />
        <el-table-column prop="investment" label="投资(万)" width="75" />
        <el-table-column prop="status" label="状态" width="65">
          <template slot-scope="{ row }">
            <el-tag :type="row.status === '已完工' ? 'success' : ''" size="mini">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import ScreenSubtitle from '@/components/ScreenSubtitle/index.vue'
import { getMaintenanceRepairData } from '@/api/maintenance'

export default {
  name: 'YangHuWeiXiuShuJu',
  components: { ScreenSubtitle },
  data() {
    return { tableData: [] }
  },
  async mounted() {
    const res = await getMaintenanceRepairData()
    if (res.code === 200) {
      this.tableData = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.yanghu-weixiu-shuju { width: 490px; }
.content-wrap {
  padding: 8px 16px;
  ::v-deep .el-table {
    background: transparent;
    color: #fff;
    &::before { background-color: #295e97; }
    th { background: rgba(8, 32, 68, 0.7); color: #8dccf5; border-color: #295e97; }
    td { background: transparent; border-color: rgba(41, 94, 151, 0.3); }
    tr:hover td { background: rgba(64, 158, 255, 0.1); }
    .el-table__body-wrapper { &::-webkit-scrollbar { width: 6px; } &::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 3px; } }
  }
}
</style>
