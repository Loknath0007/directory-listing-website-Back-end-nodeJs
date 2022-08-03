const express = require('express');
const router = express.Router();

const {
  getData,
  create,
  update,
  getSingleData,
  deleteData,
  userLogin,
} = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const checkLogin = require('../middlewares/checkLogin');
const uploadFile = require('../middlewares/uploadFile');

router.route('/').get(checkLogin, getData).post(create);

router.route('/:id').get(getSingleData).put(uploadFile.array("images", 1), update).delete(deleteData);

module.exports = router;
