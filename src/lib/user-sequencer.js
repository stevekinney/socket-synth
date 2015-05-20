import d3 from 'd3';
import container from './container';
import registerNote from './register-note';
import beatTracker from './beat-tracker';
import notes from './notes';

const width = 640;
const height = 110;

const currentUserSequencer = container.append('svg')
                     .attr('width', width)
                     .attr('height', height);

notes.forEach(function (note, index) {
  for (let beat = 0; beat < 16; beat++) {
    let box = currentUserSequencer.append('rect')
       .attr('x', beat * 40)
       .attr('y', index * 40)
       .attr('width', 20)
       .attr('height', 20)
       .attr('fill', '#999')
       .on('click', function () {
         registerNote.call(this, socket, note, beat);
       });
    beatTracker.add(box, beat);
  }
});

export default currentUserSequencer;
