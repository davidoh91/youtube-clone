// node.js's express engine uses app -> 
// when this app sends the event to a browser, 
// it holds parameters in "locals" section to share with view templates
import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    console.log("Session Info: ", req.session.id);
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Youtube";
    res.locals.loggedInUser = req.session.user || {};
    console.log("Session's locals info: ", res.locals);
    next();
}
export const protectorMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        return next();
    } else {
        req.flash("error", "Log In First!");
        return res.redirect("/login");
    }
};
export const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        return next();
    } else {
        req.flash("error", "Not Authorized");
        return res.redirect("/");
    }
};
export const avatarUpload = multer({ 
    dest: "uploads/avatars",
    limits: {
        fileSize: 3000000,
    },
});
export const fileUpload = multer({ 
    dest: "uploads/videos",
    limits: {
        fileSize: 10000000,
    }
});
export const videoUpload = multer({
    dest: "uploads/videos/",
    limits: {
        fileSize: 30000000,
    }
});