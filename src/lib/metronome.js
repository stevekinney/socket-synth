import masterSequencer from './master-sequencer';

export function tick(start, duration, callback, nextBeat) {
  var next = nextBeat || new Date(start.getTime() + duration);
  if (new Date() >= next) {
    if (typeof callback === 'function') { callback(); }
    requestAnimationFrame(tick.bind(null, next, duration, callback, null));
  } else {
    requestAnimationFrame(tick.bind(null, start, duration, callback, next));
  }
}

let i = 0;
export default tick(new Date(), 500, function () {
  const previous = ((i || 16) - 1) % 16;
  const current = i % 16;

  masterSequencer[current].forEach(function (box) {
    box.classed('active', true);
  });

  masterSequencer[previous].forEach(function (box) {
    box.classed('active', false);
  });

  i++;
});
