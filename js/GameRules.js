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
    
    this.ennemies = { // value : 0 = chargeur, 1 : tireur
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
            value: [ 10, 10 ],
            get: function(index) { return this.value[index]; }
        },
        speed: {
            value: [ 1, 1 ],
            get: function(index) { return this.value[index]; }
        },
        attackDelay: {
            value: [ 1000, 1000 ],
            get: function(index) { return this.value[index]; }
        },
        attackSpeed: {
            value: [ 10, 10 ],
            get: function(index) { return this.value[index]; }
        },
        attackDamage: {
            value: [ 2, 1 ],
            get: function(index) { return this.value[index]; }
        },
        attackRange: {
            value: [ 45, 200 ],
            get: function(index) { return this.value[index]; }
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
            value: 1000,
            get: function() { return this.value; }
        },
        attackRange: {
            value: 200,
            get: function() { return this.value; }
        },
        attackDamage: {
            value: 4,
            get: function() { return this.value; }
        },
        attackSpeed: {
            value: 10,
            get: function() { return this.value; }
        }
    }


}