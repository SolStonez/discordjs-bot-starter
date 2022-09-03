const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const dotenv = require('dotenv').config()

const commands = [
	new SlashCommandBuilder()
	.setName('rank')
	.setDescription('Sends info about a Legion NFT')
	.addStringOption(option =>
		option.setName('collection')
			.setDescription('the collection to search under')
			.setRequired(true)
			.addChoices(
				{name: 'Legion of Sol', value:"legionofsol"}
			))
	.addNumberOption(option => 
		option.setName('id')
		.setDescription('The id to search for')
		.setRequired(true))
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORDJS_BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);