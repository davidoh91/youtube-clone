const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime")
const totalTime = document.getElementById("totalTime")
console.log("This javascript file adds logic to watch view\n", video, play, mute, time, volumeRange, currentTime, totalTime);

let volumeValue = 0.5;
video.volume = volumeValue;

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
const handleMuteClick = (e) => {
    if (video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    volumeRange.value = video.muted ? 0 : volumeValue;
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
const formatTime = (time) => {
    new Date(time * 1000).toISOString().substr(11, 8);
}
const handleLoadedMetadata = (event) => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
}
const handleTimeUpdate = (event) => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
}

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedMetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
