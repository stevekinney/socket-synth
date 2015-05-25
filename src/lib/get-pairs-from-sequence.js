import _ from 'lodash';

export default function (beats) {

  return _(beats)
    .mapValues(_.pairs)
    .pairs()
    .map(([beat, notes]) => notes.map(note => _.flatten([beat, note])))
    .flatten()
    .value();
}
