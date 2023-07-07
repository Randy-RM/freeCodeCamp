import debug from 'debug';
import { ifNoUserRedirectHome } from '../utils/middleware';
import {
  insertUserGroup,
  updateUserGroup,
  getAllUsersGroup,
  countUsersGroupDocuments,
  deleteUserGroup
} from '../utils/user-group';

const log = debug('fcc:boot:user-group');

const sendNonUserToHome = ifNoUserRedirectHome();

function bootUserGroup(app) {
  const api = app.loopback.Router();

  api.post('/user-group/create', sendNonUserToHome, createOneUserGroup);
  api.put('/user-group/update', sendNonUserToHome, updateOneUserGroup);
  api.get('/all-users-group', sendNonUserToHome, getUserGroupList);
  api.delete('/user-group/delete', sendNonUserToHome, removeUserGroup);

  app.use(api);
}

async function createOneUserGroup(req, res) {
  const { userGroupName } = req.body;
  log(userGroupName);

  try {
    if (userGroupName.length == 0) {
      throw new Error('This field should not be empty.');
    }
    let newUserGroup = null;
    newUserGroup = await insertUserGroup({ userGroupName: userGroupName });
    if (!newUserGroup.userGroup) {
      throw new Error(newUserGroup.error);
    }

    return res.json(newUserGroup);
  } catch (error) {
    return res.json({
      newUserGroup: null,
      error: error.message
    });
  }
}

async function updateOneUserGroup(req, res) {
  // object req.body is { id: string, userGroupName: string }
  const { id } = req.body;
  log(req.body);
  try {
    if (!id || id.length == 0) {
      throw new Error('Please select a group');
    }
    const userGroupUpdated = await updateUserGroup(req.body);
    if (userGroupUpdated) {
      return res.json({
        isUpdated: true,
        error: null
      });
    }
    throw new Error('Error in updating Group');
  } catch (error) {
    return res.json({
      isUpdated: false,
      error: error.message
    });
  }
}

async function getUserGroupList(req, res) {
  // destructure page and limit and set default values
  const { page = 1, limit = 2, classRoom = null } = req.query;
  try {
    let userGroupList = [];
    let usersGroupCount = [];
    const filter = {};
    if (classRoom) {
      filter.userGroupName = new RegExp(`${classRoom}`, 'i');
      userGroupList = await getAllUsersGroup(page, limit, filter);
      usersGroupCount = await countUsersGroupDocuments(filter);
    } else {
      userGroupList = await getAllUsersGroup(page, limit);
      usersGroupCount = await countUsersGroupDocuments();
    }

    return res.json({
      userGroupList: userGroupList,
      totalPages: Math.ceil(usersGroupCount.length / limit),
      currentPage: page,
      countUsersGroup: usersGroupCount.length
    });
  } catch (error) {
    return res.json({
      error: error
    });
  }
}

async function removeUserGroup(req, res) {
  const { id } = req.body;
  log(req.body);
  try {
    if (!id || id.length == 0) {
      throw new Error('Please select a group');
    }
    const userGroupDeleted = await deleteUserGroup(id);
    if (
      userGroupDeleted &&
      // eslint-disable-next-line no-prototype-builtins
      userGroupDeleted.hasOwnProperty('count') &&
      userGroupDeleted.count == 1
    ) {
      return res.json({
        isDeleted: true,
        message: null
      });
    }
    throw new Error('Error in deleting Group');
  } catch (error) {
    return res.json({
      isDeleted: false,
      message: error.message
    });
  }
}

export default bootUserGroup;
