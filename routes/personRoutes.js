const express = require('express');
const router= express.Router();
const Person= require('./../models/person');

/*
router.get('/chicken',(req,res) => {
  var customized_idli ={
    name:'Chicken Latpat',
    size:'Full Portion',
    Is_spicy:false,

  }
res.send(customized_idli)
})*/

router.post('/',async(req,res)=>{
  try{
      const data = req.body
  //now I have to create an new person document using mongoose model
  const newPerson = new Person(data);
  //save new person to database
  const response = await newPerson.save();
  console.log('data saved');
  res.status(200).json(response);
}
catch(err){
  console.log(err);
  res.status(500).json({error: 'Internal Server Error'});
}
})

router.get('/',async(req,res)=>{
  try{
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);

  }
  catch (err){
  console.log(err);
  res.status(500).json({error: 'Internal Server Error'});
  }
})
router.get('/:workType',async(req,res)=>{
  try{
    const workType = req.params.workType;
    if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
      const response= await Person.find({work:workType});
       console.log('response fetched');
       res.status(200).json(response);
    }
    else{
       res.status(400).json({error:'Invalid work type'});
      
    }
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'internal Server Error'});
  }
 })

 router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(id, updatedPersonData, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: 'Person Not Found' });
    }

    console.log('Data Updated');
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id',async(req,res)=>{
  try{
    const id = req.params.id;
    const response = await Person.findByIdAndDelete(id);

   if (!response) {
      return res.status(404).json({ error: 'Person Not Found' });
    }
    console.log('data deleted');
    res.status(200).json({message:'person deleted Successfully'});

  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports= router;

