
function Ennemy(_game, _x, _y, _i) {

    this.game = _game;

    // position
    this.x = _x;
    this.y = _y;
    
    this.strength;
    
    this.attackDistance = 0; // Distance à partir de laquelle l'ennemis attauque le joueur
    
    // var rnd = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    
    if(_i < 6)
    {
        this.type = "Chargeur"; 
    }
    else 
    {
        this.type = "Tireur"; 
    }
    this.image = _i;
    this.state = 0; // 0 : calme, 1 : un peu excite, 2 : beaucoup excite, 3 : animation transformation, 4 : bite/chatte 
    // sprite used 
    switch (this.image) {
            // hommes
        case 0: 
            this.sprite = {srcX: [57, 57, 57, 57, 1695], srcY: [56, 56+921, 56+1826, 56+1826, 2835], srcW: [231, 231, 231, 231, 195], srcH: [380,380,380,380,300], destW: 60, destH:0}; 
            break;
        case 1: 
            this.sprite = {srcX: [364, 364, 364, 364, 1695], srcY: [98, 98+921, 98+1826, 98+1826, 2835], srcW: [208, 208, 208, 208, 195], srcH: [337,337,337,337,300], destW: 60, destH:0}; 
            break;
        case 2: 
            this.sprite = {srcX: [664, 664, 664, 664, 1695], srcY: [58, 58+921, 58+1826, 58+1826, 2835], srcW: [272, 272, 272, 272, 195], srcH: [366,366,366,366,300], destW: 60, destH:0}; 
            break;
        case 3: 
            this.sprite = {srcX: [1028, 1028, 1028, 1028, 1695], srcY: [108, 108+921, 108+1826, 108+1826, 2835], srcW: [246, 246, 246, 246, 195], srcH: [310,310,310,310,300], destW: 60, destH:0}; 
            break;
        case 4: 
            this.sprite = {srcX: [1380, 1380, 1380, 1380, 1695], srcY: [24, 24+921, 24+1826, 24+1826, 2835], srcW: [226, 226, 226, 226, 195], srcH: [404,404,404,404,300], destW: 60, destH:0}; 
            break;
        case 5: 
            this.sprite = {srcX: [1696, 1696, 1696, 1696, 1695], srcY: [36, 36+921, 36+1826, 36+1826, 2835], srcW: [226, 226, 226, 226, 195], srcH: [396,396,396,396,300], destW: 60, destH:0}; 
            break;
            // femmes
        case 6: 
            this.sprite = {srcX: [60, 60, 60, 60, 1714], srcY: [507, 507+921, 507+1826, 507+1826, 3232], srcW: [260, 260, 260, 260, 192], srcH: [353,353,353,353,356], destW: 60, destH:0}; 
            break;
        case 7: 
            this.sprite = {srcX: [376, 376, 376, 376, 1714], srcY: [522, 522+921, 522+1826, 522+1826, 3232], srcW: [244, 244, 244, 244, 192], srcH: [342,342,342,342,356], destW: 60, destH:0}; 
            break;
        case 8: 
            this.sprite = {srcX: [696, 696, 696, 696, 1714], srcY: [514, 514+921, 514+1826, 514+1826, 3232], srcW: [248, 248, 248, 248, 192], srcH: [352,352,352,352,356], destW: 60, destH:0}; 
            break;
        case 9: 
            this.sprite = {srcX: [1036, 1036, 1036, 1036, 1714], srcY: [516, 516+921, 516+1826, 516+1826, 3232], srcW: [248, 248, 248, 248, 192], srcH: [350,350,350,350,356], destW: 60, destH:0}; 
            break;
        case 10: 
            this.sprite = {srcX: [1382, 1382, 1382, 1382, 1714], srcY: [496, 496+921, 496+1826, 496+1826, 3232], srcW: [258, 258, 258, 258, 192], srcH: [365,365,365,365,356], destW: 60, destH:0}; 
            break;
        default: 
            this.sprite = {srcX: [1696, 1696, 1696, 1696, 1714], srcY: [495, 495+921, 495+1826, 495+1826, 3232], srcW: [232, 232, 232, 232, 192], srcH: [367,367,367,367,356], destW: 60, destH:0}; 
            break;        
    }   
    this.sprite.destW = 60;
    this.sprite.destH =  function(sp,st) { return sp.srcH[st]/sp.srcW[st]*sp.destW; };
    this.inclinaison = 0;
    this.lastInclinaison = 0;
    this.delta = Math.floor(Math.random()*30);
    this.width = this.sprite.destW; 
    this.height = this.sprite.destH;
    
    this.animation = { state: 0, delay: 500, lastUpdate: 0 };
    
    // speed
    this.speed = this.game.gameRules.ennemies.speed.get(this.image);
    this.escapeSpeed = this.game.gameRules.ennemies.escapSpeed.get(this.image);

    this.posTargetX = this.game.shaman.getX();
    this.posTargetY = this.game.shaman.getY();
    
    this.moveX = this.getVectorToTargetX(this.speed);
    this.moveY = this.getVectorToTargetY(this.speed); 

    this.direction = (this.moveX > 0) ? 1 : -1;
    
    this.attackDelay = this.game.gameRules.ennemies.attackDelay.get(this.image);
    this.lastAttack = 0;
    this.attackSpeed = this.game.gameRules.ennemies.attackSpeed.get(this.image);
    this.attackDamage = this.game.gameRules.ennemies.attackDamage.get(this.image);
    this.attackRange = this.game.gameRules.ennemies.attackRange.get(this.image);
    
    this.life = this.game.gameRules.ennemies.life.get(this.image);
        
}

