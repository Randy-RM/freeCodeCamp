import { isEmpty } from 'lodash';
import loopback from 'loopback';

export async function insertUserRole(
  userRole,
  UserRole = loopback.getModelByType('userRole')
) {
  try {
    const userRoleExist = await UserRole.find({ where: userRole });
    if (userRoleExist && userRoleExist.length > 0) {
      throw new Error('A Role already exists with this name');
    }
    const newUserRole = await UserRole.create(userRole);
    return {
      userRole: newUserRole,
      error: null
    };
  } catch (error) {
    return {
      userRole: null,
      error: error.message
    };
  }
}

export function updateUserRole(
  userGroup,
  UserGroup = loopback.getModelByType('userGroup'),
  User = loopback.getModelByType('User')
) {
  return new Promise((resolve, reject) => {
    console.log(userGroup, 'les goup avant');
    return UserGroup.find(
      { where: { userGroupName: userGroup.userGroupName } },
      (error, userGroupFound) => {
        if (userGroupFound.length != 0) {
          return reject(
            new Error('Failed to update, a group already exists with this name')
          );
        }
        return UserGroup.upsertWithWhere(
          {
            id: userGroup.id
          },
          userGroup,
          (error, countUserGroupUpdated) => {
            if (error) {
              return reject(error || 'Error in Updated Document');
            }
            if (countUserGroupUpdated) {
              UserGroup.find(
                { where: { id: userGroup.id } },
                function (err, userGroupFound) {
                  if (err) return reject(err);
                  if (userGroupFound) {
                    User.updateAll(
                      { userGroup: userGroupFound.userGroupName },
                      { userGroup: userGroup.userGroupName },
                      function (err, users) {
                        if (err) return reject(err);
                        return resolve(users);
                      }
                    );
                  }
                }
              );
            }
            return resolve(countUserGroupUpdated);
          }
        );
      }
    );
  });
}

export function countUsersRoleDocuments(
  filter,
  UsersGroup = loopback.getModelByType('userGroup')
) {
  return new Promise((resolve, reject) => {
    if (filter) {
      UsersGroup.find({ where: filter }, (err, count) => {
        if (err || isEmpty(count)) {
          return reject(err || 'can not count user group collection');
        }
        return resolve(count);
      });
    } else {
      UsersGroup.find((err, count) => {
        if (err || isEmpty(count)) {
          return reject(err || 'can not count user group collection');
        }
        return resolve(count);
      });
    }
  });
}

export function deleteUserRole(
  userGroupId,
  UserGroup = loopback.getModelByType('userGroup'),
  User = loopback.getModelByType('User')
) {
  return new Promise((resolve, reject) => {
    UserGroup.destroyById(userGroupId, (error, countUserGroupDeleted) => {
      if (error /* || isEmpty(count)*/) {
        return reject(error || 'Error in deleting Documents');
      }
      if (countUserGroupDeleted) {
        UserGroup.find(
          { where: { id: userGroupId } },
          function (err, userGroupFound) {
            if (err) return reject(err);
            if (userGroupFound) {
              User.updateAll(
                { userGroup: userGroupFound.userGroupName },
                { userGroup: '' },
                function (err, users) {
                  if (err) return reject(err);
                  return resolve(users);
                }
              );
            }
          }
        );
      }
      return resolve(countUserGroupDeleted);
    });
  });
}

async function putUserInRoleFunction(ids, userGroup, UserGroup, User) {
  const users = await User.find({ where: { id: { inq: ids } } });

  if (users.length === 0) {
    return Promise.reject('No users found');
  }

  const usersNotInGroup = users.filter(
    user => !user.groups.includes(userGroup)
  );

  await Promise.all(
    usersNotInGroup.map(async user => {
      await User.updateAll({ id: user.id }, { $push: { groups: userGroup } });
    })
  );

  const countUser = await User.find({ where: { groups: userGroup } });
  console.log('user', countUser);

  await UserGroup.updateAll(
    { userGroupName: userGroup },
    { memberCount: countUser.length }
  );

  return users;
}

export async function putUserInRole(
  ids,
  userGroup,
  User = loopback.getModelByType('User'),
  UserGroup = loopback.getModelByType('userGroup')
) {
  try {
    const usersAddedToGroup = await putUserInRoleFunction(
      ids,
      userGroup,
      UserGroup,
      User
    );
    if (usersAddedToGroup) return usersAddedToGroup;
  } catch (err) {
    console.log('erro', err);
  }
}

async function removeUserFromRoleFunc(userGroup, ids, User, UserGroup) {
  const users = await User.find({ where: { id: { inq: ids } } });

  if (users.length === 0) {
    return Promise.reject('No users found');
  }

  const usersInGroup = users.filter(user => user.groups.includes(userGroup));

  await Promise.all(
    usersInGroup.map(async user => {
      await User.updateAll({ id: user.id }, { $pull: { groups: userGroup } });
    })
  );

  const countUser = await User.find({ where: { groups: userGroup } });
  console.log('user', countUser);

  await UserGroup.updateAll(
    { userGroupName: userGroup },
    { memberCount: countUser.length }
  );

  return users;
}

export async function deleteUserInRole(
  ids,
  userGroup,
  User = loopback.getModelByType('User'),
  UserGroup = loopback.getModelByType('userGroup')
) {
  try {
    const removeUserINGroup = await removeUserFromRoleFunc(
      userGroup,
      ids,
      User,
      UserGroup
    );
    if (removeUserINGroup) return removeUserINGroup;
  } catch (err) {
    return err;
  }
}

export function getAllUsersRole(
  page,
  limit,
  filter,
  UsersRole = loopback.getModelByType('userRole')
) {
  return new Promise((resolve, reject) => {
    if (filter) {
      UsersRole.find(
        {
          where: filter,
          skip: (page - 1) * limit,
          limit: limit * 1,
          order: 'id DESC'
        },
        (err, userRoles) => {
          if (err || isEmpty(userRoles)) {
            return reject(err || 'Noinstance group found');
          }
          resolve(userRoles);
        }
      );
    } else {
      UsersRole.find(
        { skip: (page - 1) * limit, limit: limit * 1, order: 'id DESC' },
        (err, userRoles) => {
          if (err || isEmpty(userRoles)) {
            return reject(err || 'Noinstance group found');
          }
          return resolve(userRoles);
        }
      );
    }
  });
}

export function countUsersGroupDocuments(
  filter,
  UsersRole = loopback.getModelByType('userRole')
) {
  return new Promise((resolve, reject) => {
    if (filter) {
      UsersRole.find({ where: filter }, (err, count) => {
        if (err || isEmpty(count)) {
          return reject(err || 'can not count user group collection');
        }
        return resolve(count);
      });
    } else {
      UsersRole.find((err, count) => {
        if (err || isEmpty(count)) {
          return reject(err || 'can not count user group collection');
        }
        return resolve(count);
      });
    }
  });
}
