export default function auth({ next, router, to }) {
  const loggedIn = localStorage.getItem('accessToken');
  const expireTime = localStorage.getItem('expireToken');
  if (!loggedIn || expireTime < Date.now() / 1000) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expireToken');
    return router.push(`/login?redirect=${to.path}`);
  }
  return next();
}
