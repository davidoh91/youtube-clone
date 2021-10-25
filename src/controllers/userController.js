import User from "../models/User"
import bcrypt from "bcrypt"

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
    const exists = await User.exists({username: username});
    if(!exists){
        return res.status(400).render("login", { 
                pageTitle: "Login", 
                errorMessage: "An account with this username does not exist",
            });
    }
    console.log(user);
    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        return res.status(400).render("login", {
            pageTitle: "Login",
            errorMessage: "Wrong Password",
        });
    }
    console.log("Log the user in");
    res.redirect("/");
};
export const edit = (req, res) => res.send("This is Edit User");
export const remove = (req, res) => res.send("This is Remove User");
export const logout = (req, res) => res.render("logout");
export const see = (req, res) => res.send("This is See User");