const config = require("./data/config.json")
const ucon = require("./src/ucon")
const udp = ucon.client(config.host, config.port_udp)
const control = require("./src/control")
const stream = require("./src/stream")


function init() {
    control.start(udp)
    stream.initiate(config)
}

init()
