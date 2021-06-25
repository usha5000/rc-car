const cp = require("child_process")
const conf = require("../data/config.json")

module.exports = {
    initiate: (config) => {
        initiate(config)
    }
}

function initiate(config) {
    var bitrate = config.video.rate
    var fps = config.video.fps

    var command = `raspivid -w ${config.video.width} -h ${config.video.height} -fps ${fps} -b ${bitrate} -br ${config.video.brightness} -t 0 -pf baseline -ISO 1600 -awb auto -ex antishake -co 20 -mm average -o - | socat - udp-sendto:${config.host}:${config.port_udp_raw},shut-none`

    const stream = spawner(command)
    console.log("Stream started!");
}

function spawner(command) {
    const process = cp.spawn(command, [], { shell: true })

    process.stdout.on('data', (data) => {
        console.log(`[Streamer]: ${data}`);
    });
      
    process.stderr.on('data', (data) => {
        console.error(`[Streamer Error]: ${data}`);
    });
    
    process.on('close', (code) => {
        console.log(`[Streamer] Process ended: ${code}`);
    });

    return process
}
