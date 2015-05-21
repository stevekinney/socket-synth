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
         .classed(`beat-${beat}`, true)
         .on('click', registerNote.bind(box, note, beat));
      masterSequencer.addNote(beat, note);
    }
  });

  return currentUserSequencer;
}

export function createSocketSequencer(selector, sequence, scale = 0.5, callback) {

  const svg = d3.select(selector)
                .append('svg')
                .attr('width', width * scale)
                .attr('height', height * scale)
                .classed('sequencer', true);

  notes.forEach(function (note, index) {
    for (let beat = 0; beat < 16; beat++) {
      let box = svg.append('rect');
      box.attr('x', beat * scale * 40)
         .attr('y', index * scale * 40)
         .attr('width', 35 * scale)
         .attr('height', 35 * scale)
         .classed('on', sequence[beat][note])
         .classed(`beat-${beat}`, true);

     if (typeof callback === 'function') {
       box.on('click', callback.bind(box, note, beat));
     }
    }
  });

  return svg;
}
