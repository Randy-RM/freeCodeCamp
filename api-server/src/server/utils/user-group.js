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

export function getAllUserGroup(
  page,
  limit,
  filter,
  UserGroup = loopback.getModelByType('userGroup')
) {
  return new Promise((resolve, reject) => {
    if (filter) {
      UserGroup.find(
        {
          where: filter,
          skip: (page - 1) * limit,
          limit: limit * 1
        },
        (err, instance) => {
          if (err || isEmpty(instance)) {
            return reject(err || 'No users group found');
          }
          return resolve(instance);
        }
      );
    } else {
      UserGroup.find(
        { skip: (page - 1) * limit, limit: limit * 1 },
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

export function countUserGroupDocuments(
  filter,
  UserGroup = loopback.getModelByType('userGroup')
) {
  return new Promise((resolve, reject) => {
    if (filter) {
      UserGroup.find({ where: filter }, (err, count) => {
        if (err || isEmpty(count)) {
          return reject(err || 'can not count user group collection');
        }
        return resolve(count);
      });
    } else {
      UserGroup.find((err, count) => {
        if (err || isEmpty(count)) {
          return reject(err || 'can not count user group collection');
        }
        return resolve(count);
      });
    }
  });
}
