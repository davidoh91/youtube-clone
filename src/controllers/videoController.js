import Video from "../models/Video";

// using async & await in function
export const home = async(req, res) => {
    try{
        console.log("db video search start");
        const videos = await Video.find({});
        console.log("the videos from MongoDB: ", videos);
        console.log("db video search finished");
        return res.render("home", { pageTitle: "Home", videos: videos });
    } catch {
        return res.render("Server Error");
    };
};
export const watch = (req, res) => {
    const id = req.params.id;
    res.render('watch', { pageTitle: 'Watching' } );
};
export const getEdit = (req, res) => {
    const { id } = req.params;
    return res.render("edit", { pageTitle: 'Editing' });
};
export const postEdit = (req, res) => {
    const id = req.params.id;
    const { title } = req.body;
    return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = (req, res) => {
    const { title, description, hashtags } = req.body;
    const video = new Video({
      title: title,
      description: description,
      createdAt: Date.now(),
      hashtags: hashtags.split(",").map((word) => `#${word}`),
      meta: {
        views: 0,
        rating: 0,
      },
    });
    console.log(video);
    return res.redirect("/");
};
