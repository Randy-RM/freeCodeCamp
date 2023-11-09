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
