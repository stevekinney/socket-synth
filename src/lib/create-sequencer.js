import d3 from 'd3';
import notes from './notes';

const width = 640;
const height = notes.length * 35 + (notes.length * 10 - 20);

export default function (selector, sequence, scale = 1, binding = null, callback = null) {

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
         .classed('on', sequence[beat] && sequence[beat][note])
         .classed(`beat-${beat}`, true)
         .classed(`note-${note}`, true);

     if (typeof binding === 'function') {
       box.on('click', binding.bind(box, note, beat));
     }

     if (typeof callback === 'function') {
       callback.call(box, beat, note, sequence);
     }
    }
  });

  return svg;
}

