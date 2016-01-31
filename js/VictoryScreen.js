
function VictoryScreen(context) {
    console.log("VictoryScreen::()");
    
    this.initialized = false;
    this.pause = true;
    this.context = context;
    
    this.lauchGame = false;
    this.lauchMenu = false;
    this.levelSelect = 0;
    
    this.imageFond = new Image();
    this.imageFond.src = "images/victoire.png";
    
    this.button = [];
}

VictoryScreen.prototype.init = function () {

    console.log("VictoryScreen::init");

    this.initialized = true;

    this.button[0] = new Button(this, 650, 540, 300, 70, "niveau_suivant");
    this.button[1] = new Button(this, 650, 640, 300, 70, "lien_menu");
    return this;
};

VictoryScreen.prototype.start = function (_levelSelect) {
    
    console.log("VictoryScreen::start");
    
    this.pause = false;
    
    this.levelSelect = _levelSelect;

    return this;
};

VictoryScreen.prototype.update = function (time, mousePosition) {

    if (this.pause) return;
    
    if(mousePosition.x != null && this.button[0].checkMousePosition(mousePosition))
    {
        this.lauchGame = true;
        
        if(this.levelSelect < 8)
            this.levelSelect ++;
        
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

VictoryScreen.prototype.render = function () {
    
    if(this.pause)
        return;
    
    this.context.drawImage(this.imageFond, 0, 0, 1300, 700, 0, 0, 1300, 700);
    
    for(var i in this.button)
        this.button[i].render();
};