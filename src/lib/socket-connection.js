/* globals io */

import _ from 'lodash';
import { createSocketSequencer } from './create-sequencers';
import masterSequencer from './master-sequencer';

export default {
  socket: null,

  connect() {
    const socket = this.socket = io();

    this.socket.on('sequences', (sequences) => {
      d3.selectAll('.socket-sequencers svg').remove();

      const socketSequences = _.omit(sequences, socket.id);
      const sequencers = _.values(socketSequences);

      sequencers.forEach(function (sequencer) {
        createSocketSequencer('.socket-sequencers', sequencer);
      });

      masterSequencer.setSocketSequencers(sequencers);
    });
  },

  sendSequence(sequence) {
    this.socket.send('sequence', sequence);
  }
};
