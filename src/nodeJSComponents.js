
// + Start by <npm init> and <npm install express> inside the github repository folder
// when pulling from git hub repository, just import index.js or server.js, package.json and package-lock.json -> then simply 'npm install'
// + Babel -> 'npm install @babel/preset-env @babel/core @babel/node --save-dev'
//            use 'Nodemon' for automatically trigger of Babel node to print results on the console; the result means javascript->NodeJs 
// + change 'scripts': {'test':~} into...
// "scripts": {
//     "dev": "babel-node index.js" or "babel-node src/server.js"
//   },
// + Nodemon -> 'npm install nodemon --save-dev
//              and simply run 'npm run dev'
// + add morgan module, the middleware by 'npm i morgan'

// +Instead of sending html like this...
// res.send('<!DOCTYPE html><html><body><h1>This is Home Page</h1><p>Test paragraph.</p></body></html>');
// https://expressjs.com/en/guide/using-template-engines.html
// 1.pip install pug
// 2.designate pug as node.js express's view engine
// 3.create pug view file  >> by 'app.set("view engine", "pug")
// Pug helps create view (html templates)

// +Download "MVP styles" to apply minimal/basic styles to your html automatcially

// +Install MongoDB and then install Mongoose to allow Node.js to query directly to MongoDB

// +npm i bcrypt  << this allows the hashing of user passwords before being stored in DB

// +npm i multer
// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.

// 

