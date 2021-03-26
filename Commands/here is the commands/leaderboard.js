const { MessageEmbed } = require("discord.js");
const Levels = require("discord-xp");
const canvacord = require("canvacord");

module.exports.run = async (client, message, args) => {
  
  const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);

if (rawLeaderboard.length < 1) return reply("Nobody in the leaderboard.");

const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);

const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);

   let embed = new MessageEmbed()
   .setColor("RANDOM")
   .setThumbnail(client.user.displayAvatarURL())
   .setTitle("**__LEADERBOARD__**\n\n")
   .setDescription(lb.join(" "))
   .setFooter(`${client.user.tag} Bot | Leaderboard`, client.user.displayAvatarURL())
   .setTimestamp()
   message.channel.send(embed)
  
}

module.exports.help = {
  name: "leaderboard",
  aliases: ["lb"],
  description: "the levels leaderboard of the guild",
}
