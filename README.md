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

+npm i express-flash
This is for comment section
express-flash is a middleware that allows users to leave messages to templates, and these
message can be used by calling req.flash() in controllers
and will be tied to users' sessions

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

3. npm i regenerator-runtime        << allows using async await in frontend javascript

4. download FFMPEG (and utilize Webassembly) aka. "ffmpeg.wasm"
to write really fast frontend codes, which consume user device's computing power
what does this do? this will turn webm recorded file into mp4 format or however format you want
-> run < npm install @ffmpeg/ffmpeg @ffmpeg/core >

-------------------------------------------------------------------------------------------------------------
# Deployment Related: 
# Build the backend / Build the Frontend / Deploy to Heroku / MongoDB Atlas / Environment Variables / AWS S3 / Production Environment

npm install --save-dev @babel/core @babel/cli

Build the backend >> add "build:server" and "start" to build and start the app
    on package.json...
  "scripts": {
    "start": "node build/init.js",
    "build:server": "babel src -d build",
    "dev:server": "nodemon --exec babel-node src/init.js",
    "dev:assets": "webpack --config webpack.config.js"
  },

Build the frontend >> add "build:assets": "webpack --mode=production" and "build": "npm run build:server && npm run build:assets"
    on package.json...
  "scripts": {
    "start": "node build/init.js",
    "build": "npm run build:server && npm run build:assets",
    "build:server": "babel src -d build",
    "build:assets": "webpack --mode=production",
    "dev:server": "nodemon --exec babel-node src/init.js",
    "dev:assets": "webpack --mode=development"
  },

Deploy to Heroku
    edit out build commands from package.json...
  "scripts": {
  "start": "node build/init.js",
  "dev:server": "nodemon --exec babel-node src/init.js",
  "dev:assets": "webpack --mode=development"
},
  install Heroku CLI from...
    https://devcenter.heroku.com/articles/heroku-cli#download-and-install
  or
  simply run command on vscode >> npm i -g heroku
    refer to this link:
    https://dashboard.heroku.com/apps/<name of your heroku app>/deploy/heroku-git
Also add the current node.js version to package.json as below..
  "engines": {
    "node": "14.x"
  },
heroku login
cd <the repository of your app>
heroku git:remote -a <name of heroku git repository>  
  ^ first, run.. git commit -m "<message here>", git push origin main && git push heroku main 
git add .
git push heroku <main or master...depending on your current branch.. check by git branch>
heroku logs --tail  << use this to check out 
