const express = require("express");
const router = express.Router();

const {
  
  create,
  update,
  getSingleData,
  deleteData,
  getSubData,
  getSubSingleData,
  deleteAll,
  createSubCat,
  updateSubCat,
  deleteSubCat,
  getCategories,
} = require('../controllers/cetegoryController');

router.route('/').get(getCategories).post(create);

router.route('/:id').get(getSingleData).put(update).delete(deleteData);

router.route('/:id/subCategory').get(getSubData);
router.route('/update/:cId/:sId').put(updateSubCat);
router.route('/delete/:cId/:sId').put(deleteSubCat);

//sub category
router
  .route('/subCategory/:id')
  // .get(getSubSingleData)
  .put(createSubCat);
router.route('/:cId/:sId').get(getSubSingleData);

router.delete('/', deleteAll);

module.exports = router;
