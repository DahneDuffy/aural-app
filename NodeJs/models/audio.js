const mongoose = require('mongoose');

let audioFile = mongoose.model('audioFile',{
  name: {type: String},
  filepath: {type: String}
},)

module.exports = { audioFile };
