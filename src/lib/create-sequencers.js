import d3 from 'd3';
import registerNote from './register-note';
import masterSequencer from './master-sequencer';
import notes from './notes';

const width = 640;
const height = notes.length * 35 + (notes.length * 10 - 20);

export function createUserSequencer(selector) {

  const container = d3.select(selector);

  const currentUserSequencer = container.append('svg')
                       .attr('width', width)
                       .attr('height', height)
                       .classed('sequencer', true);

  notes.forEach(function (note, index) {
    for (let beat = 0; beat < 16; beat++) {
      let box = currentUserSequencer.append('rect');
      box.attr('x', beat * 40)
         .attr('y', index * 40)
         .attr('width', 35)
         .attr('height', 35)
         .on('click', registerNote.bind(box, note, beat));
      masterSequencer.add(box, beat, note);
    }
  });

  return currentUserSequencer;
}

export function createSocketSequencer(selector, sequence) {

  const svg = d3.select(selector)
                .append('svg')
                .attr('width', width / 2)
                .attr('height', height / 2)
                .classed('sequencer', true);

  notes.forEach(function (note, index) {
    for (let beat = 0; beat < 16; beat++) {
      let box = svg.append('rect');
      box.attr('x', beat / 2 * 40)
         .attr('y', index / 2 * 40)
         .attr('width', 35 / 2)
         .attr('height', 35 / 2)
         .classed('on', sequence[beat][note]);
    }
  });

  return svg;
}
