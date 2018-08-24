const discord = require("discord.js");
const client = new discord.Client();
const delay = require("delay");

const config = require("./config");

async function waitForKiwiHours(){ // jshint ignore: line
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
    await delay(5000); // jshint ignore: line
    return 0;
}

client.on('ready', () => {
    console.log("discord.js client ready.");
    waitForKiwiHours().then(()=>{
        console.log("Kiwi appreciation mode active.");
    }).catch((err)=>{
        throw err;
    });
    console.log("Kiwi-bot is ready.");
});

client.login(config.key);