
function Ennemy(_game, _x, _y) {

    this.game = _game;

    // position
    this.x = _x;
    this.y = _y;

    // size
    this.width = 20;
    this.height = 20;

    this.life = this.game.gameRules.ennemies.life.get();
    this.speed = this.game.gameRules.ennemies.speed.get();

    this.moveX = 0;
    this.moveY = 0;
    
    this.dead = false; // FD: redondant avec life == 0 
}

Ennemy.prototype.getX = function() {
    return this.x;
};
Ennemy.prototype.getY = function() {
    return this.y;
};
Ennemy.prototype.getWidth = function() {
    return this.width;
};
Ennemy.prototype.getHeight = function() {
    return this.height;
};
Ennemy.prototype.isDead = function() {
    return this.life <= 0;
};

Ennemy.prototype.collidesWith = function(_x,_y, _w, _h) {
return  !(this.x + this.width / 2 < _x - _w/2 ||
            this.x - this.width / 2 > _x + _w/2 ||
            this.y - this.height / 2 > _y + _h / 2 ||
            this.y + this.height / 2 < _y - _h / 2); 
}


Ennemy.prototype.update = function(time) {

    //Gestion du deplacement des ennemis vers le Shaman
    if(Math.abs(this.game.shaman.getX() - this.x) > Math.abs(this.game.shaman.getY() - this.y)) {
        this.moveY = ((this.game.shaman.getY() - this.y) / Math.abs(this.game.shaman.getX() - this.x)) * this.speed;
        this.moveX = -this.speed;
    }
    else {
        this.moveX = -((this.game.shaman.getX() - this.x) / Math.abs(this.game.shaman.getY() - this.y)) * this.speed;
        this.moveY = this.speed;
    }

    // Gestion de la collision entre les ennemis
    for (var i in this.game.ennemies) {
        if(this.game.ennemies[i] !== null && this.game.ennemies[i] !== this
            && this.game.ennemies[i].collidesWith(this.x+this.moveX, this.y+this.moveY, this.width, this.height)
/*        && this.x + this.moveX + this.width > this.game.ennemies[i].getX()
        && this.x + this.moveX < this.game.ennemies[i].getX() + this.game.ennemies[i].getWidth()
        && this.y + this.moveY + this.height > this.game.ennemies[i].getY()
        && this.y + this.moveY < this.game.ennemies[i].getY() + this.game.ennemies[i].getHeight()*/
        && this.x > this.game.ennemies[i].getX()) {
            this.moveX = 0;
            this.moveY = 0;
        }
    }
    
    // Gestion de la collision avec le shaman
    if(this.x + this.width > this.game.shaman.getX()
    && this.x < this.game.shaman.getX() + this.game.shaman.getWidth()
    && this.y + this.height > this.game.shaman.getY()
    && this.y < this.game.shaman.getY() + this.game.shaman.getHeight()) {

        this.life = 0;
    }

    this.x += this.moveX;
    this.y += this.moveY;
};

Ennemy.prototype.render = function() {

    this.game.context.fillStyle = "#FF0000";
    this.game.context.fillRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);

};