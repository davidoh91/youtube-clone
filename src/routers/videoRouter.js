/* 
express.Router() can shorten urls by routing the requests for subdirectories
So, use express.Router() to 'hide' the parent directories and route specific request traffics
*/

import express from "express";

const videoRouter = express.Router();

const handleWatchVideo = (req, res) => {
    console.log('The video handler is accessed');
    res.send("This is Watch Video");
}
videoRouter.get('/watch', handleWatchVideo);

export default videoRouter;