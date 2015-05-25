/* globals io */

import _ from 'lodash';
import d3 from 'd3';
import createSequencer from './create-sequencer';
import masterSequencer from './master-sequencer';
import Sequencer from './sequencer';
import getPairsFromSequence from './get-pairs-from-sequence';

export default {
  socket: null,

  connect() {
    const socket = this.socket = io();

    this.socket.on('sequences', (data) => {
      d3.selectAll('.socket-sequencers svg').remove();

      const socketSequences = _.omit(data, socket.id);
      const sequences = _.values(socketSequences);

      if (sequences.length) {
        let users = sequences.length === 1 ? 'user' : 'users';
        document.querySelector('.socket-sequencers')
                .innerHTML = `<p>${sequences.length} other ${users}
                              connected.</p>`;
      } else {
        document.querySelector('.socket-sequencers')
                .innerHTML = `<p>There are no other users connected.
                              Try opening another window to take this thing for
                              a spin.</p>`;
      }

      sequences.forEach(function (sequence) {
        createSequencer('.socket-sequencers', sequence, 0.5);
      });

      const combinedSequences = new Sequencer(...sequences);
      const pairs = getPairsFromSequence(combinedSequences.beats);

      pairs.forEach(([beat, note, value]) => {
        d3.select(`.user-sequencer .beat-${beat}.note-${note}`)
          .classed('socket', !!value);
      });

      masterSequencer.setSocketSequencers(sequences);
    });
  },

  sendSequence(sequence) {
    this.socket.send('sequence', sequence);
  }
};
