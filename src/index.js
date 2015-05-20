import styles from './stylesheets/main.scss';
import createUserSequencer from './lib/create-user-sequencer';
import createControls from './lib/create-controls';
import startMetronome from './lib/metronome';

createUserSequencer('.user-sequencer');
createControls('.controls');
startMetronome();
