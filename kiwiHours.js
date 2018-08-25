const discord = require("discord.js");

async function waitForKiwiHours(time) { // jshint ignore: line
    var current = new Date(Date.now());
    //current.setDate(current.getDate()-4);
    var kiwihours = new Date(current.getFullYear(),
        current.getMonth(),
        current.getDate() + 1,
        1,
        40);
    if (kiwihours.getDay() == 2) {
        kiwihours.setDate(kiwihours.getDate() + 1);
    }
    console.log("It is currently " + current.toUTCString());
    console.log("Waiting until " + kiwihours.toUTCString());
    console.log("Waiting for " + (kiwihours.getTime() - current.getTime()) + " ms");
    await delay(kiwihours.getTime() - current.getTime()); // jshint ignore: line
    return 0;
}


module.exports = function(client) { // jshint ignore:line
    var kiwiReserves = client.config.kiwi_enabled;
    kiwiReserves.forEach(serverId => {
        var settings = client.config.getServerSettings(serverId);
        waitForKiwiHours(settings.kiwi_time).then(()=>{
            server = client.guilds.get(serverId);
            server.
        });
    });
}