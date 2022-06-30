const Category = require("../model/Category");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

// @Get Categories   GET /api/categories
const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
  });
});

// @Post Categories   POST /api/categories
const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create({
    ...req.body,
    icon: req.files.map((file) => file.path),
  });
  console.log("Category created", category, req.files);
  res.status(201).json({
    success: true,
    data: category,
  });
});

// @Update Categories   PUT /api/categories/:id
const updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    isUpdated: true,
  });
});

// @Delete Categories   DELETE /api/categories/:id
const deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    isDeleted: true,
  });
});

// @Dlete All Categories   DELETE /api/categories
const deleteAllCategories = asyncHandler(async (req, res, next) => {
  await Category.deleteMany();

  res.status(200).json({
    success: true,
    isDeleted: true,
  });
});

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
};
