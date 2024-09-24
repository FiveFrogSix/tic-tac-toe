import { defineStore } from "pinia";
import axios from "axios";
export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: {
      username: "",
      score: 0,
    },
  }),
  actions: {
    async authUser(payload: object) {
      const config = {
        url: "/api/auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
      };
      const { data } = await axios(config)
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
      const config = {
        url: `/api/auth/${token}`,
        method: "GET",
      };
      const { data } = await axios(config)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          const token = useCookie("token");
          token.value = "";
          if (err.response) {
            return err.response.data;
          }
          return err;
        });

      if (data && data.username) {
        this.user.username = data.username;
        this.user.score = data.score;
      }
    },
  },
});
