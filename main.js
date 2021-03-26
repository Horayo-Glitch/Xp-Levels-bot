const { Client, Collection } = require("discord.js");
const { TOKEN, PREFIX } = require("./config.js");
const colors = require("colors");
const canvas = require("canvas");
const Levels = require("discord-xp");
const fs = require("fs");
const client = new Client();

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

const loadCommands = (dir = "./commands") => {
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


client.login(TOKEN);
