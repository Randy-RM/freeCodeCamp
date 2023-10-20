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
        (err, users) => {
          if (err || isEmpty(users)) {
            return reject(err || 'Noinstance group found');
          }
          resolve(console.log(users));
        }
      );
    } else {
      UsersGroup.find(
        { skip: (page - 1) * limit, limit: limit * 1, order: 'id DESC' },
        (err, users) => {
          if (err || isEmpty(users)) {
            return reject(err || 'Noinstance group found');
          }
          return resolve(users);
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
export function putUserInGroup(
  ids,
  userGroup,
  User = loopback.getModelByType('User'),
  UserGroup = loopback.getModelByType('userGroup')
) {
  return new Promise((resolve, reject) => {
    console.log('les ids', ids);
    User.find({ where: { id: { inq: ids } } }, function (err, users) {
      console.log('err', err);
      console.log('update', users);
      console.log(typeof users.email);
      if (users.length !== 0) {
        users.map(user => {
          console.log(user.userGroup);

          if (typeof user.userGroup === 'string') {
            User.updateAll(
              { id: user.id },
              { $set: { userGroup: [userGroup] } },
              function (err, userUpdated) {
                console.log('user string', userUpdated);
                if (err) return reject(console.log('err', err));
                return User.find(
                  { where: { userGroup: userGroup } },
                  function (err, countUser) {
                    if (err) return reject(err);

                    if (countUser) {
                      UserGroup.updateAll(
                        { userGroupName: userGroup },
                        { memberCount: countUser.length },
                        function (err, users) {
                          if (err) return reject(err || 'count member group');
                          if (users) {
                            resolve(userUpdated);
                          }
                        }
                      );
                    }
                  }
                );
              }
            );
          }
        });
      }
    });

    // User.find({ where: { id: { inq: ids } } }, function (err, users) {
    //   if (err) return reject(console.log('err', err));
    //   console.log('eeror', err);
    //   console.log('insinstance', users.userGroup);
    //   if (users) {
    //     if (typeof users.userGroup === 'string') {
    //       User.updateAll(
    //         { id: { inq: ids } },
    //         { $set: { userGroup: [userGroup] } },
    //         function (err, userUpdated) {
    //           console.log('user string', userUpdated);
    //           if (err) return reject(console.log('err', err));
    //           return User.find(
    //             { where: { userGroup: userGroup } },
    //             function (err, countUser) {
    //               if (err) return reject(err);

    //               if (countUser) {
    //                 UserGroup.updateAll(
    //                   { userGroupName: userGroup },
    //                   { memberCount: countUser.length },
    //                   function (err, users) {
    //                     if (err) return reject(err || 'count member group');
    //                     if (users) {
    //                       resolve(userUpdated);
    //                     }
    //                   }
    //                 );
    //               }
    //             }
    //           );
    //         }
    //       );
    //     } else if (Array.isArray(users.userGroup)) {
    //       User.updateAll(
    //         { id: { inq: ids } },
    //         { $push: { userGroup: userGroup } },
    //         function (err, userUpdated) {
    //           console.log('user tab ', userUpdated);
    //           if (err) return reject(console.log('err', err));
    //           return User.find(
    //             { where: { userGroup: userGroup } },
    //             function (err, countUser) {
    //               if (err) return reject(err);

    //               if (countUser) {
    //                 UserGroup.updateAll(
    //                   { userGroupName: userGroup },
    //                   { memberCount: countUser.length },
    //                   function (err, users) {
    //                     if (err) return reject(err || 'count member group');
    //                     if (users) {
    //                       resolve(userUpdated);
    //                     }
    //                   }
    //                 );
    //               }
    //             }
    //           );
    //         }
    //       );
    //     }
    //   }
    // });
  });
}

export function deleteUserInGroup(
  ids,
  userGroup,
  User = loopback.getModelByType('User'),
  UserGroup = loopback.getModelByType('userGroup')
) {
  return new Promise((resolve, reject) => {
    console.log('req', ids, userGroup);

    User.updateAll(
      { id: { inq: ids } },
      { userGroup: '' },
      function (err, userUpdated) {
        if (err) return reject(err);
        return User.find(
          { where: { userGroup: userGroup } },
          function (err, countUser) {
            if (err) return reject(err);

            if (countUser) {
              UserGroup.updateAll(
                { userGroupName: userGroup },
                { memberCount: countUser.length },
                function (err, users) {
                  if (err) return reject(err || 'count member group');
                  if (users) {
                    resolve(userUpdated);
                  }
                }
              );
            }
          }
        );
      }
    );
  });
}

export function getUserByGroup(filter, User = loopback.getModelByType('User')) {
  return new Promise((resolve, reject) =>
    User.find({ where: { userGroup: filter } }, (err, users) => {
      if (err || isEmpty(users)) {
        return reject(err || 'can not find user in this group');
      }
      return resolve(users);
    })
  );
}
