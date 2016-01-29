/**
 *  
 */

//(function () {

    var CVS_HEIGHT;
    var CVS_WIDTH;
    var cvs;
    var ctx;
    
    var mouse_position = {
        x: null,
        y: null
    };
    mouse_position.raz = function () { this.x = null; this.y = null; };
    
    var game;

    var init = function() {

        cvs = document.getElementById("cvs");
        cvs.onclick = captureMouseClick;
        ctx = cvs.getContext("2d");
        CVS_HEIGHT = cvs.height = window.innerHeight - 10;
        CVS_WIDTH = cvs.width = window.innerWidth - 10;

        game = new Game(ctx);
        game.init();

        boucleDeJeu();
    };

    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();


    boucleDeJeu = function() {
        currentDate = Date.now();
        requestAnimFrame(boucleDeJeu);
        update(currentDate);
        render();
    };


    update = function(d) { 
        game.update(d, mouse_position);
    };

    render = function() {
        ctx.clearRect(0, 0, CVS_WIDTH, CVS_HEIGHT);
        game.render();
    };

    captureMouseClick = function(event) {
        
        // gets the click coordinates
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

        mouse_position.x = x;
        mouse_position.y = y;

    };

//})();