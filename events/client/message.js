const { PREFIX } = require("./../../config.js");

module.exports = async (client, message) => {
  
  if (message.channel.type === "dm") return;
  if (message.channel.type === "group") return;
  if (!message.content.startsWith(PREFIX)) return;
  if (message.author.bot) return;
  
  var args = message.content.slice(PREFIX.length).split('/+/');
  let cmdName = args.shift().toLowerCase();
  let cmd = client.commands.get(cmdName) || client.commands.get(client.aliases.get(cmdName));
  if (!cmd) return;
  
  cmd.run(client, message, args)
  
}
