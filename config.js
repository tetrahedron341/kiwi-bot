const fs = require("fs");

fs.readFile("./config.json", "utf8", (err, data) => {
    if (err!=null) {
        throw err;
    }
    module.exports = JSON.parse(data);
    module.exports.key = process.env.KIWI_KEY;
});
