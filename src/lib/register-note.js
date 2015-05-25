import masterSequencer from './master-sequencer';

export default function registerNote(note, beat) {
  this.classed('on', !this.classed('on'));
  masterSequencer.userSequencer.update(beat, note);
}
