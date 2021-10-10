const fakeUser = {
    username: "David",
    loggedIn: true,
};

/*
export const trending = (req, res) => {
    res.send("This is Home Page Videos");
    Instead of sending html like this... use "Pug"
    res.send('<!DOCTYPE html><html><body><h1>This is Home Page</h1><p>Test paragraph.</p></body></html>');
    res.render("home"); //use res.render() and insert 'home' pug template in the views directory
}
*/
export const trending = (req, res) => {
    const videos = [
        {
            title: "First Video",
            rating: 5,
            comments: 255,
            createdAt: "5 minutes ago",
            views: 51000,
            id: 1,
        },
        {
            title: "Second Video",
            rating: 3,
            comments: 15,
            createdAt: "4 minutes ago",
            views: 8000,
            id: 2,
        },
        {
            title: "Third Video",
            rating: 4,
            comments: 98,
            createdAt: "3 minutes ago",
            views: 16000,
            id: 3,
        },
    ];
    res.render("home", { pageTitle: "Home",  videos });
}
/*
export const see = (req, res) => {
    //req.params holds the parameters on the web request
    return res.send(`Watch Video #${req.params.id}`);
    
}
*/
export const see = (req, res) => res.render('watch');
export const edit = (req, res) => {
    return res.send(`Edit Video #${req.params.id}`);
}
export const search = (req, res) => res.send("This is Search");
export const upload = (req, res) => res.send("This is Upload");
export const deleteVideo = (req, res) => {
    return res.send(`Delete Video #${req.params.id}`);
}
//export default trending;  << instead of default export, export each constants
