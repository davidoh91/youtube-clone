import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

console.log(process.cwd());
console.log("server.js has started");
const app = express();
// const PORT = Math.floor(Math.random() * 50000);
const PORT = 52222;
const STRING = `"server listening on http://localhost:${PORT}"`;

const handleListening = () => console.log(STRING);
const logger = morgan('dev'); //'combined'|'common'

/* 
express.Router() can shorten urls by routing the requests for subdirectories
So, use express.Router() to 'hide' the parent directories and route specific request traffics
*/

// =================================Application===========================================
//app.use(<insert a function here>) -> the inserted function is globalized for app.get()
app.listen(PORT, handleListening);
app.set('view engine', 'pug'); // set the view template engine as pug
app.set('views', process.cwd() + '/src/views'); // set the correct path for views directory from the point of package.json file

app.use(logger);
app.use(express.urlencoded({ extended: true}));
app.use('/', globalRouter);
app.use('/videos', videoRouter);
app.use('/users', userRouter);




