<template>
  <div class="scene-container">
    <div class="scene-wrap">
      <div class="scene-list">
        <div
          v-for="(item, i) in sceneList"
          :key="i"
          class="scene-item"
          :class="{ active: item.path === currentPath }"
          @click="handleSceneClick(item)"
        >
          <div class="scene-cube-3d">
            <div class="cube-top"></div>
            <i :class="item.icon" class="cube-icon"></i>
            <div class="cube-glow-halo"></div>
          </div>
          <div class="scene-name">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YingYongChangJing',
  data() {
    return {
      sceneList: [
        { name: '贸易云', path: '/comprehensive', icon: 'el-icon-box' },
        { name: '金融云', path: '/finance', icon: 'el-icon-coin' },
        { name: '公路云', path: '/road', icon: 'el-icon-guide' },
        { name: '中心云', path: '/center', icon: 'el-icon-connection' },
        { name: '轨道云', path: '/rail', icon: 'el-icon-school' },
        { name: '商业云', path: '/business', icon: 'el-icon-shopping-bag-2' },
        { name: '工程云', path: '/engineering', icon: 'el-icon-office-building' }
      ]
    }
  },
  computed: {
    currentPath() {
      return this.$route.path
    }
  },
  methods: {
    handleSceneClick(item) {
      if (item.path !== this.currentPath && this.$router) {
        this.$router.push(item.path).catch(() => {})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/scrollbar.scss';

.scene-container {
  width: 100%;
  height: 90px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}

.scene-wrap {
  width: 100%;
  overflow-x: auto;
  @include normal-scrollbar-x();
  padding: 0 10px;
}

.scene-list {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 28px;
  height: 85px;
}

.scene-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: translateY(-4px);

    .scene-cube-3d {
      box-shadow: 0 10px 25px rgba(0, 243, 255, 0.5), inset 0 0 15px rgba(0, 243, 255, 0.4);
      border-color: #00f3ff;
      background: linear-gradient(135deg, rgba(0, 243, 255, 0.35) 0%, rgba(24, 144, 255, 0.5) 100%);

      .cube-icon {
        color: #ffffff;
        transform: scale(1.15);
      }
    }

    .scene-name {
      color: #00f3ff;
      text-shadow: 0 0 8px rgba(0, 243, 255, 0.8);
    }
  }

  &.active {
    .scene-cube-3d {
      background: linear-gradient(135deg, #1890ff 0%, #00f3ff 100%);
      border-color: #ffffff;
      box-shadow: 0 0 20px rgba(0, 243, 255, 0.8), inset 0 0 12px rgba(255, 255, 255, 0.5);

      .cube-icon {
        color: #ffffff;
      }
    }

    .scene-name {
      color: #ffffff;
      font-weight: bold;
      text-shadow: 0 0 10px rgba(0, 243, 255, 0.9);
    }
  }
}

.scene-cube-3d {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, rgba(20, 60, 115, 0.8) 0%, rgba(10, 35, 75, 0.9) 100%);
  border: 1.5px solid rgba(0, 243, 255, 0.5);
  border-radius: 10px;
  transform: rotate(-5deg) skewX(-2deg);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(0, 243, 255, 0.2);
  transition: all 0.3s ease;

  .cube-icon {
    font-size: 22px;
    color: #00f3ff;
    transition: all 0.3s ease;
  }

  .cube-glow-halo {
    position: absolute;
    bottom: -6px;
    width: 32px;
    height: 6px;
    background: radial-gradient(ellipse at center, rgba(0, 243, 255, 0.6) 0%, rgba(0, 243, 255, 0) 70%);
    border-radius: 50%;
  }
}

.scene-name {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
  margin-top: 8px;
  white-space: nowrap;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}
</style>
