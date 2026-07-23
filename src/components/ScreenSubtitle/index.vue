<template>
  <div class="subheader">
    <div class="header-accent-tag"></div>
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
  height: 38px;
  background: linear-gradient(90deg, rgba(16, 52, 98, 0.85) 0%, rgba(12, 34, 68, 0.45) 80%, rgba(8, 22, 45, 0.1) 100%);
  border-left: 4px solid #00f3ff;
  border-bottom: 1px solid rgba(0, 243, 255, 0.3);
  box-shadow: inset 0 0 10px rgba(0, 243, 255, 0.12);
  padding-left: 10px;
  margin-bottom: 8px;
  position: relative;
  border-radius: 2px 6px 6px 2px;
}

.header-accent-tag {
  width: 5px;
  height: 14px;
  background: #00f3ff;
  border-radius: 2px;
  box-shadow: 0 0 8px #00f3ff;
  margin-right: 8px;
  flex-shrink: 0;
}

.title {
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 0.8px;

  > h3 {
    display: flex;
    margin: 0;
    color: #ffffff;
    font-size: 15px;
    font-weight: 700;
    text-shadow: 0 0 8px rgba(0, 243, 255, 0.6);
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
  color: rgba(0, 243, 255, 0.85);
}
</style>
