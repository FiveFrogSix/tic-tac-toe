<script setup lang="ts">
declare var google: any;
const router = useRouter();
const auth = useAuthStore();
const box = ref();
const config = useRuntimeConfig();

onMounted(() => {
  initGoogleAuth();
});

const initGoogleAuth = async () => {
  google.accounts.id.initialize({
    client_id: config.public.googleClientID,
    callback: handleCredentialResponse,
    auto_select: false,
  });

  google.accounts.id.renderButton(box.value, {
    type: "standard",
    theme: "filled_blue",
    size: "large",
  });
};

const onSignout = () => {
  google.accounts.id.disableAutoSelect();
  localStorage.removeItem("google_token");
  window.location.reload();
};

const handleCredentialResponse = async (response: Object) => {
  await auth.authUser(response);
  await router.push("/play");
};
</script>
<template>
  <div>
    <div ref="box" class="d-flex justify-content-center"></div>
  </div>
</template>
