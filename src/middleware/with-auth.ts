export default defineNuxtRouteMiddleware((to, from) => {
  const isAuth = false;

  if (!isAuth) {
    return navigateTo('/auth/login');
  }

  return navigateTo(to.fullPath);
});
