// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      googleClientID:
        process.env.GOOGLE_CLIENT_ID ||
        "130124382359-n9qk0adj7q46rern65lkpj378g464ctf.apps.googleusercontent.com",
    },
  },
  app: {
    head: {
      title: "Tic Tac Toe",
      htmlAttrs: {
        lang: "en",
        "data-bs-theme": "dark",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      script: [
        {
          src: "https://accounts.google.com/gsi/client",
          async: true,
          defer: true,
        },
      ],
    },
  },

  compatibilityDate: "2024-04-03",

  css: [
    "@/assets/scss/bootstrap/bootstrap.custom.scss",
    "@/assets/scss/ttt.scss",
  ],

  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
});
