// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
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
});
