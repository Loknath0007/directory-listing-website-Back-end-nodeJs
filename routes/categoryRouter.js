const express = require('express')
const router = express.Router()

const { getData, create, update, getSingleData, deleteData,
    getSubData,
    getSubSingleData,
    deleteAll,
    createSubCat,
    updateSubCat,
    deleteSubCat

} = require('../controllers/cetegoryController')

router.route('/')
    .get(getData)
    .post(create)




router.route('/:id')
    .get(getSingleData)
    .put(update)
    .delete(deleteData)







router.route('/:id/subCategory')
    .get(getSubData)
router.route('/update/:cId/:sId')
    .put(updateSubCat)
router.route('/delete/:cId/:sId')
    .put(deleteSubCat)


    //sub category 
router.route('/subCategory/:id')
    // .get(getSubSingleData)
    .put(createSubCat)
router.route('/:cId/:sId')
    .get(getSubSingleData)
    



router.delete('/', deleteAll)

module.exports = router 