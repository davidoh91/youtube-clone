/* 
express.Router() can shorten urls by routing the requests for subdirectories
So, use express.Router() to 'hide' the parent directories and route specific request traffics

default export allows change of exported function or constants, but individual const export the actual name matters
*/

import express, { application } from "express";
import { join, login, logout } from "../controllers/userController";
import { trending, search } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get('/', trending);
globalRouter.get('/join', join);
globalRouter.get('/login', login);
globalRouter.get('/logout', logout)
globalRouter.get('/search', search);

export default globalRouter;