class Timer {
  constructor(updateIntervalMs) {
    this.updateIntervalMs = updateIntervalMs;
    this.interval = null;
    this.elapsedMs = 0;
    this.state = "stopped";

    this.onSetTimeout = function(timeout) {};
    this.onStart = function() {};
    this.onPause = function() {};
    this.onStop = function() {};
    this.onUpdate = function() {};
  }

  get remainingMs() {
    var remainingMs = this.timeout - this.elapsedMs;
    if (remainingMs < 0) {
      remainingMs = 0;
    }
    return remainingMs;
  }

  start() {
    if (this.state == "running") {
      return;
    }
    this.state = "running";
    this.interval = setInterval(this.update.bind(this), this.updateIntervalMs);
    this.onStart();
  }

  pause() {
    if (this.state != "running") {
      return;
    }
    this.state = "paused";
    clearInterval(this.interval);
    this.onPause();
  }

  stop() {
    if (this.state == "stopped") {
      return;
    }
    this.state = "stopped";
    clearInterval(this.interval);
    this.elapsedMs = 0;
    this.onStop();
  }

  setTimeout(timeoutMs) {
    this.timeout = timeoutMs;
    this.onSetTimeout(timeoutMs);
  }

  update() {
    this.elapsedMs += this.updateIntervalMs;
    this.onUpdate();
    if (this.remainingMs == 0) {
      this.stop();
    }
  }
}
