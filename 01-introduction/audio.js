"use strict";

window.addEventListener('load', function(){
    
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    const audioContext = new AudioContext();

    const btn = document.querySelector('#btnPlayPause');
    const btnText = document.querySelector('#btnPlayPause span');

    // get audio DOM
    const audioTrack = document.querySelector('audio');

    // pass it to audio context
    const track = audioContext.createMediaElementSource(audioTrack);

    // connect audio track to audiocontext destination
    track.connect(audioContext.destination);

    // handle button click events
    btn.addEventListener('click', function(){

        // check if audio context is suspended
        if(audioContext.state === 'suspended'){
            audioContext.resume();
        }

        // play or pause track based on button toggle
        if(this.dataset.playing === 'false'){

            audioTrack.play();
            this.dataset.playing = 'true';
            btnText.innerHTML = 'Pause';
            document.body.style.background = '#222';

        }else if (this.dataset.playing === 'true'){

            audioTrack.pause();
            this.dataset.playing = 'false';
            btnText.innerHTML = 'Play';
            document.body.style.background = '#eee';

        }
    });

    // check if audio has finished playing;
    audioTrack.addEventListener('ended', function(){
        btn.dataset.playing = 'false';
    });
});