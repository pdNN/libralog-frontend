export const validateModulePermission = (
  module: string,
  userPermissions: string[],
): boolean => {
  const userAllowedModules = userPermissions.map(
    (permissao) => permissao.split("_")[0],
  );

  if (
    userAllowedModules.includes(module) ||
    userPermissions.includes("super")
  ) {
    return true;
  }
  return false;
};
