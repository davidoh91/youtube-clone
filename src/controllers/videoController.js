import Video from "../models/Video";


export const home = (req, res) => {
    Video.find({}, (error, videos) => {
        console.log("errors", error);
        console.log("videos", videos);
    });
    console.log( 1 + 1 );
    res.render("home", { pageTitle: "Home" });
}
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
    console.log(req.body);
    console.log(req.body.title);
    const { title } = req.body;
    return res.redirect("/");
};
