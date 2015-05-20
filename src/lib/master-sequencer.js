import synthesizer from './synthesizer';

const masterSequencer = {
  elements: {},
  notes: {},

  add(element, beat, note) {
    this.addElement(element, beat);
    this.addNote(beat, note);
  },

  addElement(element, beat) {
    if (!this.elements[beat]) { this.elements[beat] = []; }
    this.elements[beat].push(element);
  },

  addNote(beat, note) {
    if (!this.notes[beat]) { this.notes[beat] = {}; }
    this.notes[beat][note] = this.notes[beat][note] || false;
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

  playNotes(currentBeat, previousBeat) {
    const notes = Object.keys(this.notes[currentBeat]);
    const activeNotes = notes.filter(note => this.notes[currentBeat][note]);
    const inactiveNotes = notes.filter(note => !this.notes[currentBeat][note]);
    activeNotes.forEach(note => synthesizer(note).start());
    inactiveNotes.forEach(note => synthesizer(note).stop());
  }

};

export default masterSequencer;
