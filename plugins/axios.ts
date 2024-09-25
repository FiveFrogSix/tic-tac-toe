import axios from "axios";
export default defineNuxtPlugin(() => {
  const instance = axios.create();
  return {
    provide: {
      axios: instance,
    },
  };
});
