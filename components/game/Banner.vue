<script setup lang="ts">
const slots = useSlots();
const props = defineProps({
  player: {
    default: "",
    type: String,
  },
});
const classBanner = ref("");
if (props.player) {
  const slotNodes = slots.default ? slots.default() : [];
  const slotContent = slotNodes.map((node) => node.children).join("");
  if (slotContent.includes("Draw")) {
    classBanner.value = "text-warning";
  } else if (props.player === "X") {
    classBanner.value = "player-x";
  } else if (props.player === "O") {
    classBanner.value = "player-o";
  }
}
</script>
<template>
  <div class="winner-banner position-absolute" :class="classBanner">
    <slot></slot>
  </div>
</template>
<style scoped lang="scss">
.winner-banner {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(var(--bs-white-rgb), 1);
  border-radius: 10px;
  padding: 12px;
  text-align: center;
  width: 200px;
  animation: fade 2s alternate;
  font-weight: 600;
  font-size: 18px;
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
