const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");
console.log("This javascript file adds logic to watch view\n", play, mute, time, volume);

let volumeValue = 0.5;
video.volume = volume;

const handlePlayClick = (e) => {
    if (video.paused) {
        playBtn.innerText = "Pause";
        video.play();
    } else {
        video.pause();
    }
    playBtn.innerText = video.paused ? "Play": "Pause";
};

const handlePause = () => (playBtn.innerText = "Play");
const handlePlay = () => (playBtn.innerText = "Pause");

const handleMute = (e) => {
    if (video.muted) {
        video.muted = false;
        muteBtn.innerText = "Mute";
    } else {
        video.muted = true;
    }
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    volumeRange.value = video.muted ? 0 : 0.5;
};

const handleVolumeChange = (event) => {
    const { target: { value } } = event;
    if(video.muted) {
        video.volume = false;
        muteBtn.innerText = "Mute";
    }
    volumnValue = value;
    video.volume = value;
}

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);