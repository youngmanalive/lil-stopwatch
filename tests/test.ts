import Stopwatch from '../src';
import MockDateHelper from './mock';

describe('Stopwatch', () => {
  let time: MockDateHelper;

  beforeEach(() => {
    time = new MockDateHelper();
  });

  afterEach(() => {
    time.reset();
    time = null!;
  });

  it('tracks the elapsed time', () => {
    const stopwatch = new Stopwatch();

    stopwatch.play();
    time.addMs(12345);

    expect(stopwatch.totalMilliseconds).toEqual(12345);
  });

  it('has total elapsed time getters', () => {
    const stopwatch = new Stopwatch();

    expect(stopwatch.totalMilliseconds).toEqual(0);

    stopwatch.play();

    time.addMs(1000);
    expect(stopwatch.totalMilliseconds).toEqual(1000);
    expect(stopwatch.totalSeconds).toEqual(1);

    time.addSec(29);
    expect(stopwatch.totalMinutes).toEqual(0.5);
    time.addSec(30);
    expect(stopwatch.totalMinutes).toEqual(1);

    time.addMin(59);
    expect(stopwatch.totalHours).toEqual(1);
    expect(stopwatch.totalMilliseconds).toEqual(1000 * 60 * 60);
  });

  it('has a `state` getter', () => {
    const stopwatch = new Stopwatch();

    stopwatch.play();
    time.addHour(5).addMin(4).addSec(3).addMs(210);

    expect(stopwatch.state).toStrictEqual({
      hours: 5,
      minutes: 4,
      seconds: 3,
      milliseconds: 21,
    });
  });

  it('can be paused', () => {
    const stopwatch = new Stopwatch();
    expect(stopwatch.isPaused).toBe(false);

    stopwatch.play();
    time.addSec(2);
    stopwatch.stop();

    expect(stopwatch.isPaused).toBe(true);
    expect(stopwatch.totalSeconds).toEqual(2);

    time.addSec(2);
    expect(stopwatch.totalSeconds).toEqual(2);

    stopwatch.play();
    time.addSec(2);

    expect(stopwatch.totalSeconds).toEqual(4);
  });

  it('can be reset', () => {
    const stopwatch = new Stopwatch();

    stopwatch.play();
    expect(stopwatch.isRunning).toBe(true);
    expect(stopwatch.totalMilliseconds).toEqual(0);

    time.addMs(350);
    expect(stopwatch.totalMilliseconds).toEqual(350);

    stopwatch.reset();
    expect(stopwatch.isRunning).toBe(false);
    expect(stopwatch.totalMilliseconds).toEqual(0);
  });

  it('starts immediately when configured', () => {
    const stopwatch = new Stopwatch({ startImmediately: true });

    expect(stopwatch.isRunning).toBe(true);
    time.addSec(1);
    expect(stopwatch.totalMilliseconds).toBeGreaterThan(0);
  });

  it('displays the elapsed time', () => {
    const stopwatch = new Stopwatch({
      startImmediately: true,
      displayHours: true,
    });

    expect(stopwatch.display).toEqual('00:00:00:00');
    time.addHour(5).addMin(4).addSec(3).addMs(210);
    expect(stopwatch.display).toEqual('05:04:03:21');
  });

  it('does not display hours by default', () => {
    const stopwatch = new Stopwatch();
    expect(stopwatch.display).toEqual('00:00:00');
  });

  it('has a configurable display separator', () => {
    const stopwatch = new Stopwatch({ displaySeparator: '_' });
    expect(stopwatch.display).toEqual('00_00_00');
  });

  it('has a toggle functionality', () => {
    const stopwatch = new Stopwatch();
    expect(stopwatch.isRunning).toBe(false);
    stopwatch.toggle();
    expect(stopwatch.isRunning).toBe(true);
    stopwatch.toggle();
    expect(stopwatch.isRunning).toBe(false);
  });
});
