const pty = require("node-pty");
const os = require("os");
const io = require("socket.io-client")
const config = require("../data/config.json")

function init() {
    const socket = io(`http://${config.host}:${config.port_http}`)
    console.log(config.host);

    const shellType = os.platform() === "win32" ? "powershell.exe" : "bash";

    const shell = pty.spawn(shellType, [], {
        name: "xterm-color",
        cols: 80,
        rows: 80,
        cwd: "/home/pi",
        env: process.env
    });

    console.log(`shell ready [${config.host}]`);

    socket.on("shell-in", data => {
        shell.write(data)
    })

    socket.on("shell-resize", data => {
        shell.resize(data.cols, data.rows);
    })

    shell.on("data", data => {
        socket.emit("shell-out", data)
    })

}

init()
