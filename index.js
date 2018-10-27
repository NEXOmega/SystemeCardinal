const botconfig = require("./config.json");
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require("fs");
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js" && !f.startsWith("!"))
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands");
        return;
    }

    jsfile.forEach((f,i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded !`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);

  bot.user.setActivity("des débats.", {type: "WATCHING"});
});

bot.on('message',async  msg => {
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let mod_prefix = botconfig.module_prefix;
    let messageArray = msg.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd[0] = prefix) {
        let commandfile = bot.commands.get(cmd.slice(prefix.length));
        if(commandfile) commandfile.run(bot, msg, args);

    } 
    
});

bot.login(botconfig.token);
