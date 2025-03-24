const userRoles = {
  default: {
    allowedEndpoints: ['/github','/youtube','google'],
    canCreateRoutes: false,
    canDeleteRoutes: false,
  },
  admin: {
    allowedEndoints: [],
    canCreateRoutes: true,
    canDeleteRoutes:true,
  }
}

export default userRoles;