// ombre commune
Ennemy.prototype.ombre = { srcX: 1760, srcY: 3138, srcW: 112, srcH: 28};
Ennemy.prototype.ombre.destH = function(w) { this.srcW/this.srcH*w; };


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
    if (this.life > 0) {
        if (this.moveX == 0) {
            this.moveX = this.getVectorToTargetX(this.speed);
        }
        if (this.moveY == 0) {
            this.moveY = this.getVectorToTargetY(this.speed);
        }
        // determiner etat du personnage en fonction de la distance
        if (this.state < 3) { // si pas dans l'animation
            var distanceToShaman = this.distanceTo(this.game.shaman.x, this.game.shaman.y);
            this.state = 0;
            if (distanceToShaman < 500) {
                this.state = 1;
            }
            if (distanceToShaman < 350) {
                this.state = 2;
            }
            if (distanceToShaman < 200) {
                this.state = 3;
            }
        }
        else if (this.state == 3) {
            this.moveX = 0;
            this.moveY = 0;
            this.inclinaison = 0;
            if (time.time - this.animation.lastUpdate > this.animation.delay) {
                this.animation.state++;
                this.animation.lastUpdate = time.time;
            }
            if (this.animation.state > 9) {
                this.state = 4; 
            }
            return;
        }
    }
    else {        
        this.moveX = this.getVectorToTargetX(this.escapeSpeed);
        this.moveY = this.getVectorToTargetY(this.escapeSpeed);
        this.life = 0;
        this.x -= this.moveX;
        this.y -= this.moveY;
        if (time.time - this.lastInclinaison > 60/this.speed+this.delta) {
            this.inclinaison = (this.inclinaison == 0) ? 4 : -this.inclinaison;
            this.lastInclinaison = time.time;
        }
        this.state = 0;
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
    

    if (this.moveX != 0 || this.moveY != 0) {
        if (time.time - this.lastInclinaison > 60/this.speed+this.delta) {
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

};

Ennemy.prototype.distanceTo = function(_x,_y) {
    return  Math.sqrt(Math.pow(this.x-_x,2)+Math.pow(this.y-_y,2)); 
};

Ennemy.prototype.render = function() {

    // dessin du sprite;
    if (this.state != 3) {
        this.game.drawImage(this.game.spritesheet, 
                            this.sprite.srcX[this.state], 
                            this.sprite.srcY[this.state], 
                            this.sprite.srcW[this.state], 
                            this.sprite.srcH[this.state], 
                            this.x - this.sprite.destW/2, 
                            this.y - this.sprite.destH(this.sprite,this.state)/2, 
                            this.sprite.destW, 
                            this.sprite.destH(this.sprite,this.state), 
                            this.inclinaison, 
                            this.direction==1);      
    }   
    else {
        console.log("animation state = " + this.animation.state);
        if (this.animation.state < 2) {
            // dessin perso       
            this.game.drawImage(this.game.spritesheet, this.sprite.srcX[3], this.sprite.srcY[3], this.sprite.srcW[3], this.sprite.srcH[3], this.x - this.sprite.destW/2, this.y - this.sprite.destH(this.sprite,3)/2, this.sprite.destW, this.sprite.destH(this.sprite,3), this.inclinaison, this.direction==1); 
        }
        else if (this.animation.state > 3) {
            // dessin Q
            this.game.drawImage(this.game.spritesheet, this.sprite.srcX[4], this.sprite.srcY[4], this.sprite.srcW[4], this.sprite.srcH[4], this.x - this.sprite.destW/2, this.y - this.sprite.destH(this.sprite,4)/2, this.sprite.destW, this.sprite.destH(this.sprite,4), this.inclinaison, this.direction==1); 
        }
        switch (this.animation.state) {
            case 0:
                this.game.drawImage(this.game.spritesheet, 1773, 3675, 93, 97, this.x - 30/2, this.y - 32/2, 30, 32, 0, false);
                break;
            case 1:
                this.game.drawImage(this.game.spritesheet, 830, 3478, 223, 232, this.x - 50/2, this.y - 52/2, 60, 62, 0, false);
                break;
            case 2:
                this.game.drawImage(this.game.spritesheet, 486, 3436, 290, 308, this.x - 60/2, this.y - 62/2, 70, 72, 0, false);
                break;
            case 3:
                this.game.drawImage(this.game.spritesheet, 22, 3384, 414, 423, this.x - 70/2, this.y - 72/2, 70, 72, 0, false);
                break;
                
        }
    }
    
    
    this.game.context.fillRect(this.x - this.width/2, this.y- this.height/2 - 10, this.width * this.life / this.game.gameRules.ennemies.life.get(this.image), 5);
};