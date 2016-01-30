function Sound() {

    var backingAudio = new Audio();
    var backingFiles = ["GeishaGoesWrong.wav","GeishaInLove.wav","KatanaGitari.wav"];    
    var backingCurrent = 0;    
    
    var soundFilesF = ["cri1.mp3", "cri2.mp3", "cri3.mp3", "cris.mp3"];
    var soundAudioF = new Audio();
    var soundCurrentF = 0;

    var soundFilesM = ["coup1.mp3","coup2.mp3"];
    var soundAudioM = new Audio();
    var soundCurrentM = 0;
    
    this.playBacking = function(n) {
        backingCurrent = n;
        backingAudio.src = "sounds/" + backingFiles[backingCurrent];
        backingAudio.loop = true;
        backingAudio.play();
    }     
    
    this.playSoundF = function(n) {
        if (soundAudioF.ended || soundAudioF.paused) {
            soundCurrentF = n;
            soundAudioF.src = "sounds/" + soundFilesF[soundCurrentF];
            soundAudioF.play();
        }
    }

    this.playSoundM = function(n) {
        if (soundAudioM.ended || soundAudioM.paused) {
            soundCurrentM = n;
            soundAudioM.src = "sounds/" + soundFilesM[soundCurrentM];
            soundAudioM.play();
        }
    }

}

