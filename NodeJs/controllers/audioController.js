const express = require('express');
let router = express.Router();
//let ObjectId = require('mongoose').Types.ObjectId ***if you're going to use '/:id" in your second router.get

let { audioFile } = require('../models/audio')

//get all audioFiles
router.get('/', (req,res) => {
  audioFile.find((err,docs)=>{
    if(!err){
      res.send(docs);
    } else {
      console.log(err)
    }
  })
})

//get audioFiles by name
router.get('/:name',(req,res)=>{
  if(!req.params.name){
    return res.status(400).send('No audioFile with given name');
  }
   audioFile.findOne({name: req.params.name}, (err,doc)=>{
    if(!err){
      res.send(doc)
    } else {
      console.log(err)
    }
  })
})

router.post('/', (req,res) => {
  const audio = new audioFile({
    name: req.body.name,
    filepath: req.body.filepath
  });
  audio.save((err,doc)=>{
    if(!err){
      res.send(doc);
    } else {
      console.log(err)
    }
  });
})

//updating files - not sure we need this
router.put('/:name',(req,res)=>{
  const audio = {
    name: req.body.name,
    filepath: req.body.filepath
  }

  audioFile.findOneAndUpdate({name: req.params.name},{$set,audio},{new: true}, (err,doc)=>{
    if(!err){
      res.send(doc)
    } else {
      console.log(err)
    }
  })
})

router.delete('/:name', (req,res)=>{
  audioFile.findOneAndDelete({name: req.params.name}, (err,doc)=>{
    if(!err){
      res.send(doc)
    } else {
      console.log(err)
    }
  })
})

module.exports = router;
