const discord = require("discord.js");
const client = new discord.Client();
const delay = require("delay");

const config = require("./config");
const kiwiHours = require("./kiwiHours");

client.config = config;

client.on('ready', () => {
    console.log("discord.js client ready.");
    console.log(client.guilds.keyArray());
});

kiwiHours(client);
console.log("Kiwi-bot is ready.");

client.login(config.key);