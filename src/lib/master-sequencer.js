import _ from 'lodash';
import oscillators from './oscillators';
import Sequencer from './sequencer';
import notes from './notes';

const masterSequencer = {
  userSequencer: new Sequencer(),
  socketSequencers: new Sequencer(),

  setSocketSequencers(sequences) {
    this.socketSequencers = new Sequencer(...sequences);
  },

  playNotes(currentBeat, previousBeat) {
    const combinedSequencer = new Sequencer(...[this.socketSequencers.beats, this.userSequencer.beats]);

    const notes = Object.keys(combinedSequencer.beats[currentBeat]);

    const activeNotes = notes.filter(note => combinedSequencer.beats[currentBeat][note]);
    const inactiveNotes = notes.filter(note => !combinedSequencer.beats[currentBeat][note]);

    activeNotes.forEach(note => oscillators(note).start());
    inactiveNotes.forEach(note => oscillators(note).stop());
  }

};

export default masterSequencer;
