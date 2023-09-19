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
  UserGroup = loopback.getModelByType('userGroup')
) {
  return new Promise((resolve, reject) => {
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
  UserGroup = loopback.getModelByType('userGroup')
) {
  return new Promise((resolve, reject) => {
    UserGroup.destroyById(userGroupId, (error, countUserGroupDeleted) => {
      if (error /* || isEmpty(count)*/) {
        return reject(error || 'Error in deleting Documents');
      }
      return resolve(countUserGroupDeleted);
    });
  });
}
export function putUserInGroup(
  ids,
  userGroup,
  User = loopback.getModelByType('User')
) {
  return new Promise((resolve, reject) => {
    ids.map(id => {
      User.updateAll({ id: id }, { userGroup }, function (err, instance) {
        if (err) return reject(err);
        return resolve(instance);
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
