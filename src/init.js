import "./db";
import "./models/Video";
import app from "./server";

const PORT = 29999;
const STRING = `"server listening on http://localhost:${PORT}"`;
const handleListening = () => console.log(STRING);

app.listen(PORT, handleListening);

