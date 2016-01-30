
function Menu(context) {
    console.log("Menu::()");
    
    this.initialized = false;
    this.pause = true;
    this.context = context;
    
    this.lauchGame = false;
    this.levelSelect = 0;
    
    this.level_button = [];
}

Menu.prototype.init = function () {

    console.log("Menu::init");

    this.initialized = true;

    this.level_button[0] = new Button(this, 200, 100);

    return this;
};

Menu.prototype.start = function () {
    
    console.log("Menu::start");
    
    this.pause = false;

    return this;
};

Menu.prototype.update = function (time, mousePosition) {

    if (this.pause) return;
    
    for(var i in this.level_button) {
        if(mousePosition != null && this.level_button[i].checkMousePosition(mousePosition))
        {
            this.lauchGame = true;
            this.levelSelect = (i+1);
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