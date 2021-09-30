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


import express from "express";
// const express = require('express');
// const app = express();

console.log("server.js has started");
const app = express();
const PORT = 25000;
const STRING = 'server listening on http://localhost:25000'

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

//app.use(<insert a function here>) -> the inserted function is globalized for app.get()
app.use(methodLogger, routerLogger);

//0) It's all about creating a route and handling the route!
//1) All the controller functions are middlewares as long as they don't return the request with 'res" function
// app.get("/", logger, handleHome);
app.get("/", handleHome);
app.get("/req", handleReq);
app.get("/res", handleRes);
app.get("/login", handleLogin);

