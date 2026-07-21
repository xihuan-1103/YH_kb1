<template>
  <div class="subheader">
    <slot name="title">
      <div class="title">
        <h3>{{ name }}</h3>
      </div>
    </slot>
    <slot name="expand" />
    <div v-if="showExpirationDate" class="subtitle">
      {{ expirationDateTips }}
      <span class="expiration-date">{{ expirationDate }}</span>
    </div>
    <slot name="right" />
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'ScreenSubtitle',
  props: {
    name: { type: String, default: '' },
    showExpirationDate: { type: Boolean, default: false },
    expirationDateTips: { type: String, default: '数据截止' },
    expirationDate: {
      type: String,
      default: dayjs(Date.now()).format('YYYY年MM月DD日')
    }
  }
}
</script>

<style lang="scss" scoped>
.subheader {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 40px;
  background: linear-gradient(90deg, rgba(40, 87, 144, 0.76) 8.94%, rgba(66, 107, 165, 0.01) 94.28%);
}

.title {
  display: flex;
  color: #8dccf5;
  padding-left: 20px;
  font-size: 15px;
  > h3 {
    display: flex;
    margin: 0;
    color: #fff;
  }
}

.subtitle {
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  padding-right: 18px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  text-align: right;
}

.expiration-date {
  padding-left: 13px;
  color: rgba(255, 255, 255, 0.85);
}
</style>
