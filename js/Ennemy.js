
function Ennemy(_game, _x, _y) {

    this.game = _game;

    // position
    this.x = _x;
    this.y = _y;
    
    this.strength;
    
    this.attackDistance = 0; // Distance à partir de laquelle l'ennemis attauque le joueur
    
    var rnd = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    
    this.type = ""; // Type d'ennemis : conditionne son comportement -> Parametrer attribution dans GameRule
    this.indexRules; // Index sur lequel il récupère les informations
    if(rnd === 1)
    {
        this.type = "Chargeur"; 
        this.indexRules = 0;
    }
    else if(rnd === 2)
    {
        this.type = "Tireur"; 
        this.indexRules = 1;
    }
    // sprite used 
    switch (0) { //Math.floor(Math.random()*3+this.indexRules*3)) {
        case 0: 
            this.sprite = {srcX: 39, srcY: 16, srcW: 384, srcH: 726, destW: 50, destH: 94}; 
            break;
        case 1: 
            this.sprite = {srcX: 0, srcY: 0, srcW: 0, srcH: 0, destW: 0, destH: 0}; 
            break;
        case 2: 
            this.sprite = {srcX: 0, srcY: 0, srcW: 0, srcH: 0, destW: 0, destH: 0}; 
            break;
        case 3: 
            this.sprite = {srcX: 0, srcY: 0, srcW: 0, srcH: 0, destW: 0, destH: 0}; 
            break;
        case 4: 
            this.sprite = {srcX: 0, srcY: 0, srcW: 0, srcH: 0, destW: 0, destH: 0}; 
            break;
        case 5: 
            this.sprite = {srcX: 0, srcY: 0, srcW: 0, srcH: 0, destW: 0, destH: 0}; 
            break;        
    }
   
    this.inclinaison = 0;
    this.lastInclinaison = 0;
    this.width = this.sprite.destW; 
    this.height = this.sprite.destH;
    
    // speed
    this.speed = this.game.gameRules.ennemies.speed.get(this.indexRules);
    this.escapeSpeed = this.game.gameRules.ennemies.escapSpeed.get(this.indexRules);

    this.posTargetX = this.game.shaman.getX();
    this.posTargetY = this.game.shaman.getY();
    
    this.moveX = this.getVectorToTargetX(this.speed);
    this.moveY = this.getVectorToTargetY(this.speed); 

    this.direction = (this.moveX > 0) ? 1 : -1;
    
    this.attackDelay = this.game.gameRules.ennemies.attackDelay.get(this.indexRules);
    this.lastAttack = 0;
    this.attackSpeed = this.game.gameRules.ennemies.attackSpeed.get(this.indexRules);
    this.attackDamage = this.game.gameRules.ennemies.attackDamage.get(this.indexRules);
    this.attackRange = this.game.gameRules.ennemies.attackRange.get(this.indexRules);
    
    this.life = this.game.gameRules.ennemies.life.get(this.indexRules);
        
    this.dead = false; // FD: redondant avec life == 0 
}


Ennemy.prototype.getVectorToTargetX = function(_speed) {
    return (this.posTargetX - this.x)/Math.sqrt(Math.pow(this.x - this.posTargetX,2) + Math.pow(this.y - this.posTargetY,2)) * _speed;
}

Ennemy.prototype.getVectorToTargetY = function(_speed) {
    return (this.posTargetY - this.y)/Math.sqrt(Math.pow(this.x - this.posTargetX,2) + Math.pow(this.y - this.posTargetY,2)) * _speed;
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
    return (this.life <= 0 &&
        (this.x < 0 || this.y < 0 || this.x > this.game.width || this.y > this.game.height));
};

Ennemy.prototype.collidesWith = function(_x,_y, _w, _h) {
return  !(this.x + this.width / 2 < _x - _w/2 ||
            this.x - this.width / 2 > _x + _w/2 ||
            this.y - this.height / 2 > _y + _h / 2 ||
            this.y + this.height / 2 < _y - _h / 2); 
}

