import debug from 'debug';
import { ifNoUserRedirectHome } from '../utils/middleware';
import {
  insertUserGroup,
  getAllUsersGroup,
  countUsersGroupDocuments
} from '../utils/user-group';

const log = debug('fcc:boot:user-group');

const sendNonUserToHome = ifNoUserRedirectHome();

function bootUserGroup(app) {
  const api = app.loopback.Router();

  api.get('/all-users-group', sendNonUserToHome, getUserGroupList);
  api.post('/user-group/create', sendNonUserToHome, createOneUserGroup);

  app.use(api);
}

async function createOneUserGroup(req, res) {
  const { userGroupName } = req.body;
  log(userGroupName);

  try {
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

export default bootUserGroup;
