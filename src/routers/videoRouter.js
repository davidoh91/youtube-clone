/* 
express.Router() can shorten urls by routing the requests for subdirectories
So, use express.Router() to 'hide' the parent directories and route specific request traffics
*/

import express from "express";
import { watch, getUpload, postUpload, getEdit, postEdit, deleteVideo } from "../controllers/videoController";
import { protectorMiddleware } from "../middlewares";

const videoRouter = express.Router();

// *Including the controllers within the routers can cause chaos.. export/import these controllers from elsewhere
// const handleWatchVideo = (req, res) => {
//     console.log('The video handler is accessed');
//     res.send("This is Watch Video");
// }
// const handleEdit = (req, res) => {
//     res.send("This is Edit Video");
// }

/*
Here, : indicates id is a parameter
(\\d+) is the regular expression that accepts only digits for ID
*/
videoRouter.get('/:id([0-9a-f]{24})', watch);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(postEdit);
videoRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware)
  .get(deleteVideo);
videoRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(postUpload);

export default videoRouter;