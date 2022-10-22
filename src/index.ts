function _toFixedFloat(number: number) {
  return Math.round(number * 100) / 100;
}

function _parseTime(milliseconds: number) {
  return new Date(milliseconds).toISOString().slice(11, 22).split(/\D/);
}

export interface StopwatchConfig {
  startImmediately: boolean,
  displayHours: boolean;
  displaySeparator: string;
}

export default class Stopwatch {
  public config: StopwatchConfig = {
    startImmediately: false,
    displayHours: false,
    displaySeparator: ':',
  };

  private _running = false;
  private _paused = false;
  private _startStamp: number | null = null;
  private _pauseStamp: number | null = null;
  private _pauseDiffs: number[] = [];

  constructor(config: Partial<StopwatchConfig> = {}) {
    this.config = { ...this.config, ...config };

    if (this.config.startImmediately) {
      this.play();
    }
  }

  get isRunning() {
    return this._running;
  }

  get isPaused() {
    return this._paused;
  }

  get totalMilliseconds() {
    if (!this._startStamp) {
      return 0;
    }

    const endStamp = this._pauseDiffs.reduce(
      (stamp, diff) => stamp - diff,
      this._pauseStamp || Date.now()
    );

    return endStamp - this._startStamp;
  }

  get totalSeconds() {
    return _toFixedFloat(this.totalMilliseconds / 1000);
  }

  get totalMinutes() {
    return _toFixedFloat(this.totalMilliseconds / (1000 * 60));
  }

  get totalHours() {
    return _toFixedFloat(this.totalMilliseconds / (1000 * 60 * 60));
  }

  get state() {
    const [hours, minutes, seconds, milliseconds] = _parseTime(
      this.totalMilliseconds
    ).map((value) => parseInt(value, 10));

    return { hours, minutes, seconds, milliseconds };
  }

  get display() {
    const values = _parseTime(this.totalMilliseconds).slice(
      this.config.displayHours ? 0 : 1
    );

    return values.join(this.config.displaySeparator);
  }

  play = () => {
    if (!this.isRunning && !this.isPaused) {
      this._startStamp = Date.now();
      this._running = true;
      return;
    }

    if (!this.isRunning && this.isPaused && !!this._pauseStamp) {
      this._pauseDiffs.push(Date.now() - this._pauseStamp);
      this._pauseStamp = null;
      this._running = true;
      this._paused = false;
    }
  };

  stop = () => {
    if (!this.isRunning || this.isPaused) {
      return;
    }

    this._pauseStamp = Date.now();
    this._running = false;
    this._paused = true;
  };

  toggle = () => {
    if (!this.isRunning) {
      this.play();
    } else {
      this.stop();
    }
  };

  reset = () => {
    this._running = false;
    this._paused = false;
    this._startStamp = null;
    this._pauseStamp = null;
    this._pauseDiffs = [];
  };
}
