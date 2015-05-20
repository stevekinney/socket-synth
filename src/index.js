import styles from './stylesheets/main.scss';
import createControls from './lib/create-controls';
import startMetronome from './lib/metronome';
import socket from './lib/socket-connection';

import { createUserSequencer } from './lib/create-sequencers';

createUserSequencer('.user-sequencer');
createControls('.controls');
startMetronome();
socket.connect();
