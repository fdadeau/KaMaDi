
function GameOverScreen(context) {
    console.log("GameOverScreen::()");
    
    this.initialized = false;
    this.pause = true;
    this.context = context;
    
    this.lauchGame = false;
    this.lauchMenu = false;
    this.levelSelect = 0;
    
    this.imageTitre = new Image();
    this.imageTitre.src = "images/image_game_over.png";
    
    this.button = [];
}

GameOverScreen.prototype.init = function () {

    console.log("GameOverScreen::init");

    this.initialized = true;

    this.button[0] = new Button(this, 600, 450, 300, 70, "bouton_test");
    this.button[1] = new Button(this, 600, 550, 300, 70, "bouton_menu_test");
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
    
    if(mousePosition.x != null && this.button[0].checkMousePosition(mousePosition))
    {
        this.lauchGame = true;
        this.pause = true;
        
        mousePosition.raz();
    }
    else if(mousePosition.x != null && this.button[1].checkMousePosition(mousePosition))
    {
        this.lauchMenu = true;
        this.pause = true;
        
        mousePosition.raz();
    }
};

GameOverScreen.prototype.render = function () {
    
    if(this.pause)
        return;
    
    this.context.drawImage(this.imageTitre, 0, 0, 600, 120, 350, 60, 600, 120);
    
    for(var i in this.button)
        this.button[i].render();
};