import { isEmpty } from 'lodash';
import loopback from 'loopback';

export async function insertUserGroup(
  userGroup,
  UserGroup = loopback.getModelByType('userGroup')
) {
  try {
    const userGroupExist = await UserGroup.find({ where: userGroup });
    if (userGroupExist && userGroupExist.length > 0) {
      throw new Error('A group already exists with this name');
    }
    const newUserGroup = await UserGroup.create(userGroup);
    return {
      userGroup: newUserGroup,
      error: null
    };
  } catch (error) {
    return {
      userGroup: null,
      error: error.message
    };
  }
}

export function updateUserGroup(
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
                      function (err, instance) {
                        if (err) return reject(err);
                        return resolve(instance);
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

export function getAllUsersGroup(
  page,
  limit,
  filter,
  UsersGroup = loopback.getModelByType('userGroup')
) {
  return new Promise((resolve, reject) => {
    if (filter) {
      UsersGroup.find(
        {
          where: filter,
          skip: (page - 1) * limit,
          limit: limit * 1,
          order: 'id DESC'
        },
        (err, instance) => {
          if (err || isEmpty(instance)) {
            return reject(err || 'No users group found');
          }
          resolve(console.log(instance));
        }
      );
    } else {
      UsersGroup.find(
        { skip: (page - 1) * limit, limit: limit * 1, order: 'id DESC' },
        (err, instance) => {
          if (err || isEmpty(instance)) {
            return reject(err || 'No users group found');
          }
          return resolve(instance);
        }
      );
    }
  });
}

export function countUsersGroupDocuments(
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

export function deleteUserGroup(
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
                function (err, instance) {
                  if (err) return reject(err);
                  return resolve(instance);
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
export function putUserInGroup(
  ids,
  userGroup,
  User = loopback.getModelByType('User'),
  UserGroup = loopback.getModelByType('userGroup')
) {
  return new Promise((resolve, reject) => {
    ids.map(id => {
      User.updateAll({ id: id }, { userGroup }, function (err, userUpdated) {
        if (err) return reject(err);
        return User.find(
          { where: { userGroup: userGroup } },
          function (err, countUser) {
            if (err) return reject(err);

            if (countUser) {
              UserGroup.updateAll(
                { userGroupName: userGroup },
                { memberCount: countUser.length },
                function (err, instance) {
                  if (err) return reject(err || 'count member group');
                  if (instance) {
                    resolve(userUpdated);
                  }
                }
              );
            }
          }
        );
      });
    });
  });
}

export function deleteUserInGroup(ids, User = loopback.getModelByType('User')) {
  return new Promise((resolve, reject) => {
    ids.map(id => {
      User.updateAll({ id: id }, { userGroup: '' }, function (err, instance) {
        if (err) return reject(err);
        return resolve(instance);
      });
    });
  });
}

export function getUserByGroup(filter, User = loopback.getModelByType('User')) {
  return new Promise((resolve, reject) =>
    User.find({ where: { userGroup: filter } }, (err, instance) => {
      if (err || isEmpty(instance)) {
        return reject(err || 'can not find user in this group');
      }
      return resolve(instance);
    })
  );
}
