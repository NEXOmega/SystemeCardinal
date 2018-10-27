const Discord = require("discord.js");
const suggest_channel = "481055764803354634" // ID DU channel Suggestion

var description = "Permet de créer une suggestion.";
module.exports.run = async(bot, message, args) => {
    var embed = new Discord.RichEmbed()
                    .setColor(0x7ffb40)
                    .setTitle("Suggestion par : " + message.author.username)
                    .setDescription(args.join(" "))
                    .setThumbnail("https://png.pngtree.com/element_pic/16/12/27/6e4114a32c97544caf13096ca219d90e.jpg")
                    .setFooter(">suggest (Decription)")
    bot.channels.get(suggest_channel).send(embed=embed).then( function(message) {
        message.react("👎")
        message.react("👍")
    });
    message.delete()
}

module.exports.help = {
    name: "suggest",
    description: description,
    info:  function() {
        embed = new Discord.RichEmbed()
            .setTitle("Informations")
            .setColor(0xd87aec)
            .setDescription(description)
            .setImage("")
            .addField("suggest (Idée)", "Créer une suggestion.", false)
        return embed;
    }
}