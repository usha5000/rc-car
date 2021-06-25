const streamStats = {
    frames: 0,
    rate: 0
}

function initateStream() {
    window.player = new Player({ useWorker: true, webgl: 'auto', size: { width: 480, height: 360 } })
    const playerElement = document.getElementById('display')
    playerElement.appendChild(window.player.canvas)

    console.log("stream ready");


    socket.on("stream", data => {
        const u8 = new Uint8Array(data)

        streamStats.frames++
        /* updateOverlay("rate", u8.length) */

        window.player.decode(u8);
    })

    setInterval(() => {
        const fps = streamStats.frames * 2
        let fpsStat = document.getElementById("stat_fps")
        fpsStat.innerHTML = `FPS: ${fps}`
        /* updateOverlay("fps", fps) */
        streamStats.frames = 0
    }, 500);
}

initateStream()