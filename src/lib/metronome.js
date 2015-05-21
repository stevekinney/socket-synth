import d3 from 'd3';
import masterSequencer from './master-sequencer';

export default function () {
  let i = 0;

  tick(new Date(), 500, function () {
    const previous = ((i || 16) - 1) % 16;
    const current = i % 16;

    d3.selectAll(`.beat-${current}`).classed('active', true);
    d3.selectAll(`.beat-${previous}`).classed('active', false);

    masterSequencer.playNotes(current, previous);

    i++;
  });
}

export function tick(start, duration, callback, nextBeat) {
  var next = nextBeat || new Date(start.getTime() + duration);
  if (new Date() >= next) {
    if (typeof callback === 'function') { callback(); }
    requestAnimationFrame(tick.bind(null, next, duration, callback, null));
  } else {
    requestAnimationFrame(tick.bind(null, start, duration, callback, next));
  }
}
