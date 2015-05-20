import context from './audio-context.js';

const masterVolume = context.createGain();
masterVolume.connect(context.destination);

export default masterVolume;

export function muteMasterVolume() {
  masterVolume.gain.value = 0;
}

export function unmuteMasterVolume() {
  masterVolume.gain.value = 1;
}
