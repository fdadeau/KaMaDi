function Ennemy(_game, _x, _y) {

    this.game = _game;
    
    // position
    this.x = _x;
    this.y = _y;
    
    // size
    this.width = 20;
    this.height = 20;
    
    this.life = this.game.gameRules.ennemies.life.get();

}


Ennemy.prototype.update = function(time) {
    
    this.x--;
        
}


Ennemy.prototype.render = function() {
    
    this.game.context.fillStyle = "#FF0000";
    this.game.context.fillRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
    
}