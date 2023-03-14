export default function guest({ next, router }) {
  const loggedIn = localStorage.getItem('accessToken');
  const expireTime = localStorage.getItem('expireToken');
  if (loggedIn) {
    if (expireTime < Date.now() / 1000) {
      localStorage.clear();
      return router.push({ name: 'Welcome' });
    }
    return next();
  }

  return next();
}
