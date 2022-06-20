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
  .post(isAuthenticatedUser, authorizeRoles("admin"), createLocation)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteAllLocation);
router
  .route("/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateLocation)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteLocation);

module.exports = router;
