# `lil-stopwatch`

### A lightweight lil stopwatch ⏱

Zero-dependency stopwatch using timestamps. This does not implement intervals or "ticking", the utility simply provides the elapsed time when you need it. The rest is up to you.


```html
<div id="stopwatch">00:00:00</div>
```

```js
import Stopwatch from 'lil-stopwatch';

const stopwatch = new Stopwatch();

const container = document.getElementById('stopwatch');
container.onclick = () => stopwatch.toggle();

setTimeout(() => {
  container.innerText = stopwatch.display;
}, 50);
```

## API
```js
const stopwatch = new Stopwatch({ ...options });
```
name | description
--- | ---
constructor options | {<br>`startImmediately`: `boolean` (default `false`),<br>`displayHours`: `boolean` (default `false`),<br>`displaySeparator`: `string` (default `':'`)<br>}
`play()` | start the timer
`stop()` | stop/pause the timer
`toggle()` | toggle between stop and play
`reset()` | clear the current state and stop the timer
`state` | {<br>`hours`, `minutes`, `seconds`, `milliseconds`<br>}
`display` | `string` - `'00:00:00'`
`isRunning` | `bool` - specifies if the stopwatch is currently running
`isPaused` | `bool` - specifies if the stopwatch is paused or stopped
`totalMilliseconds` | `float` - total elapsed milliseconds
`totalSeconds` | `float` - total elapsed seconds
`totalMinutes` | `float` - total elapsed minutes
`totalHours` | `float` - total elapsed hours
