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
        this.lastEnnemyCreation = null;
    }
    
    Game.prototype.init = function () {
        
        console.log("Game::init");
        
        this.initialized = true;

        return this;
    };
    
    Game.prototype.start = function () {
        
        console.log("Game::start");
        
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
        if (!this.lastEnnemyCreation || this.lastEnnemyCreation.time > this.gameRules.ennemies.delay.get()) {
            for (var i=this.ennemies.length; i < this.gameRules.ennemies.nbEnnemiesByWave.get(); i++) {
                var posX = (this.width + 40 + Math.random()*200) | 0; // ??
                var posY = this.height * Math.random() | 0; 
                this.ennemies[i] = new Ennemy(this, posX, posY);  
            }
            for (var i in this.ennemies) {
                this.ennemies[i].update(time);
            }
            this.lastEnnemyCreation = time;
        } 
    };
    
    Game.prototype.render = function () {
        this.shaman.render();
        for (var i in this.ennemies) {
            this.ennemies[i].render();
        }
    };
    
    
    Game.prototype.allCharactersInPosition = function() { return true; }; // TODO modify 
    Game.prototype.endLevel = function() { alert("Fin du niveau"); }; // TODO modify 
    
    return Game;
})();
