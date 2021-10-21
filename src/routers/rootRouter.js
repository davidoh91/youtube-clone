/* 
express.Router() can shorten urls by routing the requests for subdirectories
So, use express.Router() to 'hide' the parent directories and route specific request traffics

default export allows change of exported function or constants, but individual const export the actual name matters
*/

import express, { application } from "express";
import { getJoin, postJoin, login, logout } from "../controllers/userController";
import { home, search } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get('/', home);
rootRouter.route('/join').get(getJoin).post(postJoin);
rootRouter.get('/login', login);
rootRouter.get("/search", search);

export default rootRouter;