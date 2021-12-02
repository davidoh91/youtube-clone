import mongoose from "mongoose";

// for test purposes, use localhost mongodb takes the DB_URL from .env file, 
// but for build & deployment, process.env.DB_URL must be set on MongoDB Atlas Website
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB");
const handleError = (error) => console.log("DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);

