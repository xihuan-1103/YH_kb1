<template>
  <div class="container">
    <Layout>
      <template #header>
        <HeaderLayout>
          <template #left>
            <div class="header-left">
              <span class="org-name">缙智畅养护中心</span>
            </div>
          </template>
          <template #middle>
            <Logo leftTitle="缙智畅" rightTitle="路面看板" />
          </template>
          <template #right>
            <div class="right-menu">
              <div class="header-decoration-wrap">
                <TimeCounter />
                <FullScreen />
              </div>
            </div>
          </template>
        </HeaderLayout>
      </template>
      <template #back>
        <LuMianDiTu ref="refRoadMap" />
      </template>
      <template #top>
        <div class="top-section">
          <HeaderTop class="animeTop" />
        </div>
      </template>
      <template #bottom>
        <YingYongChangJing class="animeBottom" />
      </template>
      <template #left>
        <YiLuYiDang @selectRoad="handleSelectRoad" />
        <ZongTiLuKuangPingDing />
      </template>
      <template #right>
        <BingHaiChuZhi />
        <PCILuDuanLiChengZhanBi />
      </template>
    </Layout>
    <WaterMaker />
  </div>
</template>

<script>
import Layout from '@/components/Layout/aside.vue'
import { HeaderLayout, Logo, TimeCounter } from '@/components/Header/index.js'
import FullScreen from '@/components/FullScreen/index.vue'
import YingYongChangJing from '@/components/YingYongChangJing/index.vue'
import WaterMaker from '@/components/Watermaker/index.vue'

import HeaderTop from '@/views/comprehensive/components/HeaderTop/index.vue'
import BingHaiChuZhi from '@/views/comprehensive/components/BingHaiChuZhi/index.vue'

import LuMianDiTu from './components/LuMianDiTu/index.vue'
import YiLuYiDang from './components/YiLuYiDang/index.vue'
import ZongTiLuKuangPingDing from './components/ZongTiLuKuangPingDing/index.vue'
import PCILuDuanLiChengZhanBi from './components/PCILuDuanLiChengZhanBi/index.vue'

export default {
  name: 'RoadDashboard',
  components: {
    Layout,
    HeaderLayout,
    Logo,
    TimeCounter,
    FullScreen,
    YingYongChangJing,
    WaterMaker,
    HeaderTop,
    YiLuYiDang,
    ZongTiLuKuangPingDing,
    PCILuDuanLiChengZhanBi,
    BingHaiChuZhi,
    LuMianDiTu
  },
  methods: {
    handleSelectRoad(id) {
      this.$refs.refRoadMap.focusRoad(id)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0;
  width: 1920px;

  ::v-deep .bottomLayout {
    height: auto !important;
  }
}

.header-left {
  display: flex;
  align-items: center;
  height: 50%;
  padding-left: 30px;
}

.org-name {
  color: rgba(255, 255, 255, 0.85);
  font-size: 16px;
  font-weight: 700;
  cursor: default;
}

.right-menu {
  width: 100%;
  height: 100%;
  position: relative;
  display: inline-block;

  .header-decoration-wrap {
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 29px;
    font-size: 14px;
    position: relative;
  }
}

.top-section {
  width: 100%;
}
</style>
