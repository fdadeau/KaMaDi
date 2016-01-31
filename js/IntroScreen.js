
function IntroScreen(context) {
    console.log("IntroScreen::()");
    
    this.initialized = false;
    this.pause = true;
    this.context = context;
    
    this.lauchMenu = false;
    
    this.rules = false;
    this.credit = false;
    
    this.imageFond = new Image();
    this.imageFond.src = "images/ecran_intro.png";
    
    this.imageRules = new Image();
    this.imageRules.src = "images/regles.png";
    
    this.imageCredit = new Image();
    this.imageCredit.src = "images/credit.png";
    
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
    
    this.levelSelect = _levelSelect;

    return this;
};

IntroScreen.prototype.update = function (time, mousePosition) {
    
    if (this.pause) return;
    
    if (mousePosition.x !== null) {
        
        if(this.credit) {
            this.timeEcran = 0;
            this.pause = true;
            this.lauchMenu = true;
        }
        else if (this.rules) {
            this.rules = false;
            this.credit = true;
        }
        else {
            this.rules = true;
        }
        mousePosition.raz();
    }
};

IntroScreen.prototype.render = function () {
    
    if(this.pause)
        return;
    
    if (this.credit) {
        this.context.drawImage(this.imageCredit, 0, 0, 1300, 700, 0, 0, 1300, 700);
    }
    else
    {
        this.context.drawImage(this.imageFond, 0, 0, 1300, 700, 0, 0, 1300, 700);

        if (this.rules) {
            this.context.drawImage(this.imageRules, 0, 0, 380, 600, 910, 60, 380, 600);
        }
    }
};