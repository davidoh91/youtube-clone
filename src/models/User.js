import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    avatarUrl: String,
    socialOnly:  { type: Boolean, default: false },
    githubLoginOnly: { type: Number },
    username: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String, required: true },
    location: String,
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" },],
});

userSchema.pre('save', async function(){
    console.log("User Password:", this.password);
    this.password = await bcrypt.hash(this.password, 5);
    console.log("Hashed Password: ", this.password);
});

const User = mongoose.model('User', userSchema);
export default User;