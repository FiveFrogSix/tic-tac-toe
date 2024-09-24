<script lang="ts" setup>
definePageMeta({
  middleware: "auth", 
});
</script>
<template>
  <NuxtLayout>
    <div>
      <AuthGoogleSignIn />
    </div>
  </NuxtLayout>
</template>
