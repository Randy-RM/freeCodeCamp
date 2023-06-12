import { isEmpty } from 'lodash';
import loopback from 'loopback';

export function insertUserGroup(
  userGroup,
  UserGroup = loopback.getModelByType('UserGroup')
) {
  console.log('******* Sucèss : Group inserted *******');
  return new Promise((resolve, reject) => {
    UserGroup.insert(userGroup, (err, instance) => {
      if (err || isEmpty(instance)) {
        console.log('******* Error : Group is not inserted *******');
        return reject(err || 'Error on insert user group');
      }
      console.log('******* Sucèss : Group inserted *******');
      return resolve(instance);
    });
  });
}
