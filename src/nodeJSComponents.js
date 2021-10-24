//+ Start by <npm init> and <npm install express> inside the github repository folder
//when pulling from git hub repository, just import index.js or server.js, package.json and package-lock.json -> then simply 'npm install'
//+ Babel -> 'npm install @babel/preset-env @babel/core @babel/node --save-dev'
//            use 'Nodemon' for automatically trigger of Babel node to print results on the console; the result means javascript->NodeJs 
//+ change 'scripts': {'test':~} into...
//"scripts": {
//     "dev": "babel-node index.js" or "babel-node src/server.js"
//   },
//+ Nodemon -> 'npm install nodemon --save-dev
//              and simply run 'npm run dev'
//+ add morgan module, the middleware by 'npm i morgan'
//
//+Instead of sending html like this...
//res.send('<!DOCTYPE html><html><body><h1>This is Home Page</h1><p>Test paragraph.</p></body></html>');
// https://expressjs.com/en/guide/using-template-engines.html
//1.pip install pug
//2.designate pug as node.js express's view engine
//3.create pug view file  >> by 'app.set("view engine", "pug")
//Pug helps create view (html templates)
//
//+Download "MVP styles" to apply minimal/basic styles to your html automatcially
// 
//+Install MongoDB and then install Mongoose to allow Node.js to query directly to MongoDB
// 
//+npm i bcrypt  << this allows the hashing of user passwords before being stored in DB




import express from "express";
// const express = require('express');
// const app = express();
import morgan from "morgan";



//* must surround template literals (interpolation) with backticks `
const Name = 'David';
console.log(`"Hi my name is ${Name}"`);

console.log("server.js has started");
const app = express();
const PORT = Math.floor(Math.random() * 50000);
const STRING = `"server listening on http://localhost:${PORT}"`;

const handleListening = () => 
    console.log(STRING);

//First, make the node.js server listen to the given port
app.listen(PORT, handleListening);

//handling GET homepage:  use handleHome method...when someone reaches localhost:port's root / via GET
// const handleHome = () => console.log('somebody is trying to GET HOME');
// app.get("/", handleHome);

//handling request coming into '/' and returning the response back  

//middlewares are functions that sends the job to the next function without response
// const gossipMiddleware = (req, res, next) => {
//     console.log("The middleware says: the user is connecting to / Home");
//     next();
// };
// ===============================Global Middlewares(Routers) & Handlers================================
//0) It's all about creating a route and handling the route!
//1) All the controller functions are middlewares as long as they don't return the request with 'res" function
// app.get("/", logger, handleHome);
/*
const methodLogger = (req, res, next) => {
    console.log('\n***methodLogger Info***');
    console.log('Request Method: ', req.method);
    console.log('***methodLogger Info***');
    next();
};
const routerLogger = (req, res, next) => {
    console.log('\n***routerLogger Info***');
    console.log('Path: ', req.path);
    console.log('***routerLogger Info***');
    next();
};
const handleHome = (req, res, next) => {
    return res.send("<h1>This handles / Home</h1>");
};
const handleReq = (req, res) => {
    console.log(req);
    console.log('=========================================\n\n\n\n');
    // return res.end();
    return res.send("This handles the request received: ");
};
const handleRes = (req, res) => {
    console.log(res);
    console.log('=========================================\n\n\n\n');
    return res.send("This sends a response back");
};
const handleLogin = (req, res) => {
    // return res.send({"This handles login!");
    return res.send({message: "Login here."})
};
app.use(methodLogger, routerLogger);
app.get("/", handleHome);
app.get("/req", handleReq);
app.get("/res", handleRes);
app.get("/login", handleLogin);
*/


// ===========================Logger 
//instead of manually writing loggers, use morgan module
const logger = morgan('dev');
app.use(logger);
// const logger = morgan('combined');
// const logger = morgan('common');
/* 
express.Router() can shorten urls by routing the requests for subdirectories
So, use express.Router() to 'hide' the parent directories and route specific request traffics
*/
const globalRouter = express.Router();
const handleHome = (req, res) => res.send("This is 'Home'");
globalRouter.get("/", handleHome);

const userRouter = express.Router();
const handleEditUser = (req, res) => res.send("This is 'Edit User'");
userRouter.get("/edit", handleEditUser);


const handleWatchVideo = (req, res) => res.send("Watch 'Video'");
const videoRouter = express.Router();
videoRouter.get("/watch", handleWatchVideo);

// =================================Application===========================================
//app.use(<insert a function here>) -> the inserted function is globalized for app.get()
app.use('/', globalRouter);
app.use('/videos', userRouter);
app.use('/users', userRouter);


