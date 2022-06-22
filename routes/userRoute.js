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

const checkLogin = require('../middlewares/checkLogin');

router.route('/').get(checkLogin, getData).post(create);

router.route('/:id').get(getSingleData).put(update).delete(deleteData);

module.exports = router;
