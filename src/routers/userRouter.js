/* 
express.Router() can shorten urls by routing the requests for subdirectories
So, use express.Router() to 'hide' the parent directories and route specific request traffics
*/

import express from "express";

const userRouter = express.Router();

const handleEditUser = (req, res) => res.send('This is Edit User');

userRouter.get('/edit', handleEditUser);

export default userRouter;