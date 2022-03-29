const express = require('express')
const router = express.Router()

const { getData,
    create,
    update,
    deleteAll,
    getSingleData,
    deleteData,

    //State
    getStateData,
    getStateSingleData,

    createState,
    updateState,
    deleteState,

   
    createCity,
    deleteCity,
    getCityData

} = require('../controllers/locationController')

router.route('/')
    .get(getData)
    .post(create)
    .delete(deleteAll)



router.route('/:id')
    .get(getSingleData)
    .put(update)
    .delete(deleteData)





//State

router.route('/:id/state')
    .get(getStateData)
router.route('/state/update/:lId/:sId')
    .put(updateState)
router.route('/state/delete/:lId/:sId')
    .delete(deleteState)
router.route('/state/:id')
    .post(createState)
router.route('/state/:sId')
    .get(getStateSingleData)




    //City

router.route('/city/:sId')
    .get(getCityData)

    router.route('/:lId/:sId/city')
    .put(createCity)

// router.route('/state/update/:lId/:sId')
//     .put(updateState)
router.route('/city/delete/:cId')
    .delete(deleteCity)
router.route('/city/:id')
    .put(createState)
// router.route('/:lId/:sId')
//     .get(getStateSingleData)











module.exports = router 