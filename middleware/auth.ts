import { useAuthStore } from "~/stores/auth";
export default defineNuxtRouteMiddleware(async (to) => {
  const { $axios } = useNuxtApp();
  const auth = useAuthStore();

  const token = useCookie("token");
  if (token.value) {
    const { status, data } = await auth.authUserToken(token.value);
    if (status >= 300) {
      const token = useCookie("token");
      token.value = "";
    }
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
