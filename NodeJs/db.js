const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dahne:dahne@cluster0.es0ew.mongodb.net/?retryWrites=true&w=majority',(err)=>{
  if(!err){
    console.log('MongoDB Connection Succeeded...')
  }else{
    console.log('Error in DB Connection', err)
  }
})

module.exports = mongoose;
