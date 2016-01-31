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
            value: [3, 4, 5, 6, 7],
            get: function(niveau, time) { return this.value[niveau] * (1 + time / (1000 * 60 * 3)); }
        },
        // frequence d'apparition
        delay: {
            value: [20 * 1000, 17 * 1000, 15 * 1000, 13 * 1000, 11 * 1000],
            get: function(niveau, time) { return this.value[niveau]; }
        },
        life: {
            value: [ 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10 ],
            get: function(index) { return this.value[index]; }
        },
        speed: {
            value: [ 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6 ],
            get: function(index) { return this.value[index]; }
        },
        escapSpeed: {
            value: [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ],
            get: function(index) { return this.value[index]; }
        },
        attackDelay: {
            value: [ 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000 ],
            get: function(index) { return this.value[index]; }
        },
        attackSpeed: {
            value: [ 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10 ],
            get: function(index) { return this.value[index]; }
        },
        attackDamage: {
            value: [ 6, 6, 6, 6, 6, 6, 3, 3, 3, 3, 3, 3 ],
            get: function(index) { return this.value[index]; }
        },
        attackRange: {
            value: [ 45, 45, 45, 45, 45, 45, 200, 200, 200, 200, 200, 200 ],
            get: function(index) { return this.value[index]; }
        }
    }
    
    this.character = {
        
        nbStartCharacter: {
            value: 5,
            get: function() { return this.value; }
        },
        life: {
            value: [30, 30, 30, 60],
            get: function(numtype) { return this.value[numtype]; }
        },
        timeStun: {
           value: 1000 * 13,
           get: function() { return this.value; }  
        },
        speed: {
            value: [10, 5, 5, 5],
            get: function(numtype) { return this.value[numtype]; }
        },
        attackDelay: {
            value: [1000, 500, 1000, 1000],
            get: function(numtype) { return this.value[numtype]; }
        },
        attackRange: {
            value: [200, 200, 400, 200],
            get: function(numtype) { return this.value[numtype]; }
        },
        attackDamage: {
            value: [6, 6, 6, 6],
            get: function() { return this.value; }
        },
        attackSpeed: {
            value: [10, 10, 10, 10],
            get: function() { return this.value; }
        }
    }


}