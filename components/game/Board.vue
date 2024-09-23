<script setup lang="ts">
defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <div class="board" :class="disabled ? `disabled` : ``">
    <slot></slot>
  </div>
</template>
<style scoped lang="scss">
.disabled {
  pointer-events: none;
}
</style>
