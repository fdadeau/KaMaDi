
function GameOverScreen(context) {
    console.log("GameOverScreen::()");
    
    this.initialized = false;
    this.pause = true;
    this.context = context;
    
    this.lauchGame = false;
    this.lauchMenu = false;
    this.levelSelect = 0;
    
    this.button = [];
}

GameOverScreen.prototype.init = function () {

    console.log("GameOverScreen::init");

    this.initialized = true;

    this.button[0] = new Button(this, 600, 450, 140, 60);
    this.button[1] = new Button(this, 600, 550, 140, 60);
    return this;
};

GameOverScreen.prototype.start = function (_levelSelect) {
    
    console.log("GameOverScreen::start");
    
    this.pause = false;
    
    this.levelSelect = _levelSelect;

    return this;
};

GameOverScreen.prototype.update = function (time, mousePosition) {

    if (this.pause) return;
    
    if(mousePosition != null && this.button[0].checkMousePosition(mousePosition))
    {
        this.lauchGame = true;
        this.pause = true;
    }
    else if(mousePosition != null && this.button[1].checkMousePosition(mousePosition))
    {
        this.lauchMenu = true;
        this.pause = true;
    }
};

GameOverScreen.prototype.render = function () {
    
    if(this.pause)
        return;
    
    for(var i in this.button)
        this.button[i].render();
};