// node.js's express engine uses app -> 
// when this app sends the event to a browser, 
// it holds parameters in "locals" section to share with view templates
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const isHeroku = process.env.NODE_ENV === "production";

const s3 = new aws.S3({
    credentials: {
        accesskeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    }
});
const s3ImageUploader = multerS3({
    s3: s3,
    bucket: 'test-0808/youtube-clone/images',
    acl: 'public-read'
});
const s3VideoUploader = multerS3({
    s3: s3,
    bucket: 'test-0808/youtube-clone/videos',
    acl: 'public-read'
});
export const localsMiddleware = (req, res, next) => {
    console.log("Session Info: ", req.session.id);
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Youtube";
    res.locals.loggedInUser = req.session.user || {};
    res.locals.isHeroku = isHeroku;
    console.log("Session's locals info: ", res.locals);
    next();
};
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
        fileSize: 10000000,
    },
    storage: isHeroku ? s3ImageUploader : undefined,
});
export const videoUpload = multer({
    dest: "uploads/videos/",
    limits: {
        fileSize: 100000000,
    },
    storage: isHeroku ? s3VideoUploader : undefined,
});