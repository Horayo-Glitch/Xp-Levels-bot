const colors = require("colors");

module.exports = async (client) => {
  
  console.log(`Xp bot connected!`.green);
  
  client.user.setPresence({
    statut: "online",
    activity: {
      name: "Xp bot created by horayo",
      type: "STREAMING",
    }
  })
}
