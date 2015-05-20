import _ from 'lodash';
import oscillators from './oscillators';
import socket from './socket-connection';
import notes from './notes';

const masterSequencer = {
  elements: {},
  userSequencer: {},

  add(element, beat, note) {
    this.addElement(element, beat);
    this.addNote(beat, note);
  },

  addElement(element, beat) {
    if (!this.elements[beat]) { this.elements[beat] = []; }
    this.elements[beat].push(element);
  },

  addNote(beat, note) {
    if (!this.userSequencer[beat]) { this.userSequencer[beat] = {}; }
    this.userSequencer[beat][note] = this.userSequencer[beat][note] || false;
  },

  addSocketSequences(sequences) {
    const socketSequences = {};
    for (let i = 0; i < 16; i++) {
      socketSequences[i] = {};
      notes.forEach(function () {
        socketSequences[i] = false;
      });
    }
    console.log(socketSequences);
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
    return this.userSequencer[beat][note];
  },

  update(beat, note) {
    this.userSequencer[beat][note] = !this.userSequencer[beat][note];
    socket.sendSequence(this.userSequencer);
  },

  playNotes(currentBeat, previousBeat) {
    const notes = Object.keys(this.userSequencer[currentBeat]);
    const activeNotes = notes.filter(note => this.userSequencer[currentBeat][note]);
    const inactiveNotes = notes.filter(note => !this.userSequencer[currentBeat][note]);
    activeNotes.forEach(note => oscillators(note).start());
    inactiveNotes.forEach(note => oscillators(note).stop());
  }

};

export default masterSequencer;
