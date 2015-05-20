export default function increment(start, duration, callback, nextBeat) {
  var next = nextBeat || new Date(start.getTime() + duration);
  if (new Date() >= next) {
    if (typeof callback === 'function') { callback(); }
    requestAnimationFrame(increment.bind(null, next, duration, callback, null));
  } else {
    requestAnimationFrame(increment.bind(null, start, duration, callback, next));
  }
}
