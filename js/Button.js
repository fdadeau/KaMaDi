
function Button(_menu, _x, _y) {
    
    this.menu = _menu;
    
    this.x = _x;
    this.y = _y;
    
    this.width = 60;
    this.height = 60;
}

Button.prototype.checkMousePosition = function(mousePosition) {
    return  !(this.x + this.width / 2 < mousePosition.x ||
            this.x - this.width / 2 > mousePosition.x ||
            this.y - this.height / 2 > mousePosition.y ||
            this.y + this.height / 2 < mousePosition.y); 
};

Button.prototype.render = function () {
    this.menu.context.fillStyle = "#FF0000";
    this.menu.context.fillRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
};