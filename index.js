
const zkillWebSocket = require('./bot/zkillWebSocket.js');
const discord = require('./bot/discordClient.js');
const sde = require('./bot/sde.js');


discord.connectToDiscord();
zkillWebSocket.connectToZkillWebSocket();


