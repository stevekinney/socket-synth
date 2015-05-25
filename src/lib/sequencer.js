import _ from 'lodash';
import socket from './socket-connection';
import notes from './notes';

export default class Sequencer {
  constructor(...sequences) {
    this.beats = {};
    _.times(16, i => {
      this.beats[i] = new Beat();
      if (sequences && sequences.length) {
        this.beats[i] = _.merge(this.beats[i], ...sequences.map(s => s[i]));
      }
    });
  }

  update(beat, note) {
    this.beats[beat][note] = !this.beats[beat][note];
    socket.sendSequence(this.beats);
  }
}

export class Beat {
  constructor() {
    notes.forEach(note => this[note] = undefined);
  }
}
