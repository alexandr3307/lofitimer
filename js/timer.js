class Timer {
  constructor(updateIntervalMs) {
    this.updateIntervalMs = updateIntervalMs;
    this.interval = null;
    this.elapsedMs = 0;
    this.isRunning = false;

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
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    this.interval = setInterval(this.update.bind(this), this.updateIntervalMs);
    this.onStart();
  }

  pause() {
    if (!this.isRunning) {
      return;
    }
    this.isRunning = false;
    clearInterval(this.interval);
    this.onPause();
  }

  stop() {
    if (!this.isRunning) {
      return;
    }
    this.isRunning = false;
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
