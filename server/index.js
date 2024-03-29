const PORTS = {
    http: 81,
    ucon: 1005,
    udpRaw: 2005
}

const express = require('express');
const http = require('http');
const socketio = require("socket.io")
const ucon = require("./src/ucon").server("0.0.0.0", PORTS.ucon)
const socket = require("dgram").createSocket("udp4")
const Split = require("stream-split")
const jwt = require('jsonwebtoken')

const app = express()
const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: '*',
    }
})

app.use(express.json())

ROOT_DIR = "./client"

app.use(express.static(ROOT_DIR))

const NALSeparator = new Buffer.from([0, 0, 0, 1])
const NALSplitter = new Split(NALSeparator)

socket.on("listening", () => {
    var address = socket.address();
    var port = address.port;

    console.log("UDP Server online: " + port);
})

socket.on("message", (data, info) => {
    NALSplitter.write(data)
})

NALSplitter.on("data", (data) => {
    io.sockets.emit("stream", data)
})

io.on("connection", client => {
    console.log("new client connected")

    client.on("controls", controls => {
        console.log(controls.axes[0].toFixed(3) * 500 + 1500);
        ucon.broadcast("car-controls", controls)
    })

    client.on("shell-in", data => {
        io.sockets.emit("shell-in", data)
    })

    client.on("shell-out", data => {
        io.sockets.emit("shell-out", data)
    })

    client.on("shell-resize", data => {
        io.sockets.emit("shell-resize", data)
    })

})

server.listen(PORTS.http, () => {
    console.log(`online on ${PORTS.http}`);
})

socket.bind(PORTS.udpRaw, "0.0.0.0")