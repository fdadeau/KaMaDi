
function Menu(context, audio) {
    console.log("Menu::()");
    
    this.initialized = false;
    this.pause = true;
    this.context = context;
    this.audio = audio;
    
    this.lauchGame = false;
    this.levelSelect = 0;
    
    this.level_button = [];
    
    this.audio.actif = true;

    this.buttonAudio = null;
}

Menu.prototype.init = function () {

    console.log("Menu::init");

    this.initialized = true;
    
    this.level_button[0] = new Button(this, 400, 200, 70, 70, "menu_1");
    this.level_button[1] = new Button(this, 600, 200, 70, 70, "menu_2");
    this.level_button[2] = new Button(this, 800, 200, 70, 70, "menu_3");
    
    this.level_button[3] = new Button(this, 400, 350, 70, 70, "menu_4");
    this.level_button[4] = new Button(this, 600, 350, 70, 70, "menu_5");
    this.level_button[5] = new Button(this, 800, 350, 70, 70, "menu_5");
    
    this.level_button[6] = new Button(this, 400, 500, 70, 70, "menu_5");
    this.level_button[7] = new Button(this, 600, 500, 70, 70, "menu_5");
    this.level_button[8] = new Button(this, 800, 500, 70, 70, "menu_5");
    
    return this;
};

Menu.prototype.start = function () {
    
    console.log("Menu::start");
    
    this.pause = false;
    this.lauchGame = false;

    this.audio.playBacking(0);
    
    if(this.audio.actif) {
        this.buttonAudio = new Button(this, 1250, 25, 34, 34, "son_actif");
    }
    else {
        this.buttonAudio = new Button(this, 1250, 25, 34, 34, "son_inactif");
    }
    
    return this;
};

Menu.prototype.gestionClickImageAudio = function()
{
    
}

Menu.prototype.update = function (time, mousePosition) {

    if (this.pause) return;
    
    for(var i in this.level_button) {
        if(mousePosition.x != null && this.level_button[i].checkMousePosition(mousePosition))
        {
            this.lauchGame = true;
            this.levelSelect = i;
            this.pause = true;
            
            mousePosition.raz();
        }
    }
    
    // MOUSE POSITION != null
    if(mousePosition.x != null && this.buttonAudio.checkMousePosition(mousePosition)) {
        
        if(this.audio.actif) {
            
            //this.audio.stopSound();
            this.audio.muteSound();
            this.buttonAudio = new Button(this, 1250, 25, 34, 34, "son_inactif");
        }
        else {
            this.buttonAudio = new Button(this, 1250, 25, 34, 34, "son_actif");
            //this.audio.actif = true;
            this.audio.unMuteSound();
        }
        mousePosition.raz();
    }
};

Menu.prototype.render = function () {
    
    if(this.pause)
        return;
    
    this.buttonAudio.render();
    
    for(var i in this.level_button)
        this.level_button[i].render();
};