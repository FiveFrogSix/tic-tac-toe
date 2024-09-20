// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Tic Tac Toe",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  css: ["@/assets/scss/bootstrap/bootstrap.custom.scss"],
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
});
