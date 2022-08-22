export default (permissions) => {
  const userPermissions = JSON.parse(localStorage.getItem('userInfo'));
  return userPermissions.roles.some((permission) => permission.value === permissions);
};
