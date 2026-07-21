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
            <Logo leftTitle="缙智畅" rightTitle="养护一张图" />
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
        <YangHuDiTu />
      </template>
      <template #top>
        <div class="animeTop"></div>
      </template>
      <template #bottom>
        <YingYongChangJing class="animeBottom" />
      </template>
      <template #left>
        <ShiGongXiangMu />
        <ShiGongZhuangTai />
        <YangHuCiShuPaiMing />
      </template>
      <template #right>
        <YangHuQuShi />
        <YangHuWeiXiuTongJi />
        <YangHuWeiXiuShuJu />
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

import YangHuDiTu from './components/YangHuDiTu/index.vue'
import ShiGongXiangMu from './components/ShiGongXiangMu/index.vue'
import ShiGongZhuangTai from './components/ShiGongZhuangTai/index.vue'
import YangHuCiShuPaiMing from './components/YangHuCiShuPaiMing/index.vue'
import YangHuQuShi from './components/YangHuQuShi/index.vue'
import YangHuWeiXiuTongJi from './components/YangHuWeiXiuTongJi/index.vue'
import YangHuWeiXiuShuJu from './components/YangHuWeiXiuShuJu/index.vue'

export default {
  name: 'MaintenanceDashboard',
  components: {
    Layout, HeaderLayout, Logo, TimeCounter, FullScreen, YingYongChangJing, WaterMaker,
    YangHuDiTu, ShiGongXiangMu, ShiGongZhuangTai, YangHuCiShuPaiMing,
    YangHuQuShi, YangHuWeiXiuTongJi, YangHuWeiXiuShuJu
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 1920px;

  ::v-deep .bottomLayout {
    height: auto !important;
  }
}

.header-left {
  display: flex;
  align-items: center;
  height: 100%;
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
</style>
