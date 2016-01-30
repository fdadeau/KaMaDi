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
    }
    
    Game.prototype.init = function () {
        
        console.log("Game::init");
        
        this.initialized = true;

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
            mousePosition.raz();
        }
        this.shaman.update(time);
        
        this.timeEnnemyCreation += time.tick;
        //if (!this.lastEnnemyCreation || this.lastEnnemyCreation.time > this.gameRules.ennemies.delay.get()) { // Fonctionnement ??
        if (this.timeEnnemyCreation >= this.gameRules.ennemies.delay.get()) {
            
            this.AddEnnemisWave();
        
            this.timeEnnemyCreation -= this.gameRules.ennemies.delay.get();
        }
            //this.lastEnnemyCreation = time;
        
        for (var i in this.ennemies) {
            
            if(this.ennemies[i] != null)
            {
                if(this.ennemies[i].isDead())
                {
                    this.ennemies[i] = null; // -> Ne libere pas la case de l'ennemis ( A AMELIORER )
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
    
    Game.prototype.render = function () {
        this.shaman.render();
        for (var i in this.ennemies) {
            if(this.ennemies[i] != null)
            {
                this.ennemies[i].render();
            }
        }
    };
    
    
    Game.prototype.allCharactersInPosition = function() { return true; }; // TODO modify 
    Game.prototype.endLevel = function() { alert("Fin du niveau"); }; // TODO modify 
    
    return Game;
})();
