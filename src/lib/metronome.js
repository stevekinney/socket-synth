import d3 from 'd3';
import masterSequencer from './master-sequencer';

export default function () {
  let i = 0;

  getBeat(function () {
    const previous = ((i || 16) - 1) % 16;
    const current = i % 16;

    d3.selectAll(`.beat-${current}`).classed('active', true);
    d3.selectAll(`.beat-${previous}`).classed('active', false);

    masterSequencer.playNotes(current, previous);

    i++;
  });
}

export function getBeat(callback, current) {
  const beat = Math.floor(((new Date()).getTime() / 500 % 16));
  if (beat !== current && typeof callback === 'function') { callback(); }
  window.requestAnimationFrame(getBeat.bind(null, callback, beat));
}
