const fs = require("fs");

const defaultConfig = {
    "global": {
        "prefix": "!kiwi ",

        "kiwi-enabled": false,
        "kiwi-channel": "",
        "kiwi-time": "2140 -0500"
    }
};

var config;

try {
    fs.readFileSync("./config.json", "utf8");

    config = JSON.parse(data);
    // Add default settings
    config = Object.assign(defaultConfig, config); 
} catch (err) {
    config = defaultConfig;
}

module.exports = config;
module.exports.key = process.env.KIWI_KEY;

module.exports.getServerSettings = function(serverId) {
    var serverSettings;
    try {
        serverSettings = config.servers[serverId];
    } catch (e) {
        serverSettings = {};
    }

    serverSettings = Object.assign(defaultConfig, serverSettings);
    return serverSettings;
};