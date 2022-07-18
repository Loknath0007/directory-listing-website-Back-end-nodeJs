const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');
const Setting = require('../model/Setting');
const checkLogin = require('../middlewares/checkLogin');

// @Get Settings   GET /api/categories
const getSettings = asyncHandler(async (req, res, next) => {
  const settings = await Setting.findOne();
  console.log('settings', settings);

  res.status(200).json({
    success: true,
    count: settings.length,
    data: settings,
  });
});

// @Post Settings   POST /api/setting
const createSettings = asyncHandler(async (req, res) => {
  const settings = await Setting.create({
    ...req.body,
    logo: req.files.map((file) => file.path),
  });
  console.log('Settings created', settings, req.files);
  res.status(201).json({
    success: true,
    data: settings,
  });
});

// @Update Settings   PUT /api/categories/:id
const updateSettings = asyncHandler(async (req, res, next) => {
  const settings = await Setting.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!settings) {
    return next(
      new ErrorResponse(`Setting not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    isUpdated: true,
  });
});

// @Delete Categories   DELETE /api/categories/:id
const deleteSettings = asyncHandler(async (req, res, next) => {
  const settings = await Setting.findByIdAndDelete(req.params.id);

  if (!settings) {
    return next(
      new ErrorResponse(`Setting not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    isDeleted: true,
  });
});

// @Dlete All Categories   DELETE /api/categories
const deleteAllSettings = asyncHandler(async (req, res, next) => {
  await Setting.deleteMany();

  res.status(200).json({
    success: true,
    isDeleted: true,
  });
});

module.exports = {
  getSettings,
  createSettings,
  updateSettings,
  deleteSettings,
  deleteAllSettings,
};
