const PORTS = {
    http: 81,
    ucon: 1000,
    udpRaw: 2000
}

const express = require('express');
const http = require('http');
const socketio = require("socket.io")
const ucon = require("./src/ucon").server("0.0.0.0", PORTS.ucon)
const socket = require("dgram").createSocket("udp4")
const Split = require("stream-split")
const jwt = require('jsonwebtoken')
const config = require('./db/knexfile.js')['development'];
const knex = require('knex')(config)

const app = express()
const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: '*',
    }
})

const pepper = "geheimstring"

app.use(express.json())

ROOT_DIR = "./client"

app.use(express.static(ROOT_DIR))

app.post('/api/user/login', async (req,res) => {
    let credentials = req.body

    let users = await knex('user')
    .where('username', credentials.username)
    .where('password', credentials.password)

    let user = users[0]

    if (user) {
        if (user.password === credentials.password) {
            let payload = {username:user.username, role:"ist nicht bekannt"}
            let token = jwt.sign(payload, pepper)
            res.json({ 
              token: token
            })
        }
    } else {
        console.log("user not found!");
        res.json("Anmeldung Fehlgeschlagen")
    }
})

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