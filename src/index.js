import $ from 'jquery';
import d3 from 'd3';
import styles from './stylesheets/main.scss';
import createSequence from './templates/sequence.hbs';
import metronome from './lib/metronome';

$('.container').append(createSequence({ id: 123 }));

$('.sequence rect').on('click', function () {
  const box = d3.select(this);
  box.classed('on', !box.classed('on'));
});

let i = 0;
metronome(new Date(), 1000, function () {
  const previous = ((i || 16) - 1) % 16;
  const current = i % 16;

  d3.select(`.beat-${previous}`).classed('active', false);
  d3.select(`.beat-${current}`).classed('active', true);

  i++;
});
