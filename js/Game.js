"use strict";
var Game = (function () {
    
    function Game(context) {
        console.log("Game::()");
        this.initialized = false;
        this.context = context;
        this.gameRules = new GameRules();
        this.shaman = new Shaman(this); 
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
        this.shaman.update();
    };
    
    Game.prototype.render = function () {
        this.shaman.render();
    };
    
    
    Game.prototype.allCharactersInPosition = function() { return true; }; // TODO modify 
    
    return Game;
})();
