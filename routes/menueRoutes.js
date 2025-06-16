const express = require('express');
const router= express.Router();
const menueItems = require('./../models/menueItems');

// for menue get and post operation 
router.get('/',async(req,res)=>{
  try{
    const data = await menueItems.find();
    console.log('data fetched');
    res.status(200).json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
  }
 })

 router.post('/',async(req,res)=>{
  try{
    const data = req.body;
    const newMenueItem = new menueItems(data);
    const response = await newMenueItem.save();
    console.log('Menue Item Saved');
    res.status(200).json(response);
 }

 catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
  }
 })
 module.exports= router;