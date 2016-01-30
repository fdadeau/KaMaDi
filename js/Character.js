
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
    
    this.x += this.moveX;
    this.y += this.moveY;
    
};

Character.prototype.render = function() {

    this.game.context.fillStyle = "#00FF00";
    this.game.context.fillRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);

};