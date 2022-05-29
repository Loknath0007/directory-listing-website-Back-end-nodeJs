const express = require("express");
const router = express.Router();

const {
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation,
  deleteAllLocation,
} = require("../controllers/locationController");

router
  .route("/")
  .get(getLocations)
  .post(createLocation)
  .delete(deleteAllLocation);
router.route("/:id").put(updateLocation).delete(deleteLocation);

module.exports = router;
