import createControls from './lib/create-controls';
import createSequencer from './lib/create-sequencer';
import masterSequencer from './lib/master-sequencer';
import registerNote from './lib/register-note';
import socket from './lib/socket-connection';
import startMetronome from './lib/metronome';
import styles from './stylesheets/main.scss';

createSequencer('.user-sequencer', masterSequencer.userSequencer, 1, registerNote);

createControls('.controls');
startMetronome();
socket.connect();
