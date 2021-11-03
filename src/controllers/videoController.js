import Video from "../models/Video";

// using async & await in function
export const home = async(req, res) => {
    try {
        console.log("db video search start");
        const videos = await Video.find({}).sort({createdAt: "desc"});
        console.log("the videos from MongoDB: ", videos);
        console.log("db video search finished");
        console.log(videos)
        return res.render("home", { pageTitle: "Home", videos: videos });
    } catch {
        return res.render("Server Error");
    };
};
export const watch = async(req, res) => {
    const id = req.params.id;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video Not Found." });
    }
    return res.render('watch', { pageTitle: video.title, video } );
};
export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not Found." });
    }
    return res.render("edit", { pageTitle: 'Edit: ${video.title}', video });
};
export const postEdit = async (req, res) => {
    const id = req.params.id;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({ _id: id });
    console.log(video);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video Not Found"} );
    }
    await Video.findByIdAndUpdate(id, { 
        title, 
        description, 
        hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = async (req, res) => {
    console.log(`is the file url in this request??? ${req.file}`);
    const { path: fileUrl } = req.file;
    const { title, description, hashtags } = req.body;
    try{
        await Video.create({
            title,
            description,
            fileUrl,
            hashtags: Video.formatHashtags(hashtags),
        });
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
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
};
export const search = async (req, res) => {
    console.log(req.query)
    const keyword = req.query.keyword;
    let videos = [];
    if (keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(`${keyword}$`, "i"),
            }
        });
    }
    console.log(videos);
    return res.render("search", { pageTitle: "Search", videos });
};