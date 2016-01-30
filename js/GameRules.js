/**
 *  Game rules
 */
function GameRules() {

    this.shaman = {
        // temps de recharge
        loadingTime: { 
            value: 60 * 1000,
            get: function() { return this.value; } 
        }
    };
    
    this.ennemies = {
        // nombre d'ennemis/vague
        nbEnnemiesByWave: {
            //value: 30,
            value: 10,
            get: function() { return this.value; }
        },
        // frequence d'apparition
        delay: {
            value: 10 * 1000,
            get: function() { return this.value; }
        },
        life: {
            value: 100,
            get: function() { return this.value; }
        },
        speed: {
            value: 1,
            get: function() { return this.value; }
        }
    }
    
    this.character = {
        
        nbStartCharacter: {
            value: 4,
            get: function() { return this.value; }
        },
        life: {
            value: 100,
            get: function() { return this.value; }
        },
        speed: {
            value: 5,
            get: function() { return this.value; }
        },
        attackDelay: {
            value: 100,
            get: function() { return this.value; }
        },
        attackRange: {
            value: 300,
            get: function() { return this.value; }
        }
    }


}