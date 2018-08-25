const fs = require("fs");
const discord = require("discord.js");
const client = new discord.Client();
const delay = require("delay");
const Enmap = require("enmap");

client.loadedModules = new Set();

client.initialize = function() {
    const config = require("./config");
    client.loadedModules.add("./config");
    const kiwiHours = require("./kiwiHours");
    client.loadedModules.add("./kiwiHours");
    
    client.config = config;
    kiwiHours(client);

    fs.readdir("./events/", (err, files) => {
        if (err) return console.error(err);
        files.forEach((file)=>{
            const event = require(`./events/${file}`);
            client.loadedModules.push(`./events/${file}`); 
            let eventName = file.split(".")[0];
            client.on(eventName, event.bind(null, client));
        });
    });

    client.commands = new Enmap();

    fs.readdir("./commands/", (err, files) => {
        if (err) return console.error(err);
        files.forEach((file) =>{
            if (!file.endsWith(".js")) return;
            let mod = require(`./commands/${file}`);
            client.loadedModules.push(`./commands/${file}`);
            let commandName = file.split('.')[0];
            console.log(`Loading command: ${commandName}`);
            client.commands.set(commandName, mod);
        });
    });
};

client.reload = function() {
    client.loadedModules.forEach(mod => {
        delete require.cache[require.resolve("mod")];
    });
    
    delete client.commands;
    
    client.initialize();
};

client.on('ready', () => {
    console.log("discord.js client ready.");
    console.log(client.guilds.keyArray());

    client.initialize();

    client.login(client.config.key);
});