

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
//const express = require('express'); // 1 - with latest npm we can use import statments
// go in package.json and add type: module 
// Step 2 ------------>>>>>>>> Routing
import Routes from './service/route.js';

const app = express(); // we need to do this with every express application to initilise it with app and then we run 
// it as a fuction

// To handle HTTP POST requests in Express.js version 4 and above, you need to install the middleware module called body-parser.
// body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.
app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// Step 2 ------------------->
app.use('/users', Routes);


const URL = process.env.MONGODBURL || "mongodb://localhost:27017";
// const dotenv = require('dotenv'); //3 - but we need to tell express where to pick this port 
// It allows you to seperate your crediantials when we work in a collaborative environment
const PORT = process.env.PORT || 8080; //2 - get the port from env file, if not available pick 8080

// connect with the database, takes two arguments 1 - connection url 2 - object with all the options
// Some of the functions, features are deprecated so it might give you a warning, to avoid that warning
// use ----> useNewUrlParser: true 
// 1 - Current URL string parser is deprecated, and will be removed in a future version. 
// To use the new parser, pass option { useNewUrlParser: true } 
// 2 - Current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version.
// To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true }
// 3 - As per the official documentation, 'useFindAndModify': true by default. Set to false to make 
// findOneAndUpdate() and findOneAndRemove() use native findOneAndUpdate() rather than findAndModify().

// if (process.env.NODE_ENV == "production"){
//     app.use(express.static("client/build"));
// }


mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => { 
    
    app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
}).catch((error) => {
    console.log('Error:', error.message)
})

app.get('/', getPlayers);


// We can do something like this or we can set it directly in the url as well
// mongoose.set('useFindAndModify', false);
