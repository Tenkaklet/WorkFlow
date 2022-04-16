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
        doSomething(message, prefix);
    } else {
        // Don't do anything.
        return;
    }

});

const doSomething = async (message, prefix) => {
    const messageBody = message.content.slice(prefix.length);
    const args = messageBody.split(' ');
    const query = args.shift().toLocaleLowerCase();
    const row = new MessageActionRow().addComponents(new MessageSelectMenu().setCustomId('select').setPlaceholder('Välj ett alternativ').addOptions([
        {
            label: 'Hjälp med App idé',
            description: 'Här kan du fråga mig om vad din nya App ska handla om!',
            value: 'help-with-app',
        },
        // TODO: Yttligare idéer?
        // {
        //     label: 'You can select me too',
        //     description: 'This is also a description',
        //     value: 'Gustav är bäst',
        // },
    ]),
    );

    const header = 'Välkommen till WorkFlow.\n Välj ett alternativ för att fortsätta.';
    await message.reply({ content: header, components: [row] });
};

client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === 'select' && interaction.values[0] === 'help-with-app') {
        const row = new MessageActionRow().addComponents(new MessageSelectMenu().setCustomId('select').setPlaceholder('Korrekt?').addOptions([
            {
                label: 'Ja',
                description: 'Gå vidare till nästa steg',
                value: 'help-with-app-next-step',
            },
            {
                label: 'Nej',
                description: 'Gå tillbaka till föregående meny',
                value: 'start-over',
            },
        ]),
        );
    
        const header = 'Du valde att hjälpa dig med din nya App.';
        await interaction.reply({ content: header, components: [row] });
    }
});