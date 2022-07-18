const express = require('express');
const router = express.Router();

const {
  getSettings,
  createSettings,
  updateSettings,
  deleteSettings,
  deleteAllSettings,
} = require('../controllers/settingController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const uploadFile = require('../middlewares/uploadFile');

router
  .route('/')
  .get(getSettings)
  .post(
    isAuthenticatedUser,
    authorizeRoles('admin'),
    uploadFile.array('logo', 1),
    createSettings
  )
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteAllSettings);
router
  .route('/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateSettings)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteSettings);

module.exports = router;
