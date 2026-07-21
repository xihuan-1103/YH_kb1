<template>
  <div class="container">
    <div class="mapBackground">
      <slot name="back" />
    </div>
    <div class="header">
      <slot name="header" />
    </div>
    <div class="topLayout animeTop">
      <slot name="top" />
    </div>
    <div class="bottomLayout animeBottom">
      <slot name="bottom" />
    </div>
    <div class="switcherLayout animeSwitcher">
      <slot name="switcher" />
    </div>
    <div class="leftLayout">
      <div class="leftClose" @click="toggleShow(false)">&#x276E;</div>
      <div class="left">
        <div class="leftArea">
          <slot name="left" />
        </div>
      </div>
    </div>
    <div class="rightLayout">
      <div class="rightClose" @click="toggleShow(false)">&#x276F;</div>
      <div class="right">
        <div class="rightArea">
          <slot name="right" />
        </div>
      </div>
    </div>
    <div>
      <div v-show="!showOpenImage" class="leftOpen" @click="toggleShow(true)">&#x276F;</div>
      <div v-show="!showOpenImage" class="rightOpen" @click="toggleShow(true)">&#x276E;</div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs/lib/anime.js'

export default {
  name: 'Layout',
  data() {
    return {
      showOpenImage: true,
      animeTimeout: null
    }
  },
  destroyed() {
    clearTimeout(this.animeTimeout)
  },
  mounted() {
    this.toggleShow(true)
  },
  methods: {
    toggleShow(boolean) {
      this.toggleLeftOrRight(boolean, 'L')
      this.toggleLeftOrRight(boolean, 'R')
      this.toggleTopOrBottom(boolean, 'T')
      this.toggleTopOrBottom(boolean, 'B')
      if (!boolean) {
        clearTimeout(this.animeTimeout)
        this.animeTimeout = setTimeout(() => {
          this.showOpenImage = boolean
        }, 1000)
      } else {
        this.showOpenImage = boolean
      }
    },
    toggleTopOrBottom(state, direction) {
      const option = {
        targets: direction === 'T' ? '.animeTop' : '.animeBottom, .animeSwitcher',
        duration: 1000,
        easing: 'easeInOutExpo'
      }
      option.translateY = state ? 0 : (direction === 'T' ? -310 : 1080)
      anime(option)
    },
    toggleLeftOrRight(state, direction) {
      const option = {
        targets: direction === 'L' ? '.leftLayout' : '.rightLayout',
        duration: 1000,
        easing: 'easeInOutExpo'
      }
      option.translateX = state ? 0 : (direction === 'L' ? -525 : 525)
      anime(option)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/scrollbar.scss';

.container {
  height: 1080px;
  width: 1920px;
  overflow: hidden;
  color: #fff;
}

.mapBackground {
  position: absolute;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  margin: 0;
  padding: 0;
  z-index: 0;
}

.header {
  position: absolute;
  width: 1920px;
  height: 110px;
  top: 0;
  left: 0;
  z-index: 10;
}

.topLayout {
  position: absolute;
  top: 130px;
  left: 540px;
  width: 840px;
  z-index: 10;
}

.bottomLayout {
  position: absolute;
  left: 540px;
  width: 840px;
  bottom: 95px;
  height: 180px;
  background: linear-gradient(180deg, rgba(8, 32, 68, 0.01) 0%, rgba(8, 32, 68, 0.85) 30%);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 4px;
  z-index: 10;
}

.switcherLayout {
  position: absolute;
  left: 30px;
  right: 30px;
  bottom: 12px;
  width: auto;
  height: 68px;
  background: rgba(6, 18, 40, 0.72);
  border: 1.2px solid rgba(41, 94, 151, 0.6);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(64, 158, 255, 0.1);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(15px);
  pointer-events: auto;
}

.left,
.right {
  width: 490px;
  height: 100%;
  padding-right: 2px;
  background: rgba(6, 18, 40, 0.64);
  border: 1px solid rgba(41, 94, 151, 0.45);
  border-radius: 4px;
}

.leftLayout,
.rightLayout,
.middleLayout {
  position: absolute;
  z-index: 10;
}

.middleLayout {
  width: 840px;
  height: 250px;
  top: 125px;
  left: 540px;
}

.leftLayout,
.rightLayout {
  width: 520px;
  position: absolute;
  top: 110px;
  bottom: 95px;
}

.leftLayout {
  left: 0;
}

.rightLayout {
  right: 0;
}

.left {
  margin-left: 30px;
}

.leftArea,
.rightArea {
  width: 490px;
  overflow: auto;
  height: 100%;
  @include hidden-x-scrollbar();
  @include normal-scrollbar-y();
  backdrop-filter: blur(10px);
}

.leftClose,
.rightClose {
  position: absolute;
  margin-top: 424px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.5);
  font-size: 20px;
  z-index: 10;
  padding: 10px 4px;
  background: rgba(8, 32, 68, 0.6);
  border-radius: 4px;
  &:hover { color: #fff; }
}

.rightClose {
  right: 0;
}

.leftOpen,
.rightOpen {
  position: absolute;
  top: 424px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.5);
  font-size: 20px;
  padding: 10px 4px;
  background: rgba(8, 32, 68, 0.6);
  border-radius: 4px;
  z-index: 10;
  &:hover { color: #fff; }
}

.leftOpen {
  left: 0;
}

.rightOpen {
  right: 0;
}
</style>
