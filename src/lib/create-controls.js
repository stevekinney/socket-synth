import $ from 'jquery';
import { muteMasterVolume, unmuteMasterVolume } from './volume';

export default function(selector) {
  const $controls = $(selector);
  $controls.append(muteButton);
}

const muteButton = $('<button></button>')
                     .text('Mute')
                     .addClass('mute off')
                     .on('click', function () {
                       const $this = $(this);
                       $this.toggleClass('off');
                       $('.user-sequencer').toggleClass('mute');

                       if ($this.hasClass('off')) {
                         $this.text('Mute');
                         unmuteMasterVolume();
                       } else {
                         $this.text('Unmute');
                         muteMasterVolume();
                       }
                     });
