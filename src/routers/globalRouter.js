/* 
express.Router() can shorten urls by routing the requests for subdirectories
So, use express.Router() to 'hide' the parent directories and route specific request traffics
*/

import express from "express";

const globalRouter = express.Router();

const handleHome = (req, res) => res.send('This is Home');

globalRouter.get('/', handleHome);

export default globalRouter;