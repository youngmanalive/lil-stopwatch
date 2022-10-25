import MockDate from 'mockdate';

export default class MockDateHelper {
  current = new Date('2000-01-01T00:00:00.000Z');

  constructor() {
    MockDate.set(this.current);
  }

  addMs = (ms: number) => {
    const currentMs = this.current.getMilliseconds();
    this.current.setMilliseconds(currentMs + ms);
    MockDate.set(this.current);
    return this;
  };

  addSec = (s: number) => this.addMs(s * 1000);

  addMin = (m: number) => this.addSec(m * 60);

  addHour = (h: number) => this.addMin(h * 60);

  reset = () => {
    MockDate.reset();
  };
}
