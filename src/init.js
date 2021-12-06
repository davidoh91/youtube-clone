import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = process.env.PORT || 30000;
const handleListening = () => {
    console.log(`Express server listening on port ${PORT}`);
};
app.listen(PORT, handleListening);