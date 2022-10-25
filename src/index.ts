export interface StopwatchConfig {
  startImmediately: boolean;
  displayHours: boolean;
  displaySeparator: string;
  displayMsPrecision: 1 | 2 | 3;
}

export interface StopwatchState {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export default class Stopwatch {
  public config: StopwatchConfig = {
    startImmediately: false,
    displayHours: false,
    displaySeparator: ':',
    displayMsPrecision: 2,
  };

  private _startStamp: number | null = null;
  private _pauseStamp: number | null = null;

  constructor(config: Partial<StopwatchConfig> = {}) {
    this.config = { ...this.config, ...config };

    if (this.config.startImmediately) {
      this.play();
    }
  }

  get isRunning() {
    return !!this._startStamp && !this._pauseStamp;
  }

  get isPaused() {
    return !!this._pauseStamp;
  }

  get totalMilliseconds() {
    return this._startStamp
      ? (this._pauseStamp || Date.now()) - this._startStamp
      : 0;
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

  get state(): StopwatchState {
    const [hours, minutes, seconds, milliseconds] = _parseTime(
      this.totalMilliseconds
    ).map((value) => parseInt(value, 10));

    return { hours, minutes, seconds, milliseconds };
  }

  get display() {
    const display = _parseTime(this.totalMilliseconds)
      .slice(this.config.displayHours ? 0 : 1)
      .join(this.config.displaySeparator);

    return display.slice(
      0,
      display.length -
        (3 - Math.max(1, Math.min(3, this.config.displayMsPrecision)))
    );
  }

  play = () => {
    if (this.isPaused) {
      this._startStamp! += Date.now() - this._pauseStamp!;
      this._pauseStamp = null;
      return;
    }

    if (!this.isRunning) {
      this._startStamp = Date.now();
    }
  };

  stop = () => {
    if (!this.isRunning || this.isPaused) {
      return;
    }

    this._pauseStamp = Date.now();
  };

  toggle = () => {
    if (!this.isRunning) {
      this.play();
    } else {
      this.stop();
    }
  };

  reset = () => {
    this._startStamp = null;
    this._pauseStamp = null;
  };
}

function _toFixedFloat(number: number) {
  return Math.round(number * 100) / 100;
}

function _parseTime(milliseconds: number) {
  return new Date(milliseconds).toISOString().slice(11, 23).split(/\D/);
}
