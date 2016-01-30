
function Menu(context, audio) {
    console.log("Menu::()");
    
    this.initialized = false;
    this.pause = true;
    this.context = context;
    this.audio = audio;
    
    this.lauchGame = false;
    this.levelSelect = 0;
    
    this.level_button = [];
}

Menu.prototype.init = function () {

    console.log("Menu::init");

    this.initialized = true;

    this.level_button[0] = new Button(this, 200, 200, 60, 60, "1");
    this.level_button[1] = new Button(this, 350, 200, 60, 60, "2");
    this.level_button[2] = new Button(this, 500, 200, 60, 60, "3");
    this.level_button[3] = new Button(this, 650, 200, 60, 60, "4");
    this.level_button[4] = new Button(this, 800, 200, 60, 60, "5");

    return this;
};

Menu.prototype.start = function () {
    
    console.log("Menu::start");
    
    this.pause = false;
    this.lauchGame = false;

    this.audio.playBacking(0);

    return this;
};

Menu.prototype.update = function (time, mousePosition) {

    if (this.pause) return;
    
    for(var i in this.level_button) {
        if(mousePosition != null && this.level_button[i].checkMousePosition(mousePosition))
        {
            this.lauchGame = true;
            this.levelSelect = i;
            this.pause = true;
        }
    }
};

Menu.prototype.render = function () {
    
    if(this.pause)
        return;
    
    for(var i in this.level_button)
        this.level_button[i].render();
};