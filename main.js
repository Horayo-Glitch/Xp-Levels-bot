const { Client, Collection } = require("discord.js");
const { TOKEN, PREFIX } = require("./config.js");
const colors = require("colors");
const canvacord = require("canvacord");
const Levels = require("discord-xp");
const fs = require("fs");
const client = new Client();

Levels.setUrl("mongodb://..."); // a valid mongodb !

client.commands = new Collection()

const loadEvents = (dir = "./events") => {
  fs.readdirSync(dir).forEach(dirs => {
    const events = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
    
    for (const event of events) {
      const eventName = events.split(".")[0];
      console.log("[EVENT]".red + "Event Loaded >".white + `${eventName}.js`.red);
    };
  });
};
loadEvents();

const loadCommands = (dir = "./Commands") => {
fs.readdirSync(dir).forEach(dirs => {
  const command = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
  
  for (const file of  command) {
    const commandName = fs.readdirSync(`${dir}/${dirs}/${file}`);
    client.command.set(commandName.help.name, commandName);
     command.help.aliases.forEach(alias => {
            client.aliases.set(alias, command.help.name);
        });
    console.log("[COMMAND]".red + "Command Loaded >".white + `${commandName}.js`.red);
  };
});
};
loadCommands();

client.on("message", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
  
  const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
  const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
  if (hasLeveledUp) {
    const user = await Levels.fetch(message.author.id, message.guild.id);
    message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);
  }
  
});


client.login(TOKEN);
