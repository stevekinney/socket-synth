import d3 from 'd3';
import masterSequencer from './master-sequencer';

export default function () {
  getBeat(function (beat) {
    const previous = ((beat || 16) - 1) % 16;

    d3.selectAll(`.beat-${beat}`).classed('active', true);
    d3.selectAll(`.beat-${previous}`).classed('active', false);

    masterSequencer.playNotes(beat, previous);
  });
}

export function getBeat(callback) {
  const beat = Math.floor(((new Date()).getTime() / 500 % 16));
  if (typeof callback === 'function') { callback(beat); }
  window.requestAnimationFrame(getBeat.bind(null, callback, beat));
}
