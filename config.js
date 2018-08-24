const fs = require("fs");

const defaultConfig = {
    "global": {
        "prefix": "!kiwi ",

        "kiwi-enabled": false,
        "kiwi-channel": "",
        "kiwi-time": "2140 -0500"
    }
};

fs.readFile("./config.json", "utf8", (err, data) => {
    var config;
    if (err!=null) {
        config = defaultConfig;
    } else {
        config = JSON.parse(data);
        // Add default settings
        config = Object.assign(defaultConfig, config); 
    }

    module.exports = config;
    module.exports.key = process.env.KIWI_KEY;
});
