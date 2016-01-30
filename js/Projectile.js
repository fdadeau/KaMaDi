/**
 *  Représentation des projectiles
 */
function Projectile(_game, _x, _y, _tX, _tY, _s, _d, _joueur) {

    this.game = _game;

    // direction
    this.dirX = (_tX - _x)/Math.sqrt(Math.pow(_x - _tX,2) + Math.pow(_y - _tY,2)) * _s;
    this.dirY = (_tY - _y)/Math.sqrt(Math.pow(_x - _tX,2) + Math.pow(_y - _tY,2)) * _s;
    
    this.x = _x;
    this.y = _y;
    
    this.speed = _s;
    
    this.damage = _d;  
    
    this.joueur = _joueur
    
    this.size = 2; // to do changer ?
    
    // active ?
    this.active = 1;
}

Projectile.prototype.update = function(time) {
    if (this.active == 1) {
        this.x += this.dirX;
        this.y += this.dirY;
        if (this.x < 0 || this.y < 0 || this.x > this.game.width || this.y > this.game.height) {
            this.active = 0;
            return;
        }
        
        if(this.joueur)
        {
            for (var i in this.game.ennemies) {
                if (this.game.ennemies[i].collidesWith(this.x, this.y, this.size, this.size)) {
                    this.game.ennemies[i].life -= this.damage;
                    this.active = 0;
                    return;
                }
            }
        }
        else
        {
            for (var i in this.game.characters) {
                if (this.game.characters[i].collidesWith(this.x, this.y, this.size, this.size)) {
                    this.game.characters[i].life -= this.damage;
                    this.active = 0;
                    return;
                }
            }
            if (this.game.shaman.collidesWith(this.x, this.y, this.size, this.size)) {
                
                this.game.currentLoadingTime -= this.damage;
                this.active = 0;
                return;
            }
        }
        
    }
}


Projectile.prototype.render = function() {
    
    this.game.context.beginPath();
    this.game.context.arc(this.x, this.y, 2, 0, 2*Math.PI);
    this.game.context.fill();
    
}