import permissions from '@/helpers/permissions';

export default function checkPermissions({ next, to, router }) {
  const requiredPermission = to.meta.permissions;

  let canEnter = false;

  requiredPermission.forEach((permission) => {
    if (permissions(permission)) {
      canEnter = true;
    }
  });

  if (canEnter) {
    return next();
  }

  return router.push({ name: 'Welcome' }).catch(() => {});
}
