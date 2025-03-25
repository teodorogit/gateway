const userRoles = {
  default: {
    allowedEndpoints: ['/github','/youtube','google'],
    canCreateRoutes: false,
    canDeleteRoutes: false,
    isAdmin: false,
  },
  admin: {
    allowedEndoints: [],
    canCreateRoutes: true,
    canDeleteRoutes:true,
    isAdmin: true,
  }
}

export default userRoles;