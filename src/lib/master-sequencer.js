import _ from 'lodash';
import oscillators from './oscillators';
import socket from './socket-connection';
import Sequencer from './sequencer';
import notes from './notes';

const masterSequencer = {
  elements: {},
  userSequencer: new Sequencer(),
  socketSequencers: new Sequencer(),

  add(element, beat, note) {
    this.addElement(element, beat);
    this.addNote(beat, note);
  },

  addElement(element, beat) {
    if (!this.elements[beat]) { this.elements[beat] = []; }
    this.elements[beat].push(element);
  },

  addNote(beat, note) {
    if (!this.userSequencer.beats[beat]) { this.userSequencer.beats[beat] = {}; }
    this.userSequencer.beats[beat][note] = this.userSequencer.beats[beat][note];
  },

  setSocketSequencers(sequences) {
    this.socketSequencers = new Sequencer(sequences);
  },

  activateElements(beat) {
    this.elements[beat].forEach(function (box) {
      box.classed('active', true);
    });
  },

  deactivateElements(beat) {
    this.elements[beat].forEach(function (box) {
      box.classed('active', false);
    });
  },

  get(beat, note) {
    return this.userSequencer.beats[beat][note];
  },

  update(beat, note) {
    this.userSequencer.beats[beat][note] = !this.userSequencer.beats[beat][note];
    socket.sendSequence(this.userSequencer.beats);
  },

  playNotes(currentBeat, previousBeat) {
    const combinedSequencer = new Sequencer([this.socketSequencers.beats, this.userSequencer.beats]);

    const notes = Object.keys(combinedSequencer.beats[currentBeat]);

    const activeNotes = notes.filter(note => combinedSequencer.beats[currentBeat][note]);
    const inactiveNotes = notes.filter(note => !combinedSequencer.beats[currentBeat][note]);

    activeNotes.forEach(note => oscillators(note).start());
    inactiveNotes.forEach(note => oscillators(note).stop());
  }

};

export default masterSequencer;
