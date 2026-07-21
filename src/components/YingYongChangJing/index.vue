<template>
  <div class="scene-container">
    <div class="scene-title">
      <span>应用场景</span>
    </div>
    <div class="scene-wrap">
      <div class="scene-list">
        <div
          v-for="(item, i) in sceneList"
          :key="i"
          class="scene-item"
          :class="{ active: item.path === currentPath }"
          @click="handleSceneClick(item)"
        >
          <div class="scene-icon">
            <i :class="item.icon"></i>
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
        { name: '路面', path: '/road', icon: 'el-icon-s-marketing' },
        { name: '桥梁', path: '/bridge', icon: 'el-icon-s-platform' },
        { name: '边坡', path: '/slope', icon: 'el-icon-s-grid' },
        { name: '隧道', path: '/tunnel', icon: 'el-icon-s-finance' }
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
      if (item.path !== this.currentPath) {
        this.$router.push(item.path)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/scrollbar.scss';

.scene-container {
  width: 100%;
  height: 108px;
  background: linear-gradient(0deg, rgba(22, 62, 112, 0.3) 0%, rgba(22, 62, 112, 0.9) 0%, rgba(24, 56, 108, 0.9) 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(10px);
}

.scene-title {
  position: relative;
  width: 40px;
  min-width: 40px;
  height: 100%;
  background: linear-gradient(180deg, rgba(40, 87, 144, 0.9) 5%, rgba(40, 87, 144, 0.9) 96%);

  > span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: Microsoft YaHei;
    width: 18px;
    font-size: 18px;
    font-weight: normal;
    line-height: 20px;
    color: #ffffff;
  }
}

.scene-wrap {
  width: calc(100% - 40px);
  overflow-x: scroll;
  @include normal-scrollbar-x();
  padding: 0 20px;
}

.scene-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 108px;
}

.scene-item {
  flex: 0 0 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    .scene-icon {
      transform: scale(1.1);
    }
    .scene-name { color: #409EFF; }
  }

  &.active {
    .scene-name { color: #409EFF; font-weight: 600; }
  }
}

.scene-icon {
  height: 66px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
  transition: transform 0.3s;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  > i {
    font-size: 42px;
    color: #58b2ff;
  }
}

.scene-name {
  font-size: 14px;
  color: #ffffff;
  white-space: nowrap;
  transition: color 0.3s;
}
</style>
