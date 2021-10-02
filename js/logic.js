let playBtnElement = document.getElementById("play-btn-pic");
let playImgSrc = "https://storage.yandexcloud.net/lofitimer/play.svg";
let pauseImgSrc = "https://storage.yandexcloud.net/lofitimer/pause.svg";

let timer = new Timer(100);
timer.onUpdate = function() {
  displayTimeMs(timer.remainingMs);
}
timer.onPause = function() {
  player.pauseVideo();
  playBtnElement.src = playImgSrc;
  timeOfTimer.disabled = false;
  ding();
}
timer.onStop = function() {
  player.pauseVideo();
  playBtnElement.src = playImgSrc;
  displayTimeMs(timer.timeout);
  timeOfTimer.disabled = false;
  if (timer.state == "running") {
      // we don't want to ding if the timer was already paused or stopped
      ding();
  }
}
timer.onStart = function() {
  player.playVideo();
  playBtnElement.src = pauseImgSrc;
  timeOfTimer.disabled = true;
}
timer.onSetTimeout = function(timeoutMs) {
  displayTimeMs(timeoutMs);
}
timer.setTimeout(25 * 60 * 1000);

function updateTimeout() {
  let timeoutSeconds = secondsFromTimeString(timeOfTimer.value);
  let timeoutMs = timeoutSeconds * 1000;
  timer.stop();
  timer.setTimeout(timeoutMs);
}
function playBtnClick() {
  if (timer.state == "running") {
    timer.pause();
  } else {
    updateTimeout()
    timer.start();
  }
}

