import d3 from 'd3';
import registerNote from './register-note';
import masterSequencer from './master-sequencer';
import notes from './notes';

function createUserSequencer(selector) {
  const width = 640;
  const height = notes.length * 35 + (notes.length * 10 - 20);

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
         .attr('fill', '#999')
         .on('click', registerNote.bind(box, note, beat));
      masterSequencer.add(box, beat, note);
    }
  });

  return currentUserSequencer;
}

export default createUserSequencer;
