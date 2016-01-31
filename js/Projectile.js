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
                    if (this.game.ennemies[i].life < 0) {
                        this.game.audio.playSoundF(1);
                    }
                    this.active = 0;
                    return;
                }
            }
        }
        else
        {
            for (var i in this.game.characters) {
                if (!this.game.characters[i].isStun() && this.game.characters[i].collidesWith(this.x, this.y, this.size, this.size)) {
                    this.game.characters[i].life -= this.damage;
                    this.active = 0;
                    this.game.audio.playSoundM((this.game.characters[i].life > 0) ? 0 : 1);
                    return;
                }
            }
            if (this.game.shaman.collidesWith(this.x, this.y, this.size, this.size)) {                
                this.game.shaman.life -= this.damage;
                this.active = 0;
                return;
            }
        }
        
    }
}


Projectile.prototype.render = function() {
    
    if (this.joueur) {
        this.game.context.drawImage(this.game.spritesheet,416, 3291, 44, 49, this.x - 44/2, this.y - 50/2, 44, 49);   
    }
    else {
        this.game.context.drawImage(this.game.spritesheet,339, 3294, 43, 42, this.x - 42/2, this.y - 42/2, 43, 42);   
    }
    
}