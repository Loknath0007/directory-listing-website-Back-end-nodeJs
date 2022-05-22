const express = require("express");
const Category = require("../model/Category");
// const Subcategory = require('../model/Subcategory');
const ObjectId = require("mongodb").ObjectId;

const getData = async (req, res) => {
  const cursor = await Category.find();
  if (!cursor) return res.status(201).json({ message: "No post yet" });
  res.status(201).json(cursor);
};

const create = async (req, res) => {
  // if(!req?.body) return res.status(400).json({'message':'Noting to save '})

  // const newPost=new Post(req.body)
  // await newPost.save((err)=>{
  //     if(!err) {
  //      res.status(201).json(newPost)
  //     }
  //     else{
  //         res.status(400).json({
  //             'message':"error"
  //         })
  //     }
  // })
  try {
    const result = await Category.create(req.body);
    res.status(201).json(result);

    // // const result = await Category.create(req.body)
    // // const subCategory=
    // const {name ,description, SubCategory} =req.body

    // const data = await subCategory.map(d=>{
    //   return{
    //     name:req.body.subCategory,
    //     ...d
    //   }
    // })

    // const newCat=new Category({name:name, description:description})
    // // const newSubCat=new Subcategory({name:SubCategory})
    // const newSubCat=await Subcategory.insertMany(data)
    // // const result = await newSubCat.save()
    // newCat.subCategory.push([ObjectId(newSubCat._id)])
    // const r = await newCat.save()
    // res.status(200).json({
    //     // result,
    //     newSubCat,
    //     r,
    //     'message': 'seccess'
    // })
    // // res.status(201).json({
    // //     'r':r,
    // //     'result':result
    // // })
  } catch (error) {
    console.log(error);
  }
};

const getSingleData = async (req, res) => {
  // if(!req?.body.id) return res.status(400).json({'message':'ID is required '})

  const id = req.params.id;

  const filter = { _id: ObjectId(id) };
  const result = await Category.findOne(filter).exec();

  res.json(result);
  console.log(result.subCategory);
  console.log(id);
};

const update = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "ID is required " });

  const posts = req.body;
  const filter = { _id: ObjectId(id) };

  const updateDoc = {
    $set: posts,
  };
  const options = {
    new: true,
  };

  const result = await Category.findByIdAndUpdate(filter, updateDoc, options);
  res.json(result);
};

const deleteData = async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await Category.deleteOne(query);
  res.json(result);
};

const getSubData = async (req, res) => {
  // if(!req?.body.id) return res.status(400).json({'message':'ID is required '})

  const id = req.params.id;

  const filter = { _id: ObjectId(id) };
  const result = await Category.findOne(filter).exec();
  const subCat = result.subCategory;
  // const subCategory= await Category.find({subCat})

  // const category = await Category.findOne({ _id: cId},"subCategory")

  res.json(subCat);
};

const getSubSingleData = async (req, res) => {
  // if(!req?.body.id) return res.status(400).json({'message':'ID is required '})

  const { cId, sId } = req.params;

  const filterCat = { _id: ObjectId(cId) };
  const filterSubCat = { _id: ObjectId(sId) };

  // const category = await Category.findOne({ _id: cId},{ "subCategory._id": sId})
  // const category = await Category.findOne({ _id: cId},"subCategory")
  const category = await Category.find(
    { "subCategory._id": req.params.sId },
    { name: 1, subCategory: { $elemMatch: { _id: req.params.sId } } }
  );

  res.json(category);
  //  res.sendStatus(200)
};

const createSubCat = async (req, res) => {
  // try {
  //     const id = req.params.idd;
  //     const filter = {_id: ObjectId(id)}
  //     const result = await Category.findOne(filter).exec()

  //    const subCat= result.subCategory.req.body;
  //     // result.markModified('Subcategorys');
  //    const r= await Category.updateOne(filter,
  //     {
  //         $push: {subCategory:subCat}}
  //        )
  //     result.save()
  //     res.status(201).json(r);
  //     console.log(result.subCategory)

  // } catch (error) {
  //     console.log(error);
  // }

  //find the user first, then add the post to it
  Category.findById(req.params.id, function (err, result) {
    if (!err) {
      if (!result) {
        res.sendStatus(404).send("User was not found").end();
      } else {
        result.subCategory.push(req.body);
        result.markModified("subcategorys");
        result.save(function (saveerr, saveresult) {
          if (!saveerr) {
            res.status(200).send(saveresult);
          } else {
            res.status(400).send(saveerr.message);
          }
        });
      }
    } else {
      res.status(400).send(err.message);
    }
  });
};

const updateSubCat = async (req, res) => {
  try {
    const { cId, sId } = req.params;

    const category = await Category.findById(cId);
    if (!category) return res.status(400).send("Invalid Post");

    const subCat = category.subCategory.id(sId);
    subCat.set(req.body);
    const result = await category.save();

    res.status(200).json(subCat);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteSubCat = async (req, res) => {
  try {
    const { cId, sId } = req.params;

    const category = await Category.updateOne(
      {
        _id: cId,
      },
      {
        $pull: {
          subCategory: {
            _id: sId,
          },
        },
      }
    );
    res.status(200).json(category);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteAll = async (req, res) => {
  const result = await Category.deleteMany();
  res.status(200).json(result);
};

module.exports = {
  getData,
  create,
  getSingleData,
  update,
  deleteData,
  getSubData,
  getSubSingleData,
  deleteAll,
  createSubCat,
  updateSubCat,
  deleteSubCat,
};
