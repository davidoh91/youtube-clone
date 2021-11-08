# This is Youtube
-------------------------------------------------------------------------------------------------------------
# Backend Related...

# global router
/ -> Home
/join -> Join
/login -> Login
/search -> Search
# user router
/users/:id -> See User
/users/logout -> Log Out
/users/edit -> Edit My Profile
/users/delete -> Delete My Profile
# video router
/videos/:id -> See(also like/comment)Video
/videos/:id/edit -> Edit Video
/videos/:id/delete -> Delete Video
/videos/upload -> Upload a video

# Some information on initial setup

+ Start by <npm init> and <npm install express> inside the github repository folder
when pulling from git hub repository, just import index.js or server.js, package.json and package-lock.json -> then simply 'npm install'
+ Babel -> 'npm install @babel/preset-env @babel/core @babel/node --save-dev'
           use 'Nodemon' for automatically trigger of Babel node to print results on the console; the result means javascript->NodeJs 
+ change 'scripts': {'test':~} into...
"scripts": {
    "dev": "babel-node index.js" or "babel-node src/server.js"
  },
+ Nodemon -> 'npm install nodemon --save-dev
             and simply run 'npm run dev'
+ add morgan module, the middleware by 'npm i morgan'

+Instead of sending html like this...
res.send('<!DOCTYPE html><html><body><h1>This is Home Page</h1><p>Test paragraph.</p></body></html>');
https://expressjs.com/en/guide/using-template-engines.html
1.pip install pug
2.designate pug as node.js express's view engine
3.create pug view file  >> by 'app.set("view engine", "pug")
Pug helps create view (html templates)

+Download "MVP styles" to apply minimal/basic styles to your html automatcially

+Install MongoDB and then install Mongoose to allow Node.js to query directly to MongoDB

+npm i bcrypt  << this allows the hashing of user passwords before being stored in DB

+npm i multer
Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.

-------------------------------------------------------------------------------------------------------------
# Frontend related... 

+webpack
0. What does webpack do???
-> ***webpack processes sexy javascript and scss into ugly javascript and css that only browser can understand***
1. first installation..... < npm install webpack, webpack-cli --save-dev >
2. then config...... add webpack inside the script section of package.json file:
  "scripts": {
    "dev": "nodemon --exec babel-node src/init.js",
    "assets": "webpack --config webpack.config.js"
  },
and make sure... to connect assets/js (the output of webpack) to base.pug view file of the server
and...... install and config each uploaders for sexy js -> js, scss -> css, others  
          < npm i --save-dev sass-loader, sass webpack, css-loader, mini-css-extract-plugin
it will look something like below..

const path = require('path');
module.exports = {
    entry: './src/client/js/main.js',
    plugins: [
        new MiniCssExtractPlugin(),
        filename: "css/styles.css",
    ],
    mode: "development",
    output: {
        filename: 'js/main.js',
        path: path.resolve(__dirname, "assets"),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", { targets: "defaults" }]],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    }
};

then.. run < npm run assets > to apply the webpack and its css/javascript loaders to the source file


