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
            <Logo leftTitle="缙智畅" rightTitle="巡检一张图" />
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
        <XunJianDiTu />
      </template>
      <template #top>
        <div class="animeTop"></div>
      </template>
      <template #bottom>
        <YingYongChangJing class="animeBottom" />
      </template>
      <template #left>
        <XunJianLeiXingTongJi />
        <XunJianRenWu />
        <XunJianQuShi />
      </template>
      <template #right>
        <QueXianTongJi />
        <QiaoLiangQueXianPaiHang />
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

import XunJianDiTu from './components/XunJianDiTu/index.vue'
import XunJianLeiXingTongJi from './components/XunJianLeiXingTongJi/index.vue'
import XunJianRenWu from './components/XunJianRenWu/index.vue'
import XunJianQuShi from './components/XunJianQuShi/index.vue'
import QueXianTongJi from './components/QueXianTongJi/index.vue'
import QiaoLiangQueXianPaiHang from './components/QiaoLiangQueXianPaiHang/index.vue'

export default {
  name: 'InspectionDashboard',
  components: {
    Layout, HeaderLayout, Logo, TimeCounter, FullScreen, YingYongChangJing, WaterMaker,
    XunJianDiTu, XunJianLeiXingTongJi, XunJianRenWu, XunJianQuShi,
    QueXianTongJi, QiaoLiangQueXianPaiHang
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
