import Octavian from 'octavian';

import context from './audio-context';
import masterVolume from './volume';
import Synthesizer from './synthesizer';

const notes = {};

export default function (note) {
  const frequency = new Octavian.Note(note).frequency;
  if (!notes[frequency]) { notes[frequency] = new Synthesizer(frequency, masterVolume); }
  return notes[frequency];
}
