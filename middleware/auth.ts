export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore();

  const token = useCookie("token");
  if (token.value) {
    await auth.authUserToken(token.value);
  }

  
  if (!token.value && to?.name === "play") {
    abortNavigation();
    return navigateTo("/");
  }

  if (token.value && to?.name === "index") {
    return navigateTo("/play");
  }
  if (!token.value && to?.name !== "index") {
    abortNavigation();
    return navigateTo("/");
  }
});
