const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const dotenv = require('dotenv').config()
const axios = require('axios')

const { EmbedBuilder } = require('discord.js');
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
}); 

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'rank') {
		
		
		await interaction.deferReply()
		
		const id = (interaction.options.getNumber('id'))
				
				if(id > 9999 || id < 0){
					interaction.editReply("There are only 9,999 NFTs in this collection")
					return
				}

		
		const findrank = {
			method: "get",
			url: `https://moonrank.app/mints/${interaction.options.getString('collection')}`,
			headers: {}

		}
		


		const response = await axios(findrank)
		
		if(response.status !== 200) {
			
			await interaction.editReply("something went wrong.");
			return
			
		}

				const nft = await response.data.mints.find(item => item.name === ` Legion of Sol #${id}`)
				
				
				
				const nftEmbed = new EmbedBuilder()
					.setColor('0x0099ff')
					.setTitle(`Legion of Sol #${id}`)
					.setURL(`https://moonrank.app/collection/${interaction.options.getString('collection')}/${nft.mint}`)
					.setDescription(`Rank: ${nft.rank}`)
					.setImage(nft.image)
					.addFields(
						{
							name: 'Mint',
							value: '`'+nft.mint+'`',
							// url: `https://solscan.io/token/${nft.mint}`,
							inline: false,
						},
						{
							name: 'Elite',
							value: nft.rank_explain.find(atty => atty.attribute === 'Elite').value !== ''
								? nft.rank_explain.find(atty => atty.attribute === 'Elite').value : 'None',
							inline: true
						},
						{
							name: 'Skin',
							value: nft.rank_explain.find(atty => atty.attribute === 'Skin').value !== ''
								? nft.rank_explain.find(atty => atty.attribute === 'Skin').value : 'None',
								inline: true
						},
						{
							name: 'Background',
							value: nft.rank_explain.find(atty => atty.attribute === 'Background').value !== ''
								? nft.rank_explain.find(atty => atty.attribute === 'Background').value : 'None',
								inline: true
						},
						{
							name: 'Chest',
							value: nft.rank_explain.find(atty => atty.attribute === 'Chest').value !== ''
								? nft.rank_explain.find(atty => atty.attribute === 'Chest').value : 'None',
								inline: true
						},
						{
							name: 'Accessory',
							value: nft.rank_explain.find(atty => atty.attribute === 'Accessory').value !== ''
								? nft.rank_explain.find(atty => atty.attribute === 'Accessory').value : 'None',
								inline: true
						}, {
							name: 'Eyes',
							value: nft.rank_explain.find(atty => atty.attribute === 'Eyes').value !== ''
								? nft.rank_explain.find(atty => atty.attribute === 'Eyes').value : 'None',
								inline: true
						},
						{
							name: 'Back',
							value: nft.rank_explain.find(atty => atty.attribute === 'Back').value !== ''
								? nft.rank_explain.find(atty => atty.attribute === 'Back').value : 'None',
								inline: true
						}, {
							name: 'Face',
							value: nft.rank_explain.find(atty => atty.attribute === 'Face').value !== ''
								? nft.rank_explain.find(atty => atty.attribute === 'Face').value : 'None',
								inline: true
						},
						{
							name: 'Head',
							value: nft.rank_explain.find(atty => atty.attribute === 'Head').value !== ''
								? nft.rank_explain.find(atty => atty.attribute === 'Head').value : 'None',
								inline: true
						}, {
							name: 'Base Horn Color',
							value: nft.rank_explain.find(atty => atty.attribute === 'Base Horn Color').value !== ''
								? nft.rank_explain.find(atty => atty.attribute === 'Base Horn Color').value : 'None',
								inline: true
						},
						{
							name: 'Piercing',
							value: nft.rank_explain.find(atty => atty.attribute === 'Piercing').value !== ''
								? nft.rank_explain.find(atty => atty.attribute === 'Piercing').value : 'None',
								inline: true
						}
					)
					.setTimestamp()
					.setFooter(
						{
							text: 'We are Legion',
							icon_url: 'https://gateway.pinata.cloud/ipfs/QmY9Bu1j2gvzmN8twJZv986fE1vc8PTVAf3xVdYzkCmjeq',
						}
					)

					await interaction.editReply({ embeds: [nftEmbed] });

					
	}
	
	
});


// Login to Discord with your client's token
client.login(process.env.DISCORDJS_BOT_TOKEN);