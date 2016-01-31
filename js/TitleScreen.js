
function TitleScreen(context, audio) {
    console.log("TitleScreen::()");
    
    this.initialized = false;
    this.pause = true;
    this.context = context;
    
    audio.playBacking(0);
    
    this.lauchMenu = false;
    
    this.imageFond = new Image();
    this.imageFond.src = "images/ecran_titre.png";
    
    this.button = [];
}

TitleScreen.prototype.init = function () {

    console.log("TitleScreen::init");

    this.initialized = true;

    return this;
};

TitleScreen.prototype.start = function (_levelSelect) {
    
    console.log("TitleScreen::start");
    
    this.pause = false;
        
    this.levelSelect = _levelSelect;

    return this;
};

TitleScreen.prototype.update = function (time, mousePosition) {

    if (this.pause) return;
    
    if (mousePosition.x !== null) {
         this.timeEcran = 0;
        this.pause = true;
        this.lauchMenu = true;
        mousePosition.raz();
    }

};

TitleScreen.prototype.render = function () {
    
    if(this.pause)
        return;
    
    this.context.drawImage(this.imageFond, 0, 0, 1300, 700, 0, 0, 1300, 700);
};