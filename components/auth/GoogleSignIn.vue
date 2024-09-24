<script setup lang="ts">
const box = ref();

onMounted(() => {
  initGoogleAuth();
});

const initGoogleAuth = async () => {
  google.accounts.id.initialize({
    client_id:
      "130124382359-n9qk0adj7q46rern65lkpj378g464ctf.apps.googleusercontent.com",
    callback: handleCredentialResponse,
    auto_select: false  
  });

  google.accounts.id.renderButton(box.value, {
    type: "standard",
    theme: "filled_blue",
    size: "large",
  });

};

const onSignout = () => {
  google.accounts.id.disableAutoSelect();
  localStorage.removeItem('google_token');
  window.location.reload()
};

const handleCredentialResponse = async (response: Object) => {
  console.log(response);
};
</script>
<template>
  <div>
    <div ref="box" class="d-flex justify-content-center"></div>
    <div>
      <button class="btn btn-info btn-sm" @click="onSignout">
        Sign-out
      </button>
    </div>
  </div>
</template>
