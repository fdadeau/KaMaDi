/** 
 *  Class for the Shaman   
 */
function Shaman(_g) {
    
    // lien vers le jeu
    var game = _g;
    
    // Temps (ms) nécessaire pour qu'il finisse son chargement
    var loadingTime = game.gameRules.shaman.loadingTime.get();
    
    // Temps de chargement courant
    var currentLoadingTime = 0;
    
    // position 
    var x = 140, y = document.getElementById("cvs").height / 2 | 0;
    
    // largeur, hauteur
    var width = 20, height = 20;
    
    // Remise à zéro du temps de chargement
    this.reset = function() {
        currentLoadingTime = 0;
        lastUpdate = 0;
    }

    this.getX = function() {
        return x;
    };
    this.getY = function() {
        return y;
    };
    this.getWidth = function() {
        return width;
    };
    this.getHeight = function() {
        return height;
    };
    
    // Mise à jour du shaman
    this.update = function(time) {
        
        if (game.allCharactersInPosition()) {
            currentLoadingTime += time.tick;
            if (currentLoadingTime >= loadingTime) {
                game.endLevel();
                this.reset();
            }
        }
    };
    
    // Affichage du shaman
    this.render = function() {
        game.context.fillStyle = "#000000";
        game.context.fillRect(x - width/2|0, y - height/2 | 0, width, height);
        game.context.fillStyle = "#FF5555";
        game.context.fillRect(x - width/2|0, (y - height/2 | 0) - 10, width * currentLoadingTime / loadingTime | 0, 5);
    };
    
}