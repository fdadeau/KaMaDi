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
    var x = 40, y = document.getElementById("cvs").height / 2 | 0;
    
    // largeur, hauteur
    var width = 20, height = 20;
    
    // Remise à zéro du temps de chargement
    this.reset = function() {
        currentLoadingTime = 0;
        lastUpdate = 0;
    }
    
    var lastUpdate = 0;
    // Mise à jour du shaman
    this.update = function(d) {
        if (game.allCharactersInPosition()) {
            if (lastUpdate > 0) {
                currentLoadingTime += d - lastUpdate;
                if (currentLoadingTime >= loadingTime) {
                    game.endLevel();
                    this.reset();
                }
            }
        }
        lastUpdate = d;
    }
    
    // Affichage du shaman
    this.render = function() {
        game.context.fillStyle = "#000000";
        game.context.fillRect(x - width/2|0, y - height/2 | 0, width, height);
        game.context.fillStyle = "#FF5555";
        game.context.fillRect(x - width/2|0, (y - height/2 | 0) - 10, width * currentLoadingTime / loadingTime | 0, 5);
    }
    
}