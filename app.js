const dotenv = require('dotenv');
const Discord = require('discord.js');
const client = new Discord.Client({intents: ['GUILDS', 'GUILD_MESSAGES']});

// Initialize dotenv & Discord
dotenv.config();
client.login(process.env.DISCORD_TOKEN);

// When message is recieved in Server
client.on('messageCreate', message => {
    
});