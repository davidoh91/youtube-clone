import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

console.log("server.js has started");
const app = express();
const PORT = Math.floor(Math.random() * 50000);
const STRING = `"server listening on http://localhost:${PORT}"`;

const handleListening = () => 
    console.log(STRING);

app.listen(PORT, handleListening);

const logger = morgan('dev'); //'combined'|'common'
app.use(logger);
/* 
express.Router() can shorten urls by routing the requests for subdirectories
So, use express.Router() to 'hide' the parent directories and route specific request traffics
*/
// =================================Application===========================================
//app.use(<insert a function here>) -> the inserted function is globalized for app.get()
app.use('/', globalRouter);
app.use('/videos', videoRouter);
app.use('/users', userRouter);




