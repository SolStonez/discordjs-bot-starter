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
					{ name: 'Legion of Sol', value: "legionofsol" }
				))
		.addNumberOption(option =>
			option.setName('id')
				.setDescription('The id to search for')
				.setRequired(true)),

	// new SlashCommandBuilder()
	// 	.setName('send')
	// 	.setDescription('Send SOL to a wallet address.')
	// 	.addStringOption(option =>
	// 		option.setName('address')
	// 			.setDescription('Address sending to.')
	// 			.setRequired(true))
	// 	.addNumberOption(option =>
	// 		option.setName('amount')
	// 			.setDescription('Amount of SOL to send')
	// 			.setRequired(true)),

	// new SlashCommandBuilder()
	// 	.setName('balance')
	// 	.setDescription('Get you SOL balance'),

	// new SlashCommandBuilder()
	// 	.setName('coinflip')
	// 	.setDescription('Flip a coin, double or nothing.'),
		
	new SlashCommandBuilder()
		.setName('pfp')
		.setDescription(`Display your discor PFP, or a user's`)
		.addUserOption(option => 
			option.setName('user')
			.setDescription(`The user's name of the pfp you want to see`)
			.setRequired(false)),


	new SlashCommandBuilder().setName('newwallet').setDescription('create a new wallet')
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORDJS_BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);