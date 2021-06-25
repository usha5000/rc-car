const streamStats = {
    frames: 0,
    rate: 0
}

function initateStream() {
    window.player = new Player({ useWorker: true, webgl: 'auto', size: { width: 480, height: 360 } })
    const playerElement = document.getElementById('display')
    playerElement.appendChild(window.player.canvas)

    console.log("stream ready");

    streamStats.frames++

    socket.on("stream", data => {
        const u8 = new Uint8Array(data)

        window.player.decode(u8);
    })
}

initateStream()