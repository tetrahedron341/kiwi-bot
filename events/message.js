module.exports = (client, message) => {
    console.log(`[(${message.guild.name},${message.channel.name}), ${message.author.username}]: ${message.content}`);
    
    if (message.author.bot) return;
    let prefix = client.config.getServerSettings(message.guild.id).prefix;
    
    if (message.content.startsWith(prefix)){        
        let args = message.content.substring(prefix.length).split(" ");
        let command = args.shift().toLowerCase();

        console.log(`Command ${command} run with args ${args}`);
        
        let cmd = client.commands.get(command);

        if (!cmd) {
            message.channel.send("*Confused kiwi noises*");
            return;
        }

        cmd.run(client, message, args);
    }
};