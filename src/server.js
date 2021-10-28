// console.log("*******************\n", process.env.COOKIE_SECRET, "\n*******************\n", process.env.DB_URL);
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";

console.log(process.cwd());
console.log("server.js has started");
const app = express();
// const PORT = Math.floor(Math.random() * 50000);

const logger = morgan('dev'); //'combined'|'common'

/* 
express.Router() can shorten urls by routing the requests for subdirectories
So, use express.Router() to 'hide' the parent directories and route specific request traffics
*/

// =================================Application===========================================
//app.use(<insert a function here>) -> the inserted function is globalized for app.get()

app.set('view engine', 'pug'); // set the view template engine as pug
app.set('views', process.cwd() + '/src/views'); // set the correct path for views directory from the point of package.json file

app.use(logger);
app.use(express.urlencoded({ extended: true})); // this middleware, express.urlencoded(), enables us to use the POST method when sending form
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: true,
        // cookie: {
        //     maxAge: 20000,
        // }
        store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    })
);
app.use(localsMiddleware);
app.use('/', rootRouter);
app.use('/videos', videoRouter);
app.use('/users', userRouter);

export default app;


