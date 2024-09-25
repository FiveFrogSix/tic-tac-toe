<script lang="ts" setup>
const props = defineProps({
  winStack: {
    default: 0,
    type: Number,
  },
});

const eventWin = ref(false);

watch(
  () => props.winStack,
  (newVal) => {
    eventWin.value = true;
    setTimeout(() => {
      eventWin.value = false;
    }, 1600);
  }
);
</script>
<template>
  <div v-if="eventWin" class="fade-up fs-5 text-success">+{{ winStack }} Stack</div>
</template>
<style lang="scss" scoped>
.fade-up {
  top: 0%;
  right: -20px;
  position: absolute;
  animation: fadeup 1s alternate;
  animation-fill-mode: forwards;
}
@keyframes fadeup {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>
