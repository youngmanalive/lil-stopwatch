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
