const gpio = require('pigpio').Gpio;
const servo = new gpio(17, {mode: gpio.OUTPUT })
const motor = new gpio(18, {mode: gpio.OUTPUT })

function init(ucon) {
    ucon.on("car-controls", data => {
        let axes = Math.round(data.axes[0] * 500 + 1500)
        servo.servoWrite(axes)
        console.log(axes);

        let gas = Math.round(data.R2 * 500 + 1500)
        let reverse = Math.round(data.L2 * -1 * 500 + 1500)

        if (data.L2 > 0) {
            motor.servoWrite(reverse)
        } else {
            motor.servoWrite(gas)
        }
    
    })
}

module.exports = {
    start: function(ucon) {
        init(ucon)
    }
}



