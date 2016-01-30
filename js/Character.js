
function Character(_game, _x, _y) {

    this.game = _game;

    // position
    this.x = _x;
    this.y = _y;

    // size
    this.width = 20;
    this.height = 20;
    
    this.life = this.game.gameRules.character.life.get();
    this.speed = this.game.gameRules.character.speed.get();

    this.moveX = 0;
    this.moveY = 0;
    
    this.destX = 0;
    this.destY = 0;
    
    this.state = 0; // IDLE
    
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
        var distToTarget = Math.sqrt(Math.pow(this.x - this.destX,2) + Math.pow(this.y - this.destY,2));
        if (distToTarget < this.speed) {
            this.x = this.destX;
            this.y = this.destY;
            this.state = 0;
        }
        else {
            this.x += (this.destX - this.x)/distToTarget * this.speed;
            this.y += (this.destY - this.y)/distToTarget * this.speed;
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