Ennemy.prototype.calcDistance = function(_x,_y) {
    
    return Math.sqrt(Math.pow(_x - this.x, 2) + Math.pow(_y - this.y, 2), 2);
}

Ennemy.prototype.update = function(time) {

    //Gestion du deplacement des ennemis vers le Shaman
    if(this.life > 0) {
        if (this.moveX == 0) {
            this.moveX = this.getVectorToTargetX(this.speed);
        }
        if (this.moveY == 0) {
            this.moveY = this.getVectorToTargetY(this.speed);
        }
    }
    else {        
        this.moveX = this.getVectorToTargetX(this.escapeSpeed);
        this.moveY = this.getVectorToTargetY(this.escapeSpeed);
        this.life = 0;
        this.x -= this.moveX;
        this.y -= this.moveY;
        if (time.time - this.lastInclinaison > 60/this.speed) {
            this.inclinaison = (this.inclinaison == 0) ? 4 : -this.inclinaison;
            this.lastInclinaison = time.time;
        }
        this.direction = (this.moveX > 0) ? -1 : 1;
        return;
    }

    // Gestion de la collision entre les ennemis
    for (var i in this.game.ennemies) {
        if(this.game.ennemies[i] !== null && this.game.ennemies[i] !== this
            && this.game.ennemies[i].collidesWith(this.x+this.moveX, this.y+this.moveY, this.width, this.height)
            && this.x > this.game.ennemies[i].getX()) {
        
            this.moveX = 0;
            this.moveY = 0;

        }
    }
    // Gestion de la collision avec le shaman
    for (var i in this.game.characters) {   
        if((!this.game.characters[i].isStun()) && this.calcDistance(this.game.characters[i].getX(), this.game.characters[i].getY()) < this.attackRange) {
            this.moveX = 0;
            this.moveY = 0;
        }
   }
   
    if(this.calcDistance(this.game.shaman.getX(), this.game.shaman.getY()) < this.attackRange) {
        this.moveX = 0;
        this.moveY = 0;
    }
   
     
    this.x += this.moveX;
    this.y += this.moveY;
    

    if (this.moveX > 0 || this.moveY > 0) {
        if (time.time - this.lastInclinaison > 60/this.speed) {
            this.inclinaison = (this.inclinaison == 0) ? 4 : -this.inclinaison;
            this.lastInclinaison = time.time;
        }
    }
    else {
        this.inclinaison = 0;
    }

    
   if (time.time - this.lastAttack > this.attackDelay) {
            var closestCharacter = null;
            var shortestDistance = this.attackRange + 1;
            for (var i in this.game.characters) {
                var distance = this.distanceTo(this.game.characters[i].x, this.game.characters[i].y); 
                if ((!this.game.characters[i].isStun()) && distance < this.attackRange && distance < shortestDistance) {
                    closestCharacter = this.game.characters[i];
                    shortestDistance = distance;
                }
            }
            var distance = this.distanceTo(this.game.shaman.getX(), this.game.shaman.getY());
            if (distance < this.attackRange && distance < shortestDistance) {
                    closestCharacter = this.game.shaman;
                    shortestDistance = distance;
            }
            
            if (closestCharacter != null) {
                this.game.addProjectile(this.x, this.y, closestCharacter.x, closestCharacter.y, this.attackSpeed, this.attackDamage, false);
                this.lastAttack = time.time;
            }
        }
   
    this.x += this.moveX;
    this.y += this.moveY;
};

Ennemy.prototype.distanceTo = function(_x,_y) {
    return  Math.sqrt(Math.pow(this.x-_x,2)+Math.pow(this.y-_y,2)); 
};

Ennemy.prototype.render = function() {

    // dessin du sprite;
    this.game.drawImage(this.game.spritesheet, this.sprite.srcX, this.sprite.srcY, this.sprite.srcW, this.sprite.srcH, this.x - this.width/2, this.y-this.height/2, this.width, this.height, this.inclinaison, this.direction==1);
    
    this.game.context.fillRect(this.x - this.width/2, this.y- this.height/2 - 10, this.width * this.life / this.game.gameRules.ennemies.life.get(this.indexRules), 5);
};