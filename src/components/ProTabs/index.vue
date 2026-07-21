<template>
  <div class="data-area" :class="[direction]">
    <div
      v-for="(item, index) in tabs"
      :key="index"
      :class="{
        tabs: true,
        clickTabs: item.key == position
      }"
      @click.prevent="toggleClick(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProTabs',
  props: {
    tabs: { type: Array, default: () => [] },
    position: { type: [String, Number], default: '' },
    direction: { type: String, default: '' }
  },
  methods: {
    toggleClick(item) {
      this.$emit('toggleClick', item.key)
    }
  }
}
</script>

<style lang="scss" scoped>
.data-area {
  display: flex;
  border: 1px solid #305392;
  border-radius: 2px;
  background: linear-gradient(0deg, #143267, #143267), #ffffff;
  text-align: center;
  justify-content: space-around;

  &.vertical {
    flex-direction: column;
  }
}

.tabs {
  line-height: 28px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #ffffff;
  flex: 1;
  cursor: pointer;
  transition: background 0.2s;
}

.clickTabs {
  background: #2a5ab1;
  border-radius: 1px;
}
</style>
