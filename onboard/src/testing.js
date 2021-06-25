const gpio = require('pigpio').Gpio;

const testingConf = {
    max: 2000,
    min: 1000,
    step: 20
}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, ms);
    })
}




async function test(pin) {
    const motor = new gpio(pin.servo, {mode: gpio.OUTPUT})
    const servo = new gpio(pin.motor, {mode: gpio.OUTPUT})

    while(true) {
        for(i =testingConf.min; i < testingConf.max; i += testingConf.step) {
            const val = Math.round(i / 100 * 2000)
            console.log(i);
            motor.servoWrite(i)

            await sleep(500)
        }
        
        console.log("test finished");
        await sleep(1000)
    }
}

test({servo: 18, motor: 17})