export default defineNuxtConfig({
  srcDir: './src',
  modules: ['@vueuse/nuxt', '@nuxtjs/tailwindcss'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    jwtAccessTtl: parseInt(process.env.JWT_ACCESS_TTL || '3600', 10),
    jwtRefreshTtl: parseInt(process.env.JWT_REFRESH_TTL || '2592000', 10),
    public: {
      isDev: process.env.NODE_ENV === 'development',
      isProd: process.env.NODE_ENV === 'production',
      port: parseInt(process.env.PORT || '3000', 10),
      apiUrl: process.env.API_URL || '/api',
    },
  },
  devtools: { enabled: true },
});
