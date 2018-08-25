const fs = require("fs");

const defaultConfig = {
    "global": {
        "prefix": "!kiwi ",

        "kiwi-enabled": false,
        "kiwi-channel": "",
        "kiwi-time": "0140"
    }
};

var config;

try {
    data = fs.readFileSync("config.json", "utf8");

    config = JSON.parse(data);
    // Add default settings
    config = Object.assign(defaultConfig, config); 
} catch (err) {
    console.log(err);
    console.log("config.json not found, using default");
    config = defaultConfig;
}

module.exports = config;
module.exports.key = process.env.KIWI_KEY;

module.exports.getServerSettings = function(serverId) {
    let serverSettings;
    try {
        serverSettings = config.servers[serverId];
    } catch (e) {
        serverSettings = {};
    }

    serverSettings = Object.assign(defaultConfig.global, serverSettings);
    return serverSettings;
};