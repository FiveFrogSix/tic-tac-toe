import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: {
      username: "",
      score: 0,
    },
  }),
  actions: {
    async authUser(payload: object) {
      const { $axios } = useNuxtApp();
      const config = {
        url: "/api/auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
      };
      const { data } = await $axios(config)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          if (err.response) {
            return err.response.data;
          }
          return err;
        });

      if (data.token) {
        const token = useCookie("token");
        token.value = data.token;
        this.user.username = data.username;
        this.user.score = data.score;
      }
    },
    async authUserToken(token: string) {
      const { $axios } = useNuxtApp();
      const config = {
        url: `/api/auth/${token}`,
        method: "GET",
      };
      const { status, data } = await $axios(config)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          if (err.response) {
            return err.response.data;
          }
          return err;
        });

      if (data && data.username) {
        this.user.username = data.username;
        this.user.score = data.score;
      }

      return { status, data };
    },
    async authUpdateScore() {
      const { $axios } = useNuxtApp();
      const config = {
        url: `/api/user/score`,
        method: "PUT",
        data: {
          username: this.user.username,
          score: this.user.score,
        },
      };
      const { status, data } = await $axios(config)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          if (err.response) {
            return err.response.data;
          }
          return err;
        });
      return { status, data };
    },
  },
});
