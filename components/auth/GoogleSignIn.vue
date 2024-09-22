<script setup lang="ts">
const box = ref();

onMounted(() => {
  GoogleLogin();
});
const GoogleLogin = async () => {
  // js google login
  google.accounts.id.initialize({
    client_id:
      "130124382359-n9qk0adj7q46rern65lkpj378g464ctf.apps.googleusercontent.com",
    callback: handleCredentialResponse,
  });
  google.accounts.id.renderButton(box.value, {
    type: "standard",
    theme: "filled_blue",
    size: "large"
  });
};

const handleCredentialResponse = async (response) => {
  console.log(response);
};
</script>
<template>
  <div>
    <div ref="box" class="d-flex justify-content-center"></div>
  </div>
</template>
