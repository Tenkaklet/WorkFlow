const dotenv = require('dotenv');
const Discord = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

// Initialize dotenv & Discord
dotenv.config();
client.login(process.env.DISCORD_TOKEN);

// When message is recieved in Server
client.on('messageCreate', async message => {
    const prefix = "!";
    if (message.author.bot || !message.content.startsWith(prefix)) {
        return;
    }

    if (message.channelId === process.env.TESTING_ID) {
        console.log('in the right place');
        // Do something.
        const messageBody = message.content.slice(prefix.length);
        const args = messageBody.split(' ');
        const query = args.shift().toLocaleLowerCase();
        const row = new MessageActionRow().addComponents(new MessageSelectMenu().setCustomId('select').setPlaceholder('Välj ett alternativ').addOptions([
            {
                label: 'Select me',
                description: 'This is a description',
                value: 'first_option',
            },
            {
                label: 'You can select me too',
                description: 'This is also a description',
                value: 'second_option',
            },
        ]),
        );

        const header = 'Välkommen till WorkFlow.\n Välj ett alternativ för att fortsätta.';
        await message.reply({ content: header, components: [row] });

        


    } else {
        // Don't do anything.
        return;
    }

});