/* 
express.Router() can shorten urls by routing the requests for subdirectories
So, use express.Router() to 'hide' the parent directories and route specific request traffics

default export allows change of exported function or constants, but individual const export the actual name matters
*/

import express from "express";
import { join } from "../controllers/userController";
import { trending } from "../controllers/videoController";

const globalRouter = express.Router();

const handleHome = (req, res) => res.send('This is Home');

globalRouter.get('/', trending);
globalRouter.get('/join', join);

export default globalRouter;