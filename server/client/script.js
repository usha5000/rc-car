const socket = io()
const display = vie.get('#display')

window.addEventListener("gamepadconnected", function(e) {
    console.log("Gamepad connected")
    updateControls();
})

const controls = {}

function updateControls() {
    const gamepad = navigator.getGamepads()[0]
    controls.axes = gamepad.axes

    controls.square = gamepad.buttons[2].value
    controls.x = gamepad.buttons[0].value
    controls.triangle = gamepad.buttons[3].value
    controls.circle = gamepad.buttons[1].value

    controls.L2 = Number(gamepad.buttons[6].value.toFixed(3))
    controls.R2 = Number(gamepad.buttons[7].value.toFixed(3))

    socket.emit("controls", controls)

    setTimeout(() => {
        updateControls()
    }, 100);

}

function updateOverlay(key, val) {
    const target = vie.get("#stat_" + key)
    target.innerHTML = `${key}: ${val}`
}


