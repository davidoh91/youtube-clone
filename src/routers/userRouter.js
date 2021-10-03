/* 
express.Router() is the beginning of the full URL
It can shorten urls by routing the requests for subdirectories
So, use express.Router() to 'hide' the parent directories and route specific request traffics
*/

import express from "express";
import { edit, remove } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get('/edit', edit);
userRouter.get('/remove', remove);

export default userRouter;