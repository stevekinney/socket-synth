import _ from 'lodash';
import notes from './notes';

export default class Sequencer {
  constructor(...sequences) {
    this.beats = {};
    _.times(16, i => {
      this.beats[i] = new Beat();
      if (sequences) {
        this.beats[i] = _.assign(this.beats[i], ...sequences.map(s => s[i]));
      }
    });
  }
}

export class Beat {
  constructor() {
    notes.forEach(note => this[note] = false);
  }
}
