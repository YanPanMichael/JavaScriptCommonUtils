const AutomantuallyTimeDelayIntervalTimer = {
    interval: 1000,
    execCounter: 0,
    timerRef: null,
    doCheck: function () {
        try {
            var that = this;
            that.execCounter++;

            //Real function insert into this below place
            var currentValue = get();
            if (currentValue && Math.abs(originalVaule - currentVaule) > 1) {
                originalVaule = currentValue;
                /**
                 *  ... do somethings
                 */
                that.reset();
            } else {
                if (that.execCounter > 120)
                    that.reset(15 * 1000); //window.clearInterval(that.timerRef);
                else if (that.execCounter == 20)
                    that.reset(3000);
                else if (that.execCounter == 40)
                    that.reset(5000);
                else if (that.execCounter == 80)
                    that.reset(10 * 1000);
            }
        } catch (error) { }
    },
    reset: function (x) {
        try {
            var that = this;
            window.clearInterval(that.timerRef);
            if (!x || typeof x != 'number') {
                that.interval = 1000;
                that.execCounter = 0;
            } else {
                that.interval = x;
            }
            that.timerRef = window.setInterval(this.doCheck, that.interval);
        } catch (error) { }
    }

}