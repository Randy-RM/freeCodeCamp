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
          return resolve(instance);
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
