export const trending = (req, res) => res.send("This is Home Page Videos");
export const see = (req, res) => {
    //req.params holds the parameters on the web request
    return res.send(`Watch Video #${req.params.id}`);
}
export const edit = (req, res) => {
    return res.send(`Edit Video #${req.params.id}`);
}
export const search = (req, res) => res.send("This is Search");
export const upload = (req, res) => res.send("This is Upload");
export const deleteVideo = (req, res) => {
    return res.send(`Delete Video #${req.params.id}`);
}
//export default trending;  << instead of default export, export each constants