const userRoles = {
  default: {
    allowedEndpoints: ['/github','/youtube','google'],
    canCreateRoutes: false,
    canDeleteRoutes: false,
    canUpdateRoutes:false,

    isAdmin: false,
  },
  
  admin: {
    allowedEndoints: [],
    canCreateRoutes: true,
    canDeleteRoutes:true,
    canUpdateRoutes:true,
    isAdmin: true,
  }
}

export default userRoles;