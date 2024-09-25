<script lang="ts" setup>
const props = defineProps({
  score: {
    default: 0,
    type: Number,
  },
});

const scoreInit = ref(false);
const scoreText = ref({
  operation: "",
  operationClass: "",
});
watch(
  () => props.score,
  (newVal, oldVal) => {
    scoreText.value.operation = "+";
    scoreText.value.operationClass = "text-success";
    if (newVal < oldVal) {
      scoreText.value.operation = "-";
      scoreText.value.operationClass = "text-danger";
    }
    scoreInit.value = true;
    setTimeout(() => {
      scoreInit.value = false;
    }, 1600);
  }
);
</script>
<template>
  <div v-if="scoreInit" class="fade-up fs-5" :class="scoreText.operationClass">
    {{ scoreText.operation }}1
  </div>
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
