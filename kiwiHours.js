const discord = require("discord.js");
const delay = require("delay");

async function waitForKiwiHours(channel, time) { // jshint ignore: line
    var current = new Date(Date.now());
    //current.setDate(current.getDate()-4);
    var kiwihours = new Date(current.getFullYear(),
        current.getMonth(),
        current.getDate(),
        21-4,
        40);
    while (true) {
        if (kiwihours.getDay() == 2) {
            kiwihours.setDate(kiwihours.getDate() + 1);
        }
        console.log("It is currently " + current.toUTCString());
        console.log("Waiting until " + kiwihours.toUTCString());
        console.log("Waiting for " + (kiwihours.getTime() - current.getTime()) + " ms");
        await delay(kiwihours.getTime() - current.getTime()); // jshint ignore: line
        //await delay(); // jshint ignore: line

        console.log(`Alerting ${channel.guild.id} about real kiwi hours`);
        channel.send("test");
        kiwihours.setDate(kiwihours.getDate()+1);
    }
}


module.exports = async function(client) { // jshint ignore:line
    var kiwiReserves = client.config.kiwi_enabled;
    if (kiwiReserves===undefined){
        return;
    }
    kiwiReserves.forEach(serverId => {
        var settings = client.config.getServerSettings(serverId);

        console.log(`Setting up kiwi alarm on ${serverId}`);
        try {
            server = client.guilds.get(serverId);
            if (server===undefined) {throw new TypeError(`${serverId} not found in client.guilds.`);}
            channel = server.channels.get(settings.kiwi_channel);
            if (channel === undefined) { throw new TypeError(`${settings.kiwi_channel} not found in server.channels.`); }
        } catch (e) {
            console.log(e);
            console.log("Error fetching channel. Make sure config.json is set up right.");
            throw e;
        }

        waitForKiwiHours(channel, settings.kiwi_time);
    });
    console.log("Kiwi Appreciation Protocol active.");
}