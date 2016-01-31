"use strict";
var Application = function () {
    
    var CVS_HEIGHT,
        CVS_WIDTH,
        cvs,
        ctx,
        game,
        menu,
        victoryScreen,
        gameOverScreen,
        introScreen,
        titleScreen,
        menu,
        audio,
        gameTime;

    this.mouse_position = {
            x: null,
            y: null,
            raz: function () { this.x = null; this.y = null; }
        };
        
    this.init = function() {

        cvs = document.getElementById("cvs");
        cvs.onclick = this.captureMouseClick.bind(this);
        ctx = cvs.getContext("2d");
        CVS_HEIGHT = cvs.height = 700; // window.innerHeight - 10;
        CVS_WIDTH = cvs.width = 1300; // window.innerWidth - 10;

        gameTime = new GameTime();
        
        audio = new Sound();
        
        menu = new Menu(ctx, audio);
        menu.width = CVS_WIDTH;
        menu.height = CVS_HEIGHT;
        //menu.init().start();
        menu.init();

        game = new Game(ctx, audio);
        game.width = CVS_WIDTH;
        game.height = CVS_HEIGHT;
        //game.init().start();
        game.init();
        
        gameOverScreen = new GameOverScreen(ctx);
        gameOverScreen.width = CVS_WIDTH;
        gameOverScreen.height = CVS_HEIGHT;
        gameOverScreen.init();
        
        victoryScreen = new VictoryScreen(ctx);
        victoryScreen.width = CVS_WIDTH;
        victoryScreen.height = CVS_HEIGHT;
        victoryScreen.init();
        
        introScreen = new IntroScreen(ctx);
        introScreen.width = CVS_WIDTH;
        introScreen.height = CVS_HEIGHT;
        introScreen.init();
        
        titleScreen = new TitleScreen(ctx);
        titleScreen.width = CVS_WIDTH;
        titleScreen.height = CVS_HEIGHT;
        titleScreen.init().start();
        
        this.boucleDeJeu();
    };

    var requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

    this.boucleDeJeu = function() {
        requestAnimFrame(this.boucleDeJeu.bind(this));
        this.update();
        this.render();
    };


    this.update = function() { 
        gameTime.update();
        
        game.update(gameTime, this.mouse_position);
        menu.update(gameTime, this.mouse_position);
        gameOverScreen.update(gameTime, this.mouse_position);
        victoryScreen.update(gameTime, this.mouse_position);
        introScreen.update(gameTime, this.mouse_position);
        titleScreen.update(gameTime, this.mouse_position);
        
        if(menu.lauchGame) {
            game.init().start(menu.levelSelect);
            menu.lauchGame = false;
        }
        if(game.defaite) {
            game.defaite = false;
            gameOverScreen.init().start(game.level);
        }
        if(game.victoire) {
            game.victoire = false;
            victoryScreen.init().start(game.level);
        }
        if(gameOverScreen.lauchGame) {
            gameOverScreen.lauchGame = false;
            game.init().start(gameOverScreen.levelSelect);
            
        }
        if(gameOverScreen.lauchMenu) {
            gameOverScreen.lauchMenu = false;
            menu.init().start();
        }
        if(victoryScreen.lauchGame) {
            victoryScreen.lauchGame = false;
            game.init().start(victoryScreen.levelSelect);

        }
        if(victoryScreen.lauchMenu) {
            victoryScreen.lauchMenu = false;
            menu.init().start();
        }
        
        if(introScreen.lauchMenu)
        {
            introScreen.lauchMenu = false;
            menu.init().start();
        }
        
        if(titleScreen.lauchMenu)
        {
            titleScreen.lauchMenu = false;
            introScreen.init().start();
        }
        
        //if(menu.pause && game.pause)
        //{
        //    menu.init().start();
        //}
    };

    this.render = function() {
        ctx.clearRect(0, 0, CVS_WIDTH, CVS_HEIGHT);
        
        game.render();
        menu.render();
        gameOverScreen.render();
        victoryScreen.render();
        introScreen.render();
        titleScreen.render();
    };

    this.captureMouseClick = function(event) {
        
        // gets the click coordinates
        var x, y;
        
        if (event.x != undefined && event.y != undefined) {
                x = event.x;
                y = event.y;
        }	
        else { // Firefox method to get the position
                x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        x -= cvs.offsetLeft; 
        y -= cvs.offsetTop;

        this.mouse_position.x = x;
        this.mouse_position.y = y;

    };

};