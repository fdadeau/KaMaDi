
function Character(_game, _x, _y, _t) {

    this.game = _game;

    // position
    this.x = _x;
    this.y = _y;

    // point de destination lorsqu'il est en mouvement
    this.destX = 0;
    this.destY = 0;
    this.distToTarget = 0;
    this.direction = (this.x < this.game.width/2) ? 1: -1;   
    this.inclinaison = 0;
    this.lastInclinaison = 0;
    
    this.state = 0; // 0 : IDLE | 1 : MOVING 
    
    // size
    this.type = _t
    
    switch (this.type) {
        case 0: 
            this.sprite = { srcX: [614,612], srcY: [2746,3090], srcW: 190, srcH: 324, destW: 70, destH: 0 };
            break;
        case 1: 
            this.sprite = { srcX: [837,844], srcY: [2700,3070], srcW: 215, srcH: 375, destW: 70, destH: 0 };
            break;
        case 2: 
            this.sprite = { srcX: [1076,1104], srcY: [2715,3069], srcW: 258, srcH: 341, destW: 75, destH: 0 };
            break;
        default: 
            this.sprite = { srcX: [1422,1443], srcY: [2712,3060], srcW: 207, srcH: 346, destW: 70, destH: 0 };
            break;
    }
    this.sprite.kind = 0;
    this.sprite.destH = this.sprite.srcH/this.sprite.srcW*this.sprite.destW;
    this.width = this.sprite.destW;
    this.height = this.sprite.destH;
    
    this.life = this.game.gameRules.character.life.get(this.type);
    this.speed = this.game.gameRules.character.speed.get(this.type);

    // délai entre deux attaques
    this.attackDelay = this.game.gameRules.character.attackDelay.get(this.type);
    this.lastAttack = 0;
    this.attackSpeed = this.game.gameRules.character.attackSpeed.get(this.type);
    this.attackDamage = this.game.gameRules.character.attackDamage.get(this.type);
    // portée de l'attaque
    this.attackRange = this.game.gameRules.character.attackRange.get(this.type);
    
    this.timeStun = 0;
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
Character.prototype.isStun = function() {
    return this.life <= 0;
};

Character.prototype.update = function(time) {
    
    if(this.isStun())
    {
        this.sprite.kind = 1;
        this.life = 0;
        this.timeStun += time.tick;
        if(this.timeStun >= this.game.gameRules.character.timeStun.get(this.type))
        {
            this.timeStun = 0;
            this.life = this.game.gameRules.character.life.get(this.type);
        }
        else
        {
            return;
        }
    }
    
    this.sprite.kind = 0;
    if (this.state == 1) { // MOVING
        this.distToTarget = Math.sqrt(Math.pow(this.x - this.destX,2) + Math.pow(this.y - this.destY,2));
        if (this.distToTarget < this.speed) {
            // arrive à destination
            this.x = this.destX;
            this.y = this.destY;
            this.state = 0;
            this.inclinaison = 0;
            return;
        }
        // collision avec un autre personnage
        /*
        for (var i in this.game.characters) {
            if (this.game.characters[i] != this && this.game.characters[i].collidesWith(this.x + (this.destX - this.x) / this.distToTarget * this.speed, this.y+(this.destY - this.y) / this.distToTarget * this.speed, this.width, this.height)) {
                // contournement ou pause
                return;
            }
        }
        */
        this.direction = (this.destX >= this.x) ? 1 : -1;
        if (time.time - this.lastInclinaison > 80) {
            this.inclinaison = (this.inclinaison == 0) ? 4 : - this.inclinaison;
            this.lastInclinaison = time.time;
        }
        this.x += (this.destX - this.x) / this.distToTarget * this.speed;
        this.y += (this.destY - this.y) / this.distToTarget * this.speed;
    }
    else { // IDLE
        // is it performing the shaman ritual ?
        if (this.game.shaman.isInShamanCircle(this.x, this.y)) {
            this.sprite.kind = 1;
            return;
        }
        
        // detect closest ennemy 
        if (time.time - this.lastAttack > this.attackDelay) {
            var closestEnnemy = null;
            var shortestDistance = this.attackRange + 1;
            for (var i in this.game.ennemies) {
                var distance = this.distanceTo(this.game.ennemies[i].x, this.game.ennemies[i].y); 
                if (this.game.ennemies[i].life > 0 && distance < this.attackRange && distance < shortestDistance) {
                    closestEnnemy = this.game.ennemies[i];
                    shortestDistance = distance;
                    this.direction = (this.x > closestEnnemy.x) ? -1 : 1;
                }
            }
            if (closestEnnemy != null) {
                this.game.addProjectile(this.x, this.y, closestEnnemy.x, closestEnnemy.y, this.attackSpeed, this.attackDamage, true);
                this.lastAttack = time.time;
            }
        }
        
        
    }
};

Character.prototype.goTo = function(_toX, _toY) {
    if (this.isStun()) return;
    this.destX = _toX;
    this.destY = _toY;
    this.state = 1;
};


Character.prototype.collidesWith = function(_x,_y, _w, _h) {
return  !(this.x + this.width / 2 < _x - _w/2 ||
            this.x - this.width / 2 > _x + _w/2 ||
            this.y - this.height / 2 > _y + _h / 2 ||
            this.y + this.height / 2 < _y - _h / 2); 
}

Character.prototype.distanceTo = function(_x,_y) {
    return  Math.sqrt(Math.pow(this.x-_x,2)+Math.pow(this.y-_y,2)); 
}

                    
Character.prototype.render = function() {

    // dessin d'un cercle autour du personnage actif pour le repérer
    if (this.game.selectedCharacter == this) {
        this.game.context.drawImage(this.game.spritesheet, 67, 3255, 88, 14, this.x - this.width/2, this.y + this.height/2-10, this.width, 14);
    }

    this.game.drawImage(this.game.spritesheet, this.sprite.srcX[this.sprite.kind], this.sprite.srcY[this.sprite.kind], this.sprite.srcW, this.sprite.srcH, this.x-this.width/2, this.y-this.height/2, this.width, this.height, this.inclinaison, this.direction==1);
    this.game.context.fillStyle = "#88FF88";
    this.game.context.fillRect(this.x-this.width/2, this.y-this.height/2 - 10, this.width * this.life / this.game.gameRules.character.life.get(this.type), 5)
    
};

