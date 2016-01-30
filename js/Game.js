"use strict";
var Game = (function () {
    
    function Game(context) {
        console.log("Game::()");
        this.initialized = false;
        this.context = context;
        this.width = null;
        this.height = null;
        this.gameRules = new GameRules();
        this.shaman = new Shaman(this); 
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
    }
    
    Game.prototype.init = function () {
        
        console.log("Game::init");
        
        this.initialized = true;

        this.characters = [];
        for (var i=0; i < this.gameRules.character.nbStartCharacter.get(); i++) {
            this.characters[this.characters.length] = new Character(this, this.width*0.8*Math.random() + this.width*0.2, this.height*Math.random());
        }
        this.projectiles = [];

        return this;
    };
    
    Game.prototype.start = function () {
        
        console.log("Game::start");
        
        this.AddEnnemisWave();
        
        if (!this.initialized) {
            throw new Error("The class Game has not initialized yet");
        }

        return this;
        
    };
    
    Game.prototype.update = function (time, mousePosition) {
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
                this.selectedCharacter = targetCharacter;
            }
            else {
                if (this.selectedCharacter != null) {
                    this.selectedCharacter.goTo(mousePosition.x, mousePosition.y);
                    this.selectedCharacter = null;
                }
            }
            
            mousePosition.raz();
        }
        this.shaman.update(time);
        
        // characters update
        for (var i=0; i < this.characters.length; i++) {
            if (this.characters[i].life <= 0) {
                this.characters.splice(i,1);
                i--;
            }
            else {
                this.characters[i].update(time);
            }
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
        //if (!this.lastEnnemyCreation || this.lastEnnemyCreation.time > this.gameRules.ennemies.delay.get()) { // Fonctionnement ??
        if (this.timeEnnemyCreation >= this.gameRules.ennemies.delay.get()) {
            
            this.AddEnnemisWave();
        
            this.timeEnnemyCreation -= this.gameRules.ennemies.delay.get();
        }
            //this.lastEnnemyCreation = time;
        
        for (var i=0; i < this.ennemies.length; i++) {
            
            if(this.ennemies[i] != null)
            {
                if(this.ennemies[i].isDead())
                {
                    this.ennemies[i] = null;    // -> Ne libere pas la case de l'ennemis 
                    this.ennemies.splice(i,1);  // -> suppression de la case de l'ennemi.
                    i--;
                }
                else
                {
                    this.ennemies[i].update(time);
                }
            }
        }
    };
    
    Game.prototype.AddEnnemisWave = function () {
        //for (var i=this.ennemies.length; i < this.gameRules.ennemies.nbEnnemiesByWave.get(); i++) {
        for (var i=0; i < this.gameRules.ennemies.nbEnnemiesByWave.get(); i++) { // Si on attent pas la fin de la vague
            //var posX = (this.width + 40 + Math.random()*200) | 0; // ??
            var posX = (this.width + 40 + Math.random()*200) | 0; // ??
            var posY = this.height * Math.random() | 0; 
            this.ennemies[this.ennemies.length] = new Ennemy(this, posX, posY);  
        }
    }
    
    Game.prototype.addProjectile = function(_x, _y, _tx, _ty, _s, _d) {
        this.projectiles[this.projectiles.length] = new Projectile(this, _x, _y, _tx, _ty, _s, _d);
    }
    
    Game.prototype.render = function () {
        // DEBUG : dessin du cercle où se trouve le shaman
        this.context.beginPath();
        this.context.arc(this.shaman.getX()+50, this.shaman.getY(), 70, 0, 2*Math.PI);
        this.context.stroke();
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
    };
    
    
    Game.prototype.allCharactersInPosition = function() { return true; }; // TODO modify 
    Game.prototype.endLevel = function() { alert("Fin du niveau"); this.init().start(); }; // TODO modify 
    
    return Game;
})();
