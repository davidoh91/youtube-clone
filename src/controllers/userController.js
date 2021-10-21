export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join"});
};
export const postJoin = (req, res) => {
    console.log(req.body);
    res.end();
};
export const edit = (req, res) => res.send("This is Edit User");
export const remove = (req, res) => res.send("This is Remove User");
export const login = (req, res) => res.send("This is Login");
export const logout = (req, res) => res.render("logout");
export const see = (req, res) => res.send("This is See User");