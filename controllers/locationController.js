const express =require('express');
const Location = require('../model/Location');

const ObjectId = require('mongodb').ObjectId


const getData= async (req,res)=>{

    
   try {

    const cursor = await Location.find();
    if(!cursor) return res.status(201).json({'message':'No post yet'})
    res.status(201).json(cursor)
       
   } catch (error) {

    console.log(error)
       
   }
    
     
}

const create= async (req,res)=>{

   
    try {

        const result = await Location.create(req.body)
        res.status(201).json(result)

        
    } catch (error) {
        console.log(error);
    }

}




const getSingleData=async(req,res)=>{

   

    try {
        const id = req.params.id;
   
    const filter = {_id: ObjectId(id)}
    const result = await Location.findOne(filter).exec()

     res.json(result);

        
    } catch (error) {
        console.log(error);
    }

}

const update=async(req,res)=>{

    const id = req.params.id;
    if(!id) return res.status(400).json({'message':'ID is required '})

    const posts = req.body;
    const filter = {_id: ObjectId(id)}
  
    const updateDoc = {
        $set: posts
         
     };
     const options={
         new: true
     }

     const result = await Location.findByIdAndUpdate(filter, updateDoc,options);
     res.json(result);


  

}

const deleteData=async(req,res)=>{
    const id= req.params.id;
        const query ={_id: ObjectId(id)};
        const result = await Location.deleteOne(query);
        res.json(result);

}

// State

const getStateData=async(req,res)=>{


    const id = req.params.id;
    const filter = {_id: ObjectId(id)}
    const result = await Location.findOne(filter).exec()
    const state = result.state
     res.json(state);
     

}






const getStateSingleData=async(req,res)=>{

   

  
    const {lId, sId} = req.params;

  try {
    const result = await Location.find({"state._id":req.params.sId  },{ name:1,  state: { $elemMatch:{ _id:req.params.sId } }})
    
   

    res.json(result);
  } catch (error) {

    console.log(error);
      
  }
  
     

}


const createState= async (req,res)=>{

 
   

     try {
           //find the user first, then add the post to it
           Location.findById(req.params.id, function(err, result) {
            if (!err) {
              if (!result){
                res.sendStatus(404).send('User was not found').end();
              }
              else{
                result.state.push(req.body);
                result.markModified('state'); 
                result.save(function(saveerr, saveresult) {
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
        
     } catch (error) {
         console.log(error);
     }

}

const updateState=async (req,res)=>{
   

    try {
      const {  lId, sId } = req.params;

      const location = await Location.findById(lId);
      if (!location) return res.status(400).send('Invalid Request');

      const state= location.state.id(sId)
    state.set(req.body)
    const result = await location.save()

      res.status(200).json(state);
  } catch (error) {
      res.status(400).send(error.message);
  }



}

const deleteState=async (req,res)=>{
   

    try {
      const { lId, sId } = req.params;

   


    const result = await Location.updateOne({
      _id: lId
    }, {
      $pull: {
        state: {
          _id: sId
        }
      }
    });
    res.status(200).json(result);

    

  } catch (error) {
      res.status(400).send(error.message);
  }



}



// City

const getCityData=async(req,res)=>{


//    try {
//     const lId = req.params.id;
//     const filter = {_id: ObjectId(lId)}
//     const result = await Location.findOne(filter).exec()
//     const city = result.state.city
//      res.json(city);
//    } catch (error) {
//        console.log(error);
//    }
    
const {cId, sId} = req.params;

// const filter = {"state._id": ObjectId(sId)}

// // {"state._id":req.params.sId  }
// // { name:1,  state: { $elemMatch:{ _id:req.params.sId } }}

try {
    const result = await Location.find({"state.city._id":req.params.sId  },{ name:1,  state: {name:1},city:{ $elemMatch:{ _id:req.params.sId } }})

  res.json(result);
} catch (error) {

  console.log(error);
    
}


// try {

//     const result=await Location.aggregate([
//         {$match:{"_id" : req.params.lId, "state._id" : req.params.sId}},
//         {$state:{_id: req.params.sId, each: "$sate.city"}}
//      ])

//      res.json(result);
    
// } catch (error) {
//     console.log(error);
// }

}

const createCity= async (req,res)=>{

 
   
    try {
        const {  lId, sId } = req.params;
  
        const location = await Location.findById(lId);
        if (!location) return res.status(400).send('Invalid Request');
  
        const state= location.state.id(sId)
      state.city.push(req.body)
      const result = await location.save()
  
        res.status(200).json(state);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const deleteCity= async (req,res)=>{

 
   
    try {
        const { lId, sId,cId } = req.params;

   


        // const result = await Location.updateOne({
        //   _id: lId
        // }, {'$pull': {'state.$[sId].city': {'_id': ObjectId(cId)}}},{ arrayFilters: [{ "sId": ObjectId(sId)}] },{multi: true});
        const result = await Location.updateOne({
         
        }, {
            $pull: {
                
              'state.$[].city':{
                    $elemMatch:{"city._id":cId}
                 }
                
            }
         },{multi: true});

         
        res.status(200).json(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}



const deleteAll =async(req,res)=>{
    const result=  await Location.deleteMany()
      res.status(200).json(result)
      }


module.exports={
    getData,
    create,
    getSingleData,
    update,
    deleteData,
    getStateData,
    getStateSingleData,
    deleteAll,
    createState,
    updateState,
    deleteState,

    getCityData,
    createCity,
    deleteCity
    
}