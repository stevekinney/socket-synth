import d3 from 'd3';
import container from './container';
import registerNote from './register-note';
import masterSequencer from './master-sequencer';
import notes from './notes';

const width = 640;
const height = notes.length * 30 + (notes.length * 10 - 20);

const currentUserSequencer = container.append('svg')
                     .attr('width', width)
                     .attr('height', height);

notes.forEach(function (note, index) {
  for (let beat = 0; beat < 16; beat++) {
    let box = currentUserSequencer.append('rect');
    box.attr('x', beat * 40)
       .attr('y', index * 40)
       .attr('width', 20)
       .attr('height', 20)
       .attr('fill', '#999')
       .on('click', registerNote.bind(box, note, beat));
    masterSequencer.add(box, beat, note);
  }
});

export default currentUserSequencer;
