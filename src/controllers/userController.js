import User from "../models/User";
import Video from "../models/Video"
import bcrypt from "bcrypt";
import fetch from "node-fetch";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join"});
};
export const postJoin = async (req, res) => {
    console.log(req.body);
    const pageTitle = "Join";
    const {name, username, email, password, password2, location } = req.body;
    if(password !== password2){
        return res.status(400).render("join", {
            pageTitle: pageTitle,
            errorMessage: "Confirm Password Again"
        });
    }
    const exists = await User.exists({
        $or: [{ username:username } , { email:email }]
    });
    if(exists){
        return res.status(400).render("join", { 
            pageTitle: pageTitle, 
            errorMessage: "This username/email is already taken"
        });
    }
    try {
        await User.create({
            name,
            username,
            email,
            password,
            location,
        });
        return res.redirect("login");
    } catch (error) {
        return res.status(400).render("upload", {
            pageTitle: "Upload Video",
            errorMessage: error._message,
        });
    }
};
export const getLogin = (req, res) => 
    res.render("login", { pageTitle: "Login" });
export const postLogin = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({ username: username });
    const exists = await User.exists({ username: username });
    if(!exists){
        return res.status(400).render("login", { 
                pageTitle: "Login", 
                errorMessage: "An account with this username does not exist",
            });
    }
    console.log(`Info on the User stored in DB: ${user}`);
    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        return res.status(400).render("login", {
            pageTitle: "Login",
            errorMessage: "Wrong Password",
        });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    console.log("Log the user in");
    res.redirect("/");
};

export const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope:"read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    console.log(finalUrl);
    return res.redirect(finalUrl);
};
export const finishGithubLogin = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await (
        await fetch(finalUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        })
    ).json();
    console.log("params:\n", params);
    console.log("\ntokenRequest:\n", tokenRequest);
    if ("access_token" in tokenRequest) {
        const { access_token } = tokenRequest;
        const apiUrl = "https://api.github.com";
        const userData = await (
            await fetch(`${apiUrl}/user`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();
        console.log("*********fetched userData via Github API:\n", userData);
        const emailData = await (
            await fetch(`${apiUrl}/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();
        const emailObj = emailData.find(
            (email) => email.primary === true && email.verified === true
        );
        console.log("*********fetched emailData via Github API:\n", emailObj);
        if (!emailObj) {
            // set notification
            return res.redirect("/login");
        }
        let user = await User.findOne({ email: emailObj.email });
        if(!user){
            user = await User.create({
                name: userData.name,
                avatarUrl: userData.avatar_url,
                username: userData.login,
                email: emailObj.email,
                password: "",
                socialOnly: true,
                location: userData.location,
            });
        }
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    } else {
        return res.redirect("/login");
    }
};
export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};
export const getEdit = (req, res) => {
    return res.render("edit-profile", { pageTitle: "Edit Profile" });
};
export const postEdit = async (req, res) => {
    const {
        session: {
            user: { _id, avatarUrl },
        },
        body: { name, email, username, location },
        file,
    } = req;
    console.log(req);
    console.log("******User-posted avatar file for edit: ", file);
    const updatedUser = await User.findByIdAndUpdate(
        _id, 
        {
            avatarUrl: file ? file.path : avatarUrl,
            name,
            email,
            username,
            location,
        },
        { new: true },
    );
    req.session.user = updatedUser;
    return res.redirect("/users/edit");
};
export const getChangePassword = (req, res) => {
    if (req.session.user.socialOnly === true) {
        return res.redirect("/");
    }
    return res.render("users/change-password", { pageTitle: "Change Password" });
};
export const postChangePassword = async (req, res) => {
    const {
        session: {
            user: { _id },
        },
        body: { oldPassword, newPassword, newPasswordConfirmation },
    } = req;
    const user = await User.findByIdAndUpdate({ _id:_id });
    const ok = await bcrypt.compare(oldPassword, user.password);
    if (!ok) {
        return res.status(400).render("users/change-password", {
            pageTitle: "Change Password",
            errorMessage: "The current password is incorrect",
        });
    }
    if (newPassword !== newPasswordConfirmation) {
        return res.status(400).render("users/change-password", {
            pageTitle: "Change Password",
            errorMessage: "The password does not match the confirmation",
        });
    }
    user.password = newPassword;
    await user.save();
    return res.redirect("/users/logout");
};
export const see = async (req, res) => {
    console.log("This is the request for /users/:id", req);
    const { id } = req.params;
    const user = await User.findById(id).populate({
        path: "videos",
        populate: {
            path: "owner",
            model: "User",
        },
    });
    if (!user) {
        return res.status(404).render("404", { pageTitle: "User not found." });
    }
    return res.render("users/profile", {
        pageTitle: `${user.name}'s Profile`,
        user,
    });
};