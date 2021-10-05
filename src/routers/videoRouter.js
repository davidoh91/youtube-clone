/* 
express.Router() can shorten urls by routing the requests for subdirectories
So, use express.Router() to 'hide' the parent directories and route specific request traffics
*/

import express from "express";
import { upload, see, edit, deleteVideo } from "../controllers/videoController";

const videoRouter = express.Router();

// *Including the controllers within the routers can cause chaos.. export/import these controllers from elsewhere
// const handleWatchVideo = (req, res) => {
//     console.log('The video handler is accessed');
//     res.send("This is Watch Video");
// }
// const handleEdit = (req, res) => {
//     res.send("This is Edit Video");
// }
videoRouter.get('/upload', upload)
videoRouter.get('/:id', see);
videoRouter.get("/:id/edit", edit);
videoRouter.get("/:id/delete", deleteVideo);

export default videoRouter;