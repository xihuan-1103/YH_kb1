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
            <Logo leftTitle="缙智畅" rightTitle="隧道看板" />
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
        <SuiDaoDiTu ref="refTunnelMap" />
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
        <YiDongYiDang @selectTunnel="handleSelectTunnel" />
        <BingHaiFenBuTongJi />
        <YangHuJinDu />
      </template>
      <template #right>
        <XunJianTongJi />
        <BingHaiGuZhangTongJi />
        <JiHuaTongJi />
        <JianCeGaiKuang />
        <JiDianTongJi />
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

import SuiDaoDiTu from './components/SuiDaoDiTu/index.vue'
import YiDongYiDang from './components/YiDongYiDang/index.vue'
import BingHaiFenBuTongJi from './components/BingHaiFenBuTongJi/index.vue'
import YangHuJinDu from './components/YangHuJinDu/index.vue'
import XunJianTongJi from './components/XunJianTongJi/index.vue'
import BingHaiGuZhangTongJi from './components/BingHaiGuZhangTongJi/index.vue'
import JiHuaTongJi from './components/JiHuaTongJi/index.vue'
import JianCeGaiKuang from './components/JianCeGaiKuang/index.vue'
import JiDianTongJi from './components/JiDianTongJi/index.vue'

export default {
  name: 'TunnelDashboard',
  components: {
    Layout,
    HeaderLayout,
    Logo,
    TimeCounter,
    FullScreen,
    YingYongChangJing,
    WaterMaker,
    HeaderTop,
    YiDongYiDang,
    SuiDaoDiTu,
    BingHaiFenBuTongJi,
    YangHuJinDu,
    XunJianTongJi,
    BingHaiGuZhangTongJi,
    JiHuaTongJi,
    JianCeGaiKuang,
    JiDianTongJi
  },
  methods: {
    handleSelectTunnel(id) {
      this.$refs.refTunnelMap.focusTunnel(id)
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
