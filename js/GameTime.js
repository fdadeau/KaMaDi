var GameTime = (function () {
    function GameTime(time) {
        this.tick = 0;
        this.time = 0;
        this.previousTime = 0;
        this.setTime(time || 0);
    }
    GameTime.prototype.setTime = function (time) {
        this.previousTime = this.time;
        this.time = time;
        this.tick = time - this.previousTime;
    };
    GameTime.prototype.update = function () {
        this.setTime(this.now());
    };
    
    
    // time property
    var now = Date.now;
    var performance = window.performance;
    if (performance)
    {
        // It seems high resolution "now" requires a proper "this"
        if (performance.now)
        {
            now = function nowFn()
            {
                return performance.now();
            };
        }
        else if (performance.webkitNow)
        {
            now = function nowFn()
            {
                return performance.webkitNow();
            };
        }
    }
    
    GameTime.prototype.now = now;
    
    return GameTime;
})();
