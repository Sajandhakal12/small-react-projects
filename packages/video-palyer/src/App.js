import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [volume, setVolume] = useState(70);
  useEffect(() => {
    const controls = document.querySelector(".controls"),
      fileChooser = document.querySelector(".file-chooser"),
      fullscreen = document.querySelector(".fullscreen-button"),
      playButton = document.querySelector(".play"),
      player = document.querySelector(".player"),
      speedSelect = document.querySelector("select"),
      timeCounter = document.querySelector("time"),
      timeBar = document.querySelector(".time-bar"),
      video = document.querySelector("video"),
      volumeSlider = document.querySelector(".volume-bar");

    let isMouseDown = false,
      timeTotal = 0,
      uiTimeout = "",
      videoStatus = "paused";

    function onKeyDown(e) {
      // eslint-disable-next-line default-case
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowRight":
          skip(e);
          break;
        case "ArrowUp":
        case "ArrowDown":
          adjustVolume(e);
          break;
        case " ":
          playVideo(e);
          break;
      }
      showUI();
    }

    function showUI() {
      if (uiTimeout) clearTimeout(uiTimeout);
      controls.classList.add("active");
      video.style.cursor = "default";
    }

    function hideUI() {
      if (uiTimeout) clearTimeout(uiTimeout);
      if (video.paused) return;

      uiTimeout = setTimeout(() => {
        controls.classList.remove("active");
        setTimeout(() => (video.style.cursor = "none"), 1000);
      }, 2000);
    }

    function onMouseDown() {
      isMouseDown = true;
      showUI();
    }

    function onMouseUp() {
      isMouseDown = false;
      if (videoStatus === "paused") return;

      hideUI();
      video.play();
    }

    function updatePlayState() {
      // eslint-disable-next-line no-unused-expressions
      if (video.paused) {
        playButton.classList.add("start");
        playButton.classList.remove("pause");
      } else {
        playButton.classList.add("pause");
        playButton.classList.remove("start");
      }

      video.paused ? showUI() : hideUI();
    }

    const updatetimeBar = (e) => {
      if (!isMouseDown && e.type === "mousemove") return;

      video.currentTime = timeBar.value;
      if (!isMouseDown) return;

      video.pause();
      showUI();
      hideUI();
    };

    function updateCurrentTime() {
      let seconds = Math.floor(video.currentTime % 60);
      let minutes = Math.floor(video.currentTime / 60);
      seconds = seconds >= 10 ? seconds : "0" + seconds;
      timeCounter.innerText = `${minutes}:${seconds} / ${timeTotal}`;
      if (isMouseDown) return;

      timeBar.value = video.currentTime;
    }

    function playVideo(e) {
      e.preventDefault();
      if (!video.readyState >= 2) return;

      if (video.paused) {
        video.play();
        videoStatus = "playing";
      } else {
        video.pause();
        videoStatus = "paused";
      }
    }

    function adjustVolume(e) {
      if (e.type === "mousemove" && !isMouseDown) return;
      if (e.which === 1) return (video.volume = volumeSlider.value / 100);

      e.preventDefault();
      if (e.key === "ArrowUp" || e.wheelDelta > 0) {
        video.volume = video.volume + 0.1 >= 1 ? 1 : video.volume + 0.1;
        volumeSlider.value = video.volume * 100;
        return;
      }
      if (e.key === "ArrowDown" || e.wheelDelta < 0) {
        video.volume = video.volume - 0.1 <= 0 ? 0 : video.volume - 0.1;
        volumeSlider.value = video.volume * 100;
        return;
      }

      video.volume = volumeSlider.value / 100;
    }

    function skip(e) {
      e.preventDefault();
      // eslint-disable-next-line default-case
      switch (e.key) {
        case "ArrowLeft":
          video.currentTime -= 10;
          break;
        case "ArrowRight":
          video.currentTime += 10;
          break;
      }
      timeBar.value = video.currentTime;
    }

    function toggleFullScreen() {
      player.requestFullscreen
        ? player.requestFullscreen()
        : player.mozRequestFullscreen
        ? player.mozRequestFullscreen()
        : player.webkitRequestFullscreen
        ? player.webkitRequestFullscreen()
        : player.msRequestFullscreen
        ? player.msRequestFullscreen()
        : console.error("fullscreen is not available");

      document.exitFullscreen
        ? document.exitFullscreen()
        : document.mozExitFullscreen
        ? document.mozExitFullscreen()
        : document.webkitExitFullscreen
        ? document.webkitExitFullscreen()
        : document.msExitFullscreen
        ? document.msExitFullscreen()
        : console.error("cannot exit fullscreen mode");

      setVideoSize();
    }

    function selectVideoFile() {
      const file = this.files[0];
      const fileUrl = URL.createObjectURL(file);
      video.type = file.type;
      video.src = fileUrl + "#t=.5";
      video.poster = "";
      video.play();
      videoStatus = "playing";
      setTimeout(() => setVideoData(), 50);
    }

    function setVideoSize() {
      const aspectRatio = video.offsetWidth / video.offsetHeight;
      const d = document;
      controls.style.width = player.offsetWidth + "px";
      if (video.offsetHeight >= player.clientHeight) {
        video.style.width = window.innerHeight * aspectRatio + "px";
      } else {
        video.style.width = player.offsetWidth + "px";
      }
      const margin = (player.offsetHeight - video.offsetHeight) / 2 + "px";
      video.style.marginTop = margin;
    }

    function setVideoData() {
      if (video.readyState) {
        let seconds = Math.floor(video.duration % 60);
        let minutes = Math.floor(video.duration / 60);
        seconds = seconds >= 10 ? seconds : "0" + seconds;
        timeTotal = `${minutes}:${seconds}`;
        timeBar.max = video.duration;
        timeCounter.innerText = `0:00 / ${timeTotal}`;
        updateCurrentTime();
      }
      video.volume = volumeSlider.value / 100;
      isMouseDown = true;
      setVideoSize();
    }

    setVideoData();

    controls.addEventListener("mousemove", () => showUI(), hideUI());
    controls.addEventListener("mouseout", hideUI);

    controls.childNodes.forEach((control) =>
      control.addEventListener("mousedown", onMouseDown)
    );
    controls.childNodes.forEach((control) =>
      control.addEventListener("mouseup", onMouseUp)
    );
    controls.childNodes.forEach((control) =>
      control.addEventListener("touchstart", onMouseDown)
    );
    controls.childNodes.forEach((control) =>
      control.addEventListener("touchend", onMouseUp)
    );

    fileChooser.addEventListener("change", selectVideoFile);

    fullscreen.addEventListener("click", toggleFullScreen);

    playButton.addEventListener("click", playVideo);

    player.addEventListener("fullscreenchange", setVideoSize);
    player.addEventListener("msfullscreenchange", setVideoSize);

    speedSelect.addEventListener(
      "click",
      () => (video.playbackRate = speedSelect.value)
    );

    timeBar.addEventListener("change", updatetimeBar);
    timeBar.addEventListener("mousemove", updatetimeBar);

    video.addEventListener("mouseup", playVideo);
    video.addEventListener("touchend", playVideo);
    video.addEventListener("loadedmetadata", setVideoData);
    video.addEventListener("play", updatePlayState);
    video.addEventListener("pause", updatePlayState);
    video.addEventListener("timeupdate", updateCurrentTime);
    video.addEventListener("mouseout", hideUI);
    video.addEventListener("dblclick", toggleFullScreen);
    video.addEventListener("mousemove", () => showUI(), hideUI());

    volumeSlider.addEventListener("change", adjustVolume);
    volumeSlider.addEventListener("mousemove", adjustVolume);
    volumeSlider.addEventListener("wheel", adjustVolume);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", hideUI);
    window.addEventListener("resize", setVideoSize);
    window.addEventListener("mouseup", onMouseUp);
  }, []);
  return (
    <div className="player">
      <video
        className="video-screen"
        preload="auto"
        src="https://github.com/gregoriB/custom-HTML5-video-player-Javascript/blob/master/video.mp4?raw=true"
        type="video/mp4"
        poster="https://raw.githubusercontent.com/gregoriB/custom-html5-video-player/master/play-button.png"
        msallowfullscreen
        webkitallowfullscreen
        mozallowfullscreen
        allowfullscreen
      >
        Sorry, your browser doesn't support HTML5 video playback.
      </video>
      <div className="controls active">
        <button className="play start"></button>
        <input
          type="range"
          className="volume-bar"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          min="0"
          max="100"
        />
        <input type="range" className="time-bar" value="0" min="0" max="" />
        <time className="time">N/A</time>
        <div className="speed">
          <select>
            <option value=".25">.25</option>
            <option value=".5">.5</option>
            <option value=".75">.75</option>
            <option value="1" selected>
              1
            </option>
            <option value="1.25">1.25</option>
            <option value="1.5">1.5</option>
            <option value="1.75">1.75</option>
            <option value="2">2</option>
          </select>
          speed
        </div>
        <button className="fullscreen-button"></button>
      </div>
      <input className="file-chooser" type="file" />
    </div>
  );
}

export default App;
