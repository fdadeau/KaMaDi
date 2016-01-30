
function Button(_menu, _x, _y, _width, _height, nom_image) {
    
    this.menu = _menu;
    
    this.x = _x;
    this.y = _y;
    
    this.width = _width;
    this.height = _height;
    
    this.spritesheet = new Image();
    
    if(nom_image == "menu")
        this.spritesheet.src = "images/bouton_menu_test.png";
    else
        this.spritesheet.src = "images/bouton_test.png";
}

Button.prototype.checkMousePosition = function(mousePosition) {
    return  !(this.x + this.width / 2 < mousePosition.x ||
            this.x - this.width / 2 > mousePosition.x ||
            this.y - this.height / 2 > mousePosition.y ||
            this.y + this.height / 2 < mousePosition.y); 
};

Button.prototype.render = function () {
    
    
    /*
    this.menu.context.fillStyle = "#FF0000";
    this.menu.context.fillRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
    */
   
   //this.drawImage(this.spritesheet, 0, 0, 300, 70, this.x - this.width/2, this.y-this.height/2, this.width, this.height, 0, 1);
   this.menu.context.drawImage(this.spritesheet, 0, 0, 300, 70, this.x -this.width/2, this.y-this.height/2, this.width, this.height);
};