/** 
 *  Class for the Shaman   
 */
function Shaman(_g) {
    
    // lien vers le jeu
    var game = _g;
    
    // Temps (ms) nécessaire pour qu'il finisse son chargement
    var loadingTime = game.gameRules.shaman.loadingTime.get(game.level);
    
    // Temps de chargement courant
    this.currentLoadingTime = 0; // 0.8 * loadingTime;
    
    // Autel autour duquel se trouve le shaman
    var altarX = game.width/2, altarY = game.height/2, altarRadius = 100; 

    // position 
    //var x = altarX - 50, y = altarY;
    this.x = altarX;
    this.y = altarY;
    
    // largeur, hauteur
    this.width = 150;
    this.height = this.width/542*374;
    
    // points du vie du shaman
    this.life = game.gameRules.shaman.life.get(game.level);
    
    // Remise à zéro du temps de chargement
    this.reset = function() {
        this.currentLoadingTime = 0;
        lastUpdate = 0;
    };
    
    this.collidesWith = function(_x,_y, _w, _h) {
        return  !(this.x + this.width / 2 < _x - _w/2 ||
            this.x - this.width / 2 > _x + _w/2 ||
            this.y - this.height / 2 > _y + _h / 2 ||
            this.y + this.height / 2 < _y - _h / 2); 
    };

    this.getX = function() {
        return this.x;
    };
    this.getY = function() {
        return this.y;
    };
    this.getWidth = function() {
        return this.width;
    };
    this.getHeight = function() {
        return this.height;
    };
    
    this.isInShamanCircle = function(_x, _y) {
        return Math.sqrt(Math.pow(altarX - _x,2) + Math.pow(altarY - _y,2)) < altarRadius;
    };
    
    this.unleash = function() {
        for (var i in game.ennemies) {
            if (game.ennemies[i].distanceTo(this.x, this.y) <= game.height / 3  * this.currentLoadingTime / loadingTime) {
                game.ennemies[i].life = 0;
            }
        }
        this.currentLoadingTime = 0;
    }
    
    // Mise à jour du shaman
    this.update = function(time) {
        var nbCharactersInPosition = 0;
        for (var i in game.characters) {
            if (game.characters[i].state == 0 && game.characters[i].life > 0 && this.isInShamanCircle(game.characters[i].x, game.characters[i].y)) {
                nbCharactersInPosition++;
            }            
        }
        if (nbCharactersInPosition == 0) {
            game.audio.pauseSoundT();
            return;
        }
        game.audio.playSoundT();
        this.currentLoadingTime += (time.tick * nbCharactersInPosition / game.gameRules.character.nbStartCharacter.get(game.level));
        if (this.currentLoadingTime >= loadingTime) {
            game.endLevel();
            this.reset();
        }
    };
    
    // Affichage du shaman
    this.render = function() {
        
        // dessin du shaman
        game.context.drawImage(game.spritesheet, 67, 3255, 88, 14, this.x - this.width/2, this.y + this.height/2-10, this.width, 14);
        game.context.drawImage(game.spritesheet, 54, 2816, 542, 374, this.x - this.width/2, this.y-this.height/2, this.width, this.height);

        //barre de chargement
        game.context.fillStyle = "#000055";
        game.context.fillRect((this.x - this.width/2 - 10) | 0, (this.y + this.height/2 - this.height * this.currentLoadingTime / loadingTime) | 0, 5, this.height * this.currentLoadingTime / loadingTime | 0);
        
        //barre de vie
        game.context.fillStyle = "#FF5555";
        game.context.fillRect(this.x - this.width/2|0, (this.y - this.height/2 | 0) - 10, this.width * this.life / game.gameRules.shaman.life.get(game.level) | 0, 5);
        
        // dessin du cercle où se trouve le shaman
        /*
        game.context.beginPath();
        game.context.arc(altarX, altarY, altarRadius, 0, 2*Math.PI);
        game.context.stroke();
        */
    };
    
}