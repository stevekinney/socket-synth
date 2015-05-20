import $ from 'jquery';
import sequenceDiagram from '../templates/sequence.svg';

const svg = $('<svg></svg>')
  .attr('width', '1260px')
  .attr('height', '60px')
  .attr('viewBox', '0 0 1260 60')
  .append(sequenceDiagram);


export default function () {
  console.log(svg.clone());
  return svg.clone();
}
