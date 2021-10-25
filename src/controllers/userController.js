import User from "../models/User"

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
    const exists = await User.exists({$or: [{ username:username, email:email }]});
    if(exists){
        return res.status(400).render("join", { 
            pageTitle: pageTitle, 
            errorMessage: "This username/email is already taken"
        });
    }
    
    await User.create({
        name, 
        username, 
        email, 
        password, 
        location,
    });
    return res.redirect("/login");
};
export const edit = (req, res) => res.send("This is Edit User");
export const remove = (req, res) => res.send("This is Remove User");
export const login = (req, res) => res.send("This is Login");
export const logout = (req, res) => res.render("logout");
export const see = (req, res) => res.send("This is See User");