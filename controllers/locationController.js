const asyncHandler = require('../middlewares/async');
const Location = require('../model/Location');
const ErrorResponse = require('../utils/errorResponse');

// @Get Locations   GET /api/locations
const getLocations = asyncHandler(async (req, res, next) => {
  const locations = await Location.find();

  res.status(200).json({
    success: true,
    count: locations.length,
    data: locations,
  });
});

// @Post Locations   POST /api/location
const createLocation = asyncHandler(async (req, res) => {
  const location = await Location.create(req.body);

  res.status(201).json({
    success: true,
    data: location,
  });
});

// @Update Locations   PUT /api/location/:id
const updateLocation = asyncHandler(async (req, res, next) => {
  const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!location) {
    return next(new ErrorResponse(`Location not found`, 404));
  }

  res.status(200).json({
    success: true,
    isUpdated: true,
    data: location,
  });
});

// @Delete Location   DELETE /api/location/:id
const deleteLocation = asyncHandler(async (req, res, next) => {
  const location = await Location.findByIdAndDelete(req.params.id);

  if (!location) {
    return next(new ErrorResponse(`Location not found`, 404));
  }

  res.status(200).json({
    success: true,
    isDeleted: true,
  });
});

// @Dlete All Locations   DELETE /api/location
const deleteAllLocation = asyncHandler(async (req, res, next) => {
  await Location.deleteMany();

  res.status(200).json({
    success: true,
    isDeleted: true,
  });
});

module.exports = {
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation,
  deleteAllLocation,
};
