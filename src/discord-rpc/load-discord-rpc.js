module.exports = function load() { 
    const discordrpc = require("discord-rpc")
    const colors = require("colors")
    const rpc = new discordrpc.Client({ transport: 'ipc'});

    rpc.on("ready", async() => {
        try { rpc.setActivity({
            details: "The pl Graphics Engine",
            largeImageKey: "icon",
            largeImageText: "plGE",
        }) }
        catch { console.log("[!] Impossible to init the Discord RPC"); process.exit(1); }
        console.log("[*] plGE Discord RPC Started!".green + "\nLogged as: " + (rpc.user.username).red)
    })

    rpc.login({ clientId: "851869772047319123"})
}