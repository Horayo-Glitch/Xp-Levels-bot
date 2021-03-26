const { MessageEmbed } = require("discord.js");
const Levels = require("discord-xp");
const canvacord = require("canvacord");

module.exports.run = async (client, message, args) => {
  
  const target = message.mentions.users.first() || message.author;
  
  const user = Levels.fetch(target.id, message.guild.id);*
  if (!user) return message.reply("You don't have any xp, try to send messages!");
  
  const neededXp = Levels.xpFor(parseInt(user.level) + 1);

 const rank = new canvacord.Rank()
    .setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png' }))
    .setCurrentXP(user.xp)
    .setRequiredXP(neededXp)
    .setLevel(user.level)
    .setRank(user.rank)
    .setStatus(target.presence.status)
    .setProgressBar("#FFA500", "COLOR")
    .setUsername(target.username)
    .setDiscriminator(target.discriminator);
rank.build()
    .then(data => {
        const attachment = new Discord.MessageAttachment(data, "rank.png");
        message.channel.send(attachment);
    });
  
}

module.exports.help = {
  name: "rank",
  aliases: ["rang"],
  description: "ur rank and level",
}
