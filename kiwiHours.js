const discord = require("discord.js");
const delay = require("delay");

async function waitForKiwiHours(channel, time) { // jshint ignore: line
    const hours = parseInt(time.substring(0,2));
    const mins = parseInt(time.substring(2,4));
    let current = new Date(Date.now());
    //current.setDate(current.getDate()-4);
    let kiwihours = new Date(Date.UTC(current.getFullYear(),
        current.getMonth(),
        current.getDate(),
        hours,
        mins));
    while (true) {
        if (kiwihours.getUTCDay() == 3 || (kiwihours.getTime() - current.getTime()) < 0) {
            kiwihours.setDate(kiwihours.getDate() + 1);
        }
        console.log("It is currently " + current.toUTCString());
        console.log("Waiting until " + kiwihours.toUTCString());
        console.log("Waiting for " + (kiwihours.getTime() - current.getTime()) + " ms");
        await delay(kiwihours.getTime() - current.getTime()); // jshint ignore: line
        //await delay(); // jshint ignore: line

        console.log(`Alerting ${channel.guild.id} about real kiwi hours`);
        channel.send(
`it is currently real kiwi hours
please leave a like and share to support our fellow kiwis
https://youtu.be/W_FbRoly_4M`);
        kiwihours.setDate(kiwihours.getDate()+1);
    }
}


module.exports = async function(client) { // jshint ignore:line
    let kiwiReserves = client.config.kiwi_enabled;
    if (kiwiReserves===undefined){
        return;
    }
    if (client.debug){
        console.log("Debug mode. Skipping kiwi hours...");
        return;
    }
    kiwiReserves.forEach(serverId => {
        let settings = client.config.getServerSettings(serverId);

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
