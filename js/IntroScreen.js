
function IntroScreen(context) {
    console.log("IntroScreen::()");
    
    this.initialized = false;
    this.pause = true;
    this.context = context;
    
    this.lauchMenu = false;
    this.tempsEcran = 1000 * 20;
    this.timeEcran = 0;
    
    this.imageFond = new Image();
    this.imageFond.src = "images/ecran_intro.png";
    
    this.button = [];
}

IntroScreen.prototype.init = function () {

    console.log("IntroScreen::init");

    this.initialized = true;

    return this;
};

IntroScreen.prototype.start = function (_levelSelect) {
    
    console.log("TitleScreen::start");
    
    this.pause = false;
    
    this.timeEcran = 0;
    
    this.levelSelect = _levelSelect;

    return this;
};

IntroScreen.prototype.update = function (time, mousePosition) {

    if (this.pause) return;
    
    this.timeEcran += time.tick;
    if(this.timeEcran >= this.tempsEcran)
    {
        this.timeEcran = 0;
        this.pause = true;
        this.lauchMenu = true;
    }
};

IntroScreen.prototype.render = function () {
    
    if(this.pause)
        return;
    
    this.context.drawImage(this.imageFond, 0, 0, 1300, 700, 0, 0, 1300, 700);
};