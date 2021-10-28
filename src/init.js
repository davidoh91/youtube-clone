import "dotenv/config";
import "./db";
import "./models/Video";
import app from "./server";

const PORT = 30000;
const STRING = `"server listening on http://localhost:${PORT}"`;
const handleListening = () => console.log(STRING);

app.listen(PORT, handleListening);
