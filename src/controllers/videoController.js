import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";

// using async & await in function
export const home = async(req, res) => {
    console.log("db video search start");
    const videos = await Video.find({})
        .sort({ createdAt: "desc" })
        .populate("owner");
    if (videos) {
        console.log(`*************check the videos!!!!\n${videos}`);
        return res.render("home", { pageTitle: "Home", videos: videos });
    } else {
        return res.render("home", { pageTitle: "Home"});
    }
};
export const watch = async(req, res) => {
    const id = req.params.id;
    const video = await Video.findById(id).populate("owner").populate("comments");
    console.log(`***********video from /videos/:id(videoid)/watch**************: ${video}`);
    const owner = await User.findById(video.owner._id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video Not Found." });
    }
    return res.render('watch', { pageTitle: video.title, video, owner } );
};
export const getEdit = async (req, res) => {
    const { id } = req.params;
    const { user: 
        {_id} 
    } = req.session;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not Found." });
    }
    console.log(typeof video.owner, typeof _id);
    if (String(video.owner) !== String(_id)) {
        req.flash("error", "Not Authorized to Edit");
        return res.status(403).redirect("/");
    }
    return res.render("edit", { pageTitle: `${video.title}`, video });
};
export const postEdit = async (req, res) => {
    const id = req.params.id;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({ _id: id });
    console.log(video);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video Not Found"} );
    }
    if (String(video.owner) !== String(_id)) {
        req.flash("error", "Not Authorized; You are not the owner of the video");
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndUpdate(id, { 
        title, 
        description, 
        hashtags: Video.formatHashtags(hashtags),
    });
    req.flash("success", "Changes Saved");
    return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" });
};

const isHeroku = process.env.NODE_ENV === "production";
export const postUpload = async (req, res) => {
    const {
        user: { _id },
    } = req.session;
    console.log(`!!!!!!!!!!!!!!!checking req.params!!!!!!!!!!\n ${req.params}`)
    const { video, thumb } = req.files;
    console.log("checking video file and thumbnail sent via router..", video, thumb);
    const { title, description, hashtags } = req.body;
    try {
        const newVideo = await Video.create({
            title,
            description,
            fileUrl: isHeroku ? video[0].location : video[0].path,
            thumbUrl: isHeroku ? thumb[0].location : thumb[0].path,
            owner: _id,
            hashtags: Video.formatHashtags(hashtags),
        });
        const user = await User.findById(_id);
        user.videos.push(newVideo._id);
        user.save();
        return res.redirect("/");
    } catch (error) {
        console.log(error)
        return res.status(400).render("upload", {
            pageTitle: "Upload Video",
            errorMessage: error._message,
        })
    };
};
export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    const { user: 
        {_id} 
    } = req.session;
    const video = Video.findById(_id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found."});
    }
    console.log(typeof video.owner, typeof _id);
    if (String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
};
export const search = async (req, res) => {
    const keyword = req.query.keyword;
    let videos = [];
    if (keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(`${keyword}$`, "i"),
            }
        }).populate("owner");
    }
    return res.render("search", { pageTitle: "Search", videos });
};
export const registerView = async (req, res) => {
    console.log("******************", req.params.id);
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.sendStatus(404);
    }
    video.meta.views = video.meta.views + 1;
    await video.save();
    return res.sendStatus(200);
};
export const createComment = async (req, res) => {
    const {
        session: { user },
        body: { text },
        params: { id },
    } = req;
    console.log("createComment's user session: ", user);
    const video = await Video.findById(id);
    if (!video) {
        return res.sendStatus(404);
    }
    const comment = await Comment.create({
        text: text,
        owner: user._id,
        video: id,
    });
    video.comments.push(comment._id);
    video.save();
    return res.Status(201).json({ newCommentId: comment._id });
};