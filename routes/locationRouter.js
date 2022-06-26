const express = require("express");
const router = express.Router();

const {
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation,
  deleteAllLocation,
} = require("../controllers/locationController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router
  .route("/")
  .get(getLocations)
  .post(isAuthenticatedUser, createLocation)
  .delete(isAuthenticatedUser, deleteAllLocation);
router
  .route("/:id")
  .put(isAuthenticatedUser, updateLocation)
  .delete(isAuthenticatedUser, deleteLocation);

module.exports = router;
