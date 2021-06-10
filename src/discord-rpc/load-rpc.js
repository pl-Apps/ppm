module.exports = function load() {
    const discordrpc = require("discord-rpc");
    const rpc = new discordrpc.Client({ transport: 'webSocket' });

    rpc.on("ready", async() => {
        rpc.setActivity({
            largeImageText: "ppm",
            smallImageKey: "pl package manager",
            startTimestamp: 1507665886,
            largeImageKey: "ppm"
        })
    })

    rpc.login("852571054411874406");
}
const discordrpc = require("discord-rpc");
const rpc = new discordrpc.Client({ transport: 'ipc' });

rpc.on("ready", async() => {
    rpc.setActivity({
        largeImageText: "ppm",
        smallImageKey: "pl package manager",
        startTimestamp: 1507665886,
        largeImageKey: "ppm"
    })
})

rpc.login("852571054411874406");