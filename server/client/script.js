const socket = io()

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

function fpsCounter() {
    let lastCalledTime
    let fpsTag = document.getElementById("stat_fps")

    if(!lastCalledTime) {
        lastCalledTime = Date.now();
        fps = 0;
        return;
     }
     delta = (Date.now() - lastCalledTime)/1000;
     lastCalledTime = Date.now();

     fpsTag.innerHTML = 1/delta
}
