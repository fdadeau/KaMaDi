"use strict";
var Game = (function () {
    
    function Game(context, audio) {
        console.log("Game::()");
        this.initialized = false;
        this.pause = true;
        this.context = context;
        this.audio = audio;
        this.width = null;
        this.height = null;
        this.gameRules = new GameRules();
        this.shaman = null;
        // set of ennemies
        this.ennemies = [];
        // last ennemy creation
        //this.lastEnnemyCreation = null;
        this.timeEnnemyCreation = 0;
        // set of characters
        this.characters = [];
        this.selectedCharacter = null;
        // set of projectiles 
        this.projectiles = [];
        
        this.victoire = false;
        this.defaite = false;
        
        this.level = 0;
        
        this.tabAffichage = [];
        
        this.spritesheet = new Image();
        this.spritesheet.src = "images/spritesheet2redux.png";
    }
    
    Game.prototype.init = function () {
        
        console.log("Game::init");

        this.initialized = true;
        
        this.characters = [];
        this.projectiles = [];
        
        this.ennemies = [];
        
        this.timeEnnemyCreation = 0;

        return this;
    };
    
    Game.prototype.start = function (_level) {
        
        console.log("Game::start");
        
        this.pause = false;
        this.level = _level;
        
        this.victoire = false;
        this.defaite = false;
        
        this.shaman = new Shaman(this); 
        
        this.audio.playBacking(1);
        
        for (var i=0; i < this.gameRules.character.nbStartCharacter.get(this.level); i++) {
            var rnd = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
            this.characters[this.characters.length] = new Character(this, this.width*0.5*Math.random() + this.width*0.25, this.height*0.5*Math.random() + this.height*0.25, rnd);
        }
        
        this.AddEnnemisWave(this.level, 0);
        
        if (!this.initialized) {
            throw new Error("The class Game has not initialized yet");
        }

        return this;
        
    };
    
    Game.prototype.update = function (time, mousePosition) {
        if (this.pause) return;
        
        if (mousePosition.x !== null) {
            console.log(mousePosition);
            console.log(time);
            
            // detection du personnage selectionné
            var targetCharacter = null;
            for (var i in this.characters) {
                if (this.characters[i].collidesWith(mousePosition.x, mousePosition.y, 1, 1)) {
                    targetCharacter = this.characters[i];
                }
            }
            if (targetCharacter != null) {
                this.selectedCharacter = (targetCharacter == this.selectedCharacter) ? null : targetCharacter;
                if (this.selectedCharacter != null) {
                    this.audio.playSoundC(2);
                }
            }
            else {
                if (this.selectedCharacter != null) {
                    this.selectedCharacter.goTo(mousePosition.x, mousePosition.y);
                    this.audio.playSoundC(3);
                    this.selectedCharacter = null;
                }
                else {
                    // clic sur le shaman -> libère sa puissance 
                    if (this.shaman.collidesWith(mousePosition.x, mousePosition.y, 1, 1)) {
                        this.shaman.unleash();
                        this.selectedCharacter = null;
                    }            
                }
            }
            mousePosition.raz();
        }
        
        if (this.shaman.life <= 0) {
            this.defaite = true;
            this.pause = true;
            return;
        }
        this.shaman.update(time);
        
        // characters update
        for (var i=0; i < this.characters.length; i++) {
            this.characters[i].update(time);
        }
        
        // projectiles update
        for (var i=0; i < this.projectiles.length; i++) {
            this.projectiles[i].update(time);
            if (this.projectiles[i].active == 0) {
                this.projectiles[i] = null;
                this.projectiles.splice(i,1);
            }
        }
        
        
        this.timeEnnemyCreation += time.tick;
        if (this.timeEnnemyCreation >= this.gameRules.ennemies.delay.get(this.level, time.time)) {            
            this.AddEnnemisWave(time.time);
            if (this.ennemies.length >= 20) {
                this.audio.playBacking(2);
            }
            this.timeEnnemyCreation -= this.gameRules.ennemies.delay.get(this.level, time.time);
        }
        
        
        for (var i=0; i < this.ennemies.length; i++) {
            if(this.ennemies[i] != null)
            {
                if(this.ennemies[i].isDead())
                {
                    this.ennemies[i] = null;    // -> Ne libere pas la case de l'ennemis 
                    this.ennemies.splice(i,1);  // -> suppression de la case de l'ennemi.
                    i--;
                    if (this.ennemies.length < 20) {
                        this.audio.playBacking(1);
                    }
                }
                else
                {
                    this.ennemies[i].update(time);
                }
            }
        }
        
        this.tabAffichage = [];
    };
    
    Game.prototype.AddEnnemisWave = function (time) {
        //for (var i=this.ennemies.length; i <t this.gameRules.ennemies.nbEnnemiesByWave.get(); i++) {
        for (var i=0; i < this.gameRules.ennemies.nbEnnemiesByWave.get(this.level, time); i++) { // Si on attent pas la fin de la vague
            //var posX = (this.width + 40 + Math.random()*200) | 0; // ??
            
            // on tire l'ennemi dans la zone
            var posX = Math.random() * this.width * 2 / 3;
            if (posX > this.width / 3) {
                posX += this.width / 3;
            }
            var posY = Math.random() * this.height;
            
            
            var seed = Math.random();
            if (seed < 0.33) {
                // on le bouge vers le haut
                posY = -30;
            }
            else if (seed > 0.66) {
                // on le bouge vers le bas
                posY = this.height + 30;
            }
            else {
                if(Math.random() > 0.5) {
                    // on le sort vers la gauche
                    posX = - 30;
                }
                else {
                    // on le sort vers la droite
                    posX = this.width + 30;
                }
                
            }
            
            this.ennemies[this.ennemies.length] = new Ennemy(this, posX, posY, Math.random()*12|0);  
            this.audio.playSoundF(3);
        }
    }
    
    Game.prototype.addProjectile = function(_x, _y, _tx, _ty, _s, _d, _j) {
        this.projectiles[this.projectiles.length] = new Projectile(this, _x, _y, _tx, _ty, _s, _d, _j);
    }
    
    Game.prototype.render = function () {
        
        if(this.pause)
            return;
        
        /*
        // dessin du shaman
        this.shaman.render();
        // dessin des personnages
        for (var i in this.characters) {
            this.characters[i].render();
        }
        // dessin des ennemis
        for (var i in this.ennemies) {
            this.ennemies[i].render();
        }
        // dessin des projectiles
        for (var i in this.projectiles) {
            this.projectiles[i].render();
        }
        */
       
       // Chargement du tableau d'affichage
        this.tabAffichage = [];
        this.tabAffichage.push(this.shaman);
        for (var i in this.characters) {
            this.tabAffichage.push(this.characters[i]);
        }
        for (var i in this.ennemies) {
            this.tabAffichage.push(this.ennemies[i]);
        }
       
        // Tri du tableau
        var modification = 0;
        do
        {
            modification = 0;
            
            for(var i = 0; i < this.tabAffichage.length - 1; i++)
            {
                var h1 =  (this.tabAffichage[i].delta) ? this.tabAffichage[i].sprite.destH(this.tabAffichage[i].sprite, this.tabAffichage[i].state) : this.tabAffichage[i].height;
                
                var h2 =  (this.tabAffichage[i+1].delta) ? this.tabAffichage[i+1].sprite.destH(this.tabAffichage[i+1].sprite, this.tabAffichage[i+1].state) : this.tabAffichage[i+1].height;
                
                if (this.tabAffichage[i].y + h1 / 2 > this.tabAffichage[i + 1].y + h2 / 2)
                {
                    var spProvisoir = this.tabAffichage[i];
                    this.tabAffichage[i] = this.tabAffichage[i + 1];
                    this.tabAffichage[i + 1] = spProvisoir;

                    modification++;
                }
            }
        } while (modification != 0);
       
       // Affichage du tableau
       for(var i in this.tabAffichage)
           if(this.tabAffichage[i] != null)
            this.tabAffichage[i].render();
       
       // dessin des projectiles
        for (var i in this.projectiles) {
            this.projectiles[i].render();
        }
    };
    
    Game.prototype.endLevel = function() { 
        this.victoire = true; 
        this.pause = true; 
        this.audio.pauseSoundT();
    }; 
    
    
    Game.prototype.drawImage = function(img, srcX, srcY, srcW, srcH, x, y, width, height, deg, flip){
        //save current context before applying transformations
        this.context.save();
        //convert degrees to radians
        if(flip){ 
            var rad = deg * Math.PI / 180;
        }else{
            var rad = 2*Math.PI - deg * Math.PI / 180;
        }
        //set the origin to the center of the image
        this.context.translate(x + width/2, y + height/2);
        //rotate the canvas around the origin
        this.context.rotate(rad);
        if(flip){
            //flip the canvas
            this.context.scale(-1,1);
        }
        //draw the image    
        this.context.drawImage(img, srcX, srcY, srcW, srcH, -width/2, -height/2, width, height);
        //restore the canvas
        this.context.restore();
    }
    return Game;
})();
