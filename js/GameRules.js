/**
 *  Game rules
 */
function GameRules() {

    this.shaman = {
        // temps de recharge
        loadingTime: { 
            value: 30 * 1000,
            get: function() { return this.value; } 
        },
        // points de vie
        life: {
            value: 100,
            get: function() { return this.value; }
        } 
    };
    
    this.ennemies = { // value : 0 = chargeur, 1 : tireur
        // nombre d'ennemis/vague
        nbEnnemiesByWave: {
            //value: 30,
            value: [4, 5, 6, 7, 8],
            get: function(niveau, time) { return this.value[niveau] * (1 + time / (1000 * 60 * 2)); }
        },
        // frequence d'apparition
        delay: {
            value: [20 * 1000, 17 * 1000, 15 * 1000, 13 * 1000, 11 * 1000],
            get: function(niveau, time) { return this.value[niveau]; }
        },
        life: {
            value: [ 10, 10 ],
            get: function(index) { return this.value[index]; }
        },
        speed: {
            value: [ 0.6, 0.6 ],
            get: function(index) { return this.value[index]; }
        },
        escapSpeed: {
            value: [ 3, 3 ],
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
            value: [ 6, 3 ],
            get: function(index) { return this.value[index]; }
        },
        attackRange: {
            value: [ 45, 200 ],
            get: function(index) { return this.value[index]; }
        }
    }
    
    this.character = {
        
        nbStartCharacter: {
            value: 5,
            get: function() { return this.value; }
        },
        life: {
            value: 25,
            get: function() { return this.value; }
        },
        timeStun: {
           value: 1000 * 15,
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
            value: 6,
            get: function() { return this.value; }
        },
        attackSpeed: {
            value: 10,
            get: function() { return this.value; }
        }
    }


}