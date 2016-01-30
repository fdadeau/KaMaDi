
function VictoryScreen(context) {
    console.log("VictoryScreen::()");
    
    this.initialized = false;
    this.pause = true;
    this.context = context;
    
    this.lauchGame = false;
    this.lauchMenu = false;
    this.levelSelect = 0;
    
    this.button = [];
}

VictoryScreen.prototype.init = function () {

    console.log("VictoryScreen::init");

    this.initialized = true;

    this.button[0] = new Button(this, 600, 450, 300, 70, "bouton_test");
    this.button[1] = new Button(this, 600, 550, 300, 70, "bouton_menu_test");
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
    
    if(mousePosition != null && this.button[0].checkMousePosition(mousePosition))
    {
        this.lauchGame = true;
        this.levelSelect ++;
        this.pause = true;
    }
    else if(mousePosition != null && this.button[1].checkMousePosition(mousePosition))
    {
        this.lauchMenu = true;
        this.pause = true;
    }
};

VictoryScreen.prototype.render = function () {
    
    if(this.pause)
        return;
    
    for(var i in this.button)
        this.button[i].render();
};