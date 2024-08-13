const express=require('express');
const router=express.Router();
const Person=require('../models/Person');

  router.post('/',async(req,res)=>{
    try{ 
      const data=req.body;
      const newperson = new Person(data);
      const response=await newperson.save();
      console.log("data saved");
      res.status(200).json(response)
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:"Internal server error"})
    }
  })

  router.get('/',async(req,res)=>{
    try{
      const data=await Person.find();
      console.log("data fetched")
      res.status(200).json(data)
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:"Internal server error"})
    }
  })

  router.get('/:worktype',async(req,res)=>{
    try {
      const worktype=req.params.worktype;
      if(worktype=='chef'||worktype=='manager'||worktype=='waiter'){
        const response=await Person.find({work:worktype});
        console.log("response fetched");
        res.status(200).json(response);
      }
      else{
        res.status(404).json({error:'Invalid work type'});
      }
    } catch (error) {
      console.log(err);
      res.status(500).json({error:'Internal server error'});
    }
  })
  
  router.put('/:id',async (req,res)=>{
    try{
      const personid=req.params.id;
      const updatedpersondata=req.body;

      const response=await Person.findByIdAndUpdate(personid,updatedpersondata,{
        new:true,
        runValidators:true,
      })

      if(!response){
        return res.status(404).json({error:"Person not found"})
      }

      console.log("data updated")
      res.status(200).json(response)
    }catch(err){
      console.log(err);
      res.status(500).json({error:"Internal Server error"})
    }
  })

  router.delete('/:id',async(req,res)=>{
    try{
      const personid=req.params.id;
      const response=await Person.findByIdAndDelete(personid);
      if(!response){
        return res.status(404).json({error:"Person not found"});
      }
      console.log("data deleted")
      res.status(200).json({message:"per deleted successfully"})
    }catch(err){
      console.log(err);
      res.status(500).json({error:"Internal Server Error"});
    }
  })

module.exports=router;