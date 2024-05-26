export enum Roles {
  ADMIN = "admin",
  EDITOR = "editor",
  PUBLISHER = "publisher"
}

export enum Permissions {
  CREATE_PROPERTY = 'create_property',
  DELETE_PROPERTY = 'delete_property',
  ADD_USER = 'add_user',
}

export const permissionMap = {
  [Roles.ADMIN]: ["*"],
  [Roles.EDITOR]: [Permissions.DELETE_PROPERTY],
  [Roles.PUBLISHER]: [],
}