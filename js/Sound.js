function Sound() {

    var backingAudio = new Audio();
    var backingFiles = ["GeishaGoesWrong.wav","GeishaInLove.wav","KatanaGitari.wav"];    
    var backingN = -1;
    
    var soundFilesF = ["cri1.mp3", "cri2.mp3", "cri3.mp3", "cris.mp3"];
    var soundAudioF = new Audio();

    var soundFilesM = ["ouh1.mp3","ouh2.mp3","hein.mp3","hu.mp3"];
    var soundAudioM = new Audio();

    var soundAudioT = new Audio();
    var soundAudioC = new Audio();
    
    var actif = true;
    
    this.playBacking = function(n) {
      //  if(this.actif) {
        if (n != backingN) {
            backingAudio.src = "sounds/" + backingFiles[n];
            backingAudio.loop = true;
            backingAudio.play();
        }
    }     
    
    this.playSoundF = function(n) {
        if(this.actif) {
            if (soundAudioF.ended || soundAudioF.paused) {
                soundAudioF.src = "sounds/" + soundFilesF[n];
                soundAudioF.volume = 0.4;
                soundAudioF.play();
            }
        }
    }

    this.playSoundM = function(n) {
        if(this.actif) {
            if (soundAudioM.ended || soundAudioM.paused) {
                soundAudioM.src = "sounds/" + soundFilesM[n];
                soundAudioM.volume = 0.5;
                soundAudioM.play();
            }
        }
    }

    this.playSoundC = function(n) {
        if(this.actif) {
            soundAudioC.src = "sounds/" + soundFilesM[n];
            soundAudioC.volume = 0.5;
            soundAudioC.play();
        }
    }

    this.playSoundT = function(n) {
        if(this.actif) {
            if (soundAudioT.ended || soundAudioT.paused) {
                soundAudioT.src = "sounds/the.mp3";
                soundAudioT.loop = true;
                soundAudioT.volume = 0.6;
                soundAudioT.play();
            }
        }
    }
    
    this.pauseSoundT = function(n) {
        soundAudioT.pause();
    }
    
    this.muteSound = function() {
        backingAudio.muted = true;
        soundAudioT.muted = true;
        soundAudioC.muted = true;
        soundAudioM.muted = true;
        soundAudioF.muted = true;
        this.actif = false;
    }
    
    this.unMuteSound = function() {
        backingAudio.muted = false;
        soundAudioT.muted = false;
        soundAudioC.muted = false;
        soundAudioM.muted = false;
        soundAudioF.muted = false;
        this.actif = true;
    }

}

