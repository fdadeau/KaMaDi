
function Button(_menu, _x, _y, _width, _height, nom_image) {
    
    this.menu = _menu;
    
    this.x = _x;
    this.y = _y;
    
    this.width = _width;
    this.height = _height;
    
    this.spritesheet = new Image();
    this.spritesheet.src = "images/" + nom_image + ".png";
    
}

Button.prototype.checkMousePosition = function(mousePosition) {
    return  !(this.x + this.width / 2 < mousePosition.x ||
            this.x - this.width / 2 > mousePosition.x ||
            this.y - this.height / 2 > mousePosition.y ||
            this.y + this.height / 2 < mousePosition.y); 
};

Button.prototype.render = function () {
    
   this.menu.context.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x -this.width/2, this.y-this.height/2, this.width, this.height);
};