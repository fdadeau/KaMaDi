
function Character(_game, _x, _y) {

    this.game = _game;

    // position
    this.x = _x;
    this.y = _y;

    // size
    this.width = 30;
    this.height = 30;
    
    this.life = this.game.gameRules.character.life.get();
    this.speed = this.game.gameRules.character.speed.get();

    // point de destination lorsqu'il est en mouvement
    this.destX = 0;
    this.destY = 0;
    this.distToTarget = 0;
    
    this.state = 0; // 0 : IDLE | 1 : MOVING 
    
    // délai entre deux attaques
    this.attackDelay = this.game.gameRules.character.attackDelay.get();
    this.lastAttack = 0;
    
    // portée de l'attaque
    this.attackRange = this.game.gameRules.character.attackRange.get();
}

Character.prototype.getX = function() {
    return this.x;
};
Character.prototype.getY = function() {
    return this.y;
};
Character.prototype.getWidth = function() {
    return this.width;
};
Character.prototype.getHeight = function() {
    return this.height;
};

Character.prototype.update = function(time) {
    
    if (this.state == 1) { // MOVING
        this.distToTarget = Math.sqrt(Math.pow(this.x - this.destX,2) + Math.pow(this.y - this.destY,2));
        if (this.distToTarget < this.speed) {
            // arrive à destination
            this.x = this.destX;
            this.y = this.destY;
            this.state = 0;
        }
        else {
            this.x += (this.destX - this.x)/this.distToTarget * this.speed;
            this.y += (this.destY - this.y)/this.distToTarget * this.speed;
        }
    }
    else { // IDLE
        // attack --> TODO
    }
};

Character.prototype.goTo = function(_toX, _toY) {
    this.destX = _toX;
    this.destY = _toY;
    this.state = 1;
};


Character.prototype.collidesWith = function(_x,_y) {
return  _x >= this.x - this.width/2 &&
        _x <= this.x + this.width/2 &&
        _y >= this.y - this.height/2 &&
        _y <= this.y + this.height/2;
}

                    
Character.prototype.render = function() {

    // dessin d'un cercle autour du personnage pour le repérer
    if (this.game.selectedCharacter == this) {
        this.game.context.globalAlpha = 0.4;
        this.game.context.fillStyle = "#88FF88";
        this.game.context.beginPath();
        this.game.context.arc(this.x, this.y, this.attackRange, 0, 2*Math.PI);
        this.game.context.fill();
        this.game.context.globalAlpha = 1;
    }
    this.game.context.fillStyle = "#00FF00";
    this.game.context.fillRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
    this.game.context.fillStyle = "#000000";
    this.game.context.beginPath();
    this.game.context.arc(this.x, this.y, 1, 0, 2*Math.PI);
    this.game.context.stroke();

};