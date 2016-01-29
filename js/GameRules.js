/**
 *  Game rules
 */
function GameRules() {

    this.shaman = {
        // temps de recharge
        loadingTime: { 
            value: 20000,
            get: function() { return this.value; } 
        }
    };
    
    this.ennemies = {
        // nombre d'ennemis/vague
        nbEnnemiesByWave: {
            value: 30,
            get: function() { return this.value; }
        },
        // frequence d'apparition
        delay: {
            value: 10000,
            get: function() { return this.value; }
        },
        life: {
            value: 100,
            get: function() { return this.value; }
        }
    }


}