const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db.js');
const audioFileController = require('./controllers/audioController')

const app = express();
app.use(bodyParser.json())

app.listen(3000, ()=>console.log(`Server running on PORT 3000`))


//METHODS

app.use('/audioFiles', audioFileController)
