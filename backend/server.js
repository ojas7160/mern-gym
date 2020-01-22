const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const userRoute = require('./routes/userRoutes/userRoute');

const app = express();
const connectionString = 'mongodb+srv://ojas7160:ojas7160@cluster0-02ba1.mongodb.net/gym?retryWrites=true&w=majority';

app.use(bodyParser.json()); // parse request body
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(connectionString).
then(() => {
  console.log('DB connected')
}).catch(err => {
  console.log(err)
})

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Authorization, Content-Type, Accept');
	res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');
	next();
})

//routes
// app.use("/api/posts", userRoute);

module.exports = app;