<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});
</script>
<template>
  <NuxtLayout name="play">
    <GameTicTacToe />
  </NuxtLayout>
</template>
