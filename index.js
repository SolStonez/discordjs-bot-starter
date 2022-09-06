const { Client, GatewayIntentBits, AttachmentBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const dotenv = require('dotenv').config()
const axios = require('axios')
const { MongoClient, ServerApiVersion } = require('mongodb');
const Web3 = require('@solana/web3.js')

const { EmbedBuilder } = require('discord.js');
// Create a new client instance
const clientDC = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
clientDC.once('ready', () => {
	console.log('Ready!');
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

clientDC.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const connection = new Web3.Connection(
		process.env.MAIN_RPC,
		'confirmed');

	const { commandName } = interaction;

	// if (commandName === 'rank') {


	// 	await interaction.deferReply()

	// 	const id = (interaction.options.getNumber('id'))

	// 	if (id > 9999 || id < 0) {
	// 		interaction.editReply("There are only 9,999 NFTs in this collection")
	// 		return
	// 	}


	// 	const findrank = {
	// 		method: "get",
	// 		url: `https://moonrank.app/mints/${interaction.options.getString('collection')}`,
	// 		headers: {}

	// 	}



	// 	const response = await axios(findrank)

	// 	if (response.status !== 200) {

	// 		await interaction.editReply("something went wrong.");
	// 		return

	// 	}

	// 	const nft = await response.data.mints.find(item => item.name === ` Legion of Sol #${id}`)



	// 	const nftEmbed = new EmbedBuilder()
	// 		.setColor('0x0099ff')
	// 		.setTitle(`Legion of Sol #${id}`)
	// 		.setURL(`https://moonrank.app/collection/${interaction.options.getString('collection')}/${nft.mint}`)
	// 		.setDescription(`Rank: ${nft.rank}/9999`)
	// 		.setImage(nft.image)
	// 		.addFields(
	// 			{
	// 				name: 'Mint',
	// 				value: '`' + nft.mint + '`',
	// 				// url: `https://solscan.io/token/${nft.mint}`,
	// 				inline: false,
	// 			},
	// 			{
	// 				name: 'Elite',
	// 				value: nft.rank_explain.find(atty => atty.attribute === 'Elite').value !== ''
	// 					? nft.rank_explain.find(atty => atty.attribute === 'Elite').value : 'None',
	// 				inline: true
	// 			},
	// 			{
	// 				name: 'Skin',
	// 				value: nft.rank_explain.find(atty => atty.attribute === 'Skin').value !== ''
	// 					? nft.rank_explain.find(atty => atty.attribute === 'Skin').value : 'None',
	// 				inline: true
	// 			},
	// 			{
	// 				name: 'Background',
	// 				value: nft.rank_explain.find(atty => atty.attribute === 'Background').value !== ''
	// 					? nft.rank_explain.find(atty => atty.attribute === 'Background').value : 'None',
	// 				inline: true
	// 			},
	// 			{
	// 				name: 'Chest',
	// 				value: nft.rank_explain.find(atty => atty.attribute === 'Chest').value !== ''
	// 					? nft.rank_explain.find(atty => atty.attribute === 'Chest').value : 'None',
	// 				inline: true
	// 			},
	// 			{
	// 				name: 'Accessory',
	// 				value: nft.rank_explain.find(atty => atty.attribute === 'Accessory').value !== ''
	// 					? nft.rank_explain.find(atty => atty.attribute === 'Accessory').value : 'None',
	// 				inline: true
	// 			}, {
	// 			name: 'Eyes',
	// 			value: nft.rank_explain.find(atty => atty.attribute === 'Eyes').value !== ''
	// 				? nft.rank_explain.find(atty => atty.attribute === 'Eyes').value : 'None',
	// 			inline: true
	// 		},
	// 			{
	// 				name: 'Back',
	// 				value: nft.rank_explain.find(atty => atty.attribute === 'Back').value !== ''
	// 					? nft.rank_explain.find(atty => atty.attribute === 'Back').value : 'None',
	// 				inline: true
	// 			}, {
	// 			name: 'Face',
	// 			value: nft.rank_explain.find(atty => atty.attribute === 'Face').value !== ''
	// 				? nft.rank_explain.find(atty => atty.attribute === 'Face').value : 'None',
	// 			inline: true
	// 		},
	// 			{
	// 				name: 'Head',
	// 				value: nft.rank_explain.find(atty => atty.attribute === 'Head').value !== ''
	// 					? nft.rank_explain.find(atty => atty.attribute === 'Head').value : 'None',
	// 				inline: true
	// 			}, {
	// 			name: 'Base Horn Color',
	// 			value: nft.rank_explain.find(atty => atty.attribute === 'Base Horn Color').value !== ''
	// 				? nft.rank_explain.find(atty => atty.attribute === 'Base Horn Color').value : 'None',
	// 			inline: true
	// 		},
	// 			{
	// 				name: 'Piercing',
	// 				value: nft.rank_explain.find(atty => atty.attribute === 'Piercing').value !== ''
	// 					? nft.rank_explain.find(atty => atty.attribute === 'Piercing').value : 'None',
	// 				inline: true
	// 			}
	// 		)
	// 		.setFooter(
	// 			{
	// 				text: 'Made by Stonez * Ranks by MoonRank',
	// 				icon_url: 'https://gateway.pinata.cloud/ipfs/QmY9Bu1j2gvzmN8twJZv986fE1vc8PTVAf3xVdYzkCmjeq',
	// 			}
	// 		)

	// 	await interaction.editReply({ embeds: [nftEmbed] });


	// }

	// if (commandName === 'newwallet') {

	// 	const uri = process.env.MONGO_URI;
	// 	const client = new MongoClient(uri);
	// 	async function run() {
	// 		try {
	// 			const database = client.db('users');
	// 			const wallets = database.collection('wallets');

	// 			const user = interaction.user
	// 			const discordID = user.id
	// 			const username = user.username + '#' + user.discriminator

	// 			//Check if user exists
	// 			const query = { discordID: discordID }
	// 			const check = await wallets.findOne(query);


	// 			if (check === null) {

	// 				const keypair = Web3.Keypair.generate()
	// 				const publicKey = keypair.publicKey.toString()
	// 				const secretKey = new Uint8Array(keypair.secretKey)

	// 				const keystore = []

	// 				secretKey.forEach(int => keystore.push(int))

	// 				await wallets.insertOne({
	// 					discordID: discordID,
	// 					name: username,
	// 					keypair: keypair,
	// 					secretKey: keystore,
	// 					publicKey: publicKey,
	// 					earnings: 0,
	// 					losings: 0,
	// 					win_streak: 0,
	// 					loss_streak: 0
	// 				})

	// 				interaction.reply(
	// 					{ content: `${username} has been added\nYour wallet address is\n${publicKey}`, ephemeral: true })
	// 				return
	// 			}

	// 			else {

	// 				let keypair = Web3.Keypair.fromSecretKey(Uint8Array.from(check.secretKey))

	// 				let pubkey = (keypair.publicKey.toString())

	// 				interaction.reply({ content: `You have already made an account\n${pubkey}`, ephemeral: true })

	// 			}

	// 		} finally {
	// 			// Ensures that the client will close when you finish/error
	// 			await client.close();
	// 		}
	// 	}
	// 	run().catch(console.dir);

	// }

	// if (commandName === 'send') {

	// 	await interaction.deferReply({ ephemeral: true })

	// 	const uri = "mongodb+srv://stonez:syog5CyCjJSXowtC@legion.ucnvazc.mongodb.net/?retryWrites=true&w=majority";
	// 	const client = new MongoClient(uri);

	// 	const address = (interaction.options.getString('address'))
	// 	const amount = (interaction.options.getNumber('amount'))

	// 	async function run() {
	// 		try {
	// 			const database = client.db('users');
	// 			const wallets = database.collection('wallets');

	// 			const user = interaction.user
	// 			const discordID = user.id
	// 			const username = user.username + '#' + user.discriminator

	// 			//Check if user exists
	// 			const query = { discordID: discordID }
	// 			const check = await wallets.findOne(query);


	// 			if (check === null) {

	// 				interaction.reply(
	// 					{ content: `${username}, you do not have a wallet set up! Use **/newwallet to create one**`, ephemeral: true })
	// 				return
	// 			}

	// 			else {
	// 				try {
	// 					const fromWallet = Web3.Keypair.fromSecretKey(Uint8Array.from(check.secretKey))

	// 					const fromPublicKey = new Web3.PublicKey(fromWallet.publicKey.toString());
	// 					const toPublicKey = new Web3.PublicKey(address);



	// 					const transaction = new Web3.Transaction().add(
	// 						Web3.SystemProgram.transfer({
	// 							fromPubkey: fromPublicKey,
	// 							toPubkey: toPublicKey,
	// 							lamports: amount * Web3.LAMPORTS_PER_SOL,
	// 						}),
	// 					);


	// 					const signature = await Web3.sendAndConfirmTransaction(
	// 						connection,
	// 						transaction,
	// 						[fromWallet]
	// 					);

	// 					interaction.editReply({ content: `You sent ${amount} SOL to\n${address}\nTX: ${signature}`, ephemeral: true })


	// 				} catch (err) {

	// 					console.log(err)

	// 					interaction.editReply({ content: `Something went wrong.`, ephemeral: true })


	// 				}




	// 			}

	// 		} finally {
	// 			// Ensures that the client will close when you finish/error
	// 			await client.close();
	// 		}
	// 	}
	// 	run().catch(console.dir);


	// }

	// if (commandName === 'balance') {

	// 	await interaction.deferReply({ ephemeral: true })

	// 	const uri = process.env.MONGO_URI;
	// 	const client = new MongoClient(uri);

	// 	async function run() {
	// 		try {
	// 			const database = client.db('users');
	// 			const wallets = database.collection('wallets');

	// 			const user = interaction.user
	// 			const discordID = user.id
	// 			const username = user.username + '#' + user.discriminator

	// 			//Check if user exists
	// 			const query = { discordID: discordID }
	// 			const check = await wallets.findOne(query);


	// 			if (check === null) {

	// 				interaction.reply(
	// 					{ content: `${username}, you do not have a wallet set up! Use **/newwallet** to create one**`, ephemeral: true })
	// 				return
	// 			}

	// 			else {
	// 				try {
	// 					const fromWallet = Web3.Keypair.fromSecretKey(Uint8Array.from(check.secretKey))

	// 					const userPublicKey = new Web3.PublicKey(fromWallet.publicKey.toString());

	// 					const balance = await connection.getBalance(userPublicKey)


	// 					interaction.editReply({ content: `You have: \n${balance / Web3.LAMPORTS_PER_SOL} SOL`, ephemeral: true })


	// 				} catch (err) {

	// 					console.log(err)

	// 					interaction.editReply({ content: `Something went wrong.`, ephemeral: true })


	// 				}
	// 			}

	// 		} finally {
	// 			// Ensures that the client will close when you finish/error
	// 			await client.close();
	// 		}
	// 	}
	// 	run().catch(console.dir);


	// }

	// if (commandName === 'coinflip') {

	// 	await interaction.deferReply({ ephemeral: true })

	// 	const uri = process.env.MONGO_URI;
	// 	const client = new MongoClient(uri);

	// 	async function run() {
	// 		try {
	// 			const database = client.db('users');
	// 			const wallets = database.collection('wallets');

	// 			const user = interaction.user
	// 			const discordID = user.id
	// 			const username = user.username + '#' + user.discriminator

	// 			//Check if user exists
	// 			const query = { discordID: discordID }
	// 			const check = await wallets.findOne(query);


	// 			if (check === null) {

	// 				interaction.editReply(
	// 					{ content: `${username}, you do not have a wallet set up! Use **/newwallet to create one**`, ephemeral: true })
	// 				return
	// 			}

	// 			else {
	// 				try {
	// 					const row = new ActionRowBuilder()
	// 						.addComponents(
	// 							new ButtonBuilder()
	// 								.setCustomId('low')
	// 								.setLabel('0.0001 SOL')
	// 								.setStyle(ButtonStyle.Primary),

	// 							new ButtonBuilder()
	// 								.setCustomId('mid')
	// 								.setLabel('0.0002 SOL')
	// 								.setStyle(ButtonStyle.Success),

	// 							new ButtonBuilder()
	// 								.setCustomId('high')
	// 								.setLabel('0.0003')
	// 								.setStyle(ButtonStyle.Danger),

	// 						);

	// 					const coin = new ActionRowBuilder()
	// 						.addComponents(
	// 							new ButtonBuilder()
	// 								.setCustomId('heads')
	// 								.setLabel('Heads')
	// 								.setStyle(ButtonStyle.Primary),

	// 							new ButtonBuilder()
	// 								.setCustomId('tails')
	// 								.setLabel('Tails')
	// 								.setStyle(ButtonStyle.Success),

	// 						);

	// 					var bet = 0

	// 					const filter = i => i.customId === 'low' || i.customId === 'mid' || i.customId === 'high' || i.customId === 'heads' || i.customId === 'tails'

	// 					const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

	// 					const playerWallet = Web3.Keypair.fromSecretKey(Uint8Array.from(check.secretKey))

	// 					const playerPublicKey = new Web3.PublicKey(playerWallet.publicKey.toString());

	// 					const bank = await JSON.parse(process.env.BANK)

	// 					const bankWallet = Web3.Keypair.fromSecretKey(Uint8Array.from(bank))

	// 					const bankPublicKey = new Web3.PublicKey(bankWallet.publicKey.toString());

	// 					const flip = async (choice) => {

	// 						const calcWinnings = () => {

	// 							const winnings = (bet * Web3.LAMPORTS_PER_SOL) * 2

	// 							const fees = ((bet * Web3.LAMPORTS_PER_SOL) * 0.04)

	// 							const total = winnings - fees

	// 							return total

	// 						}

	// 						const takeBet = new Web3.Transaction().add(
	// 							Web3.SystemProgram.transfer({
	// 								fromPubkey: playerPublicKey,
	// 								toPubkey: bankPublicKey,
	// 								lamports: bet * Web3.LAMPORTS_PER_SOL,
	// 							}),
	// 						);

	// 						const payWinner = new Web3.Transaction().add(
	// 							Web3.SystemProgram.transfer({
	// 								fromPubkey: bankPublicKey,
	// 								toPubkey: playerPublicKey,
	// 								lamports: calcWinnings(),
	// 							}),
	// 						);

	// 						try {

	// 							await interaction.editReply({ content: 'Accepting bet...', ephemeral: true });

	// 							try {
	// 								const signature = await Web3.sendAndConfirmTransaction(
	// 									connection,
	// 									takeBet,
	// 									[playerWallet]
	// 								);

	// 								console.log(signature)
	// 							} catch (err) {
	// 								console.log(err)
	// 								return
	// 							}
	// 							await interaction.editReply({ content: 'Flipping...', ephemeral: true });

	// 							const random = Math.ceil(Math.random() * 100)

	// 							if (random <= 50 - check.win_streak) {

	// 								const winSig = await Web3.sendAndConfirmTransaction(
	// 									connection,
	// 									payWinner,
	// 									[bankWallet]
	// 								);

	// 								console.log(winSig)
	// 								await interaction.editReply({ content: `You Win ${(bet - bet * 0.04)} SOL`, ephemeral: true });

	// 								await clientDC.channels.cache.get('1016115699116154940').send(`<@${discordID}> won ${(bet - bet * 0.04)} SOL playing Coinflip on ${choice.toUpperCase()}`)
	// 								try {

	// 									await wallets.updateOne(
	// 										{ discordID: discordID },
	// 										{
	// 											$inc: { 'earnings': (bet - bet * 0.04) },
	// 											$inc: { 'win_streak': 1 },
	// 											$set: { 'loss_streak': 0 }
	// 										}
	// 									);
	// 								} catch (err) { console.log(err) }

	// 								if (check.win_streak + 1 > 1) {
	// 									await clientDC.channels.cache.get('1016115699116154940').send(`<@${discordID}> has won ${check.win_streak + 1} times in a row!`)
	// 								}

	// 							} else {

	// 								await interaction.editReply({ content: `You Lost ${bet} SOL`, ephemeral: true });

	// 								await clientDC.channels.cache.get('1016115699116154940').send(`<@${discordID}> lost ${bet} SOL playing Coinflip on ${choice.toUpperCase()}`)

	// 								try {

	// 									await wallets.updateOne(
	// 										{ discordID: discordID },
	// 										{
	// 											$inc: { 'losings': bet },
	// 											$set: { 'win_streak': 0 },
	// 											$inc: { 'loss_streak': 1 }
	// 										}
	// 									);
	// 								} catch (err) { console.log(err) }

	// 							}
	// 						} catch (err) {

	// 							await interaction.editReply({ content: 'Something went wrong, please check your balance with **/balance**', ephemeral: true });

	// 						}
	// 					}

	// 					collector.on('collect', async i => {

	// 						if (i.customId === 'low') {
	// 							bet = 0.0001
	// 							await i.update({ content: `Heads or Tails?`, components: [coin] })
	// 						}

	// 						if (i.customId === 'mid') {
	// 							bet = 0.0002
	// 							await i.update({ content: `Heads or Tails?`, components: [coin] })
	// 						}

	// 						if (i.customId === 'high') {
	// 							bet = 0.0003
	// 							await i.update({ content: `Heads or Tails?`, components: [coin] })
	// 						}

	// 						if (i.customId === 'heads') {

	// 							await i.update({ content: `Choice: Heads, Bet: ${bet} SOL`, components: [] })
	// 							await flip('heads')
	// 						}

	// 						if (i.customId === 'tails') {

	// 							await i.update({ content: `Choice: Tails, Bet: ${bet} SOL`, components: [] })
	// 							await flip('tails')
	// 						}

	// 					}
	// 					);


	// 					await interaction.editReply({ content: 'Choose your bet!', components: [row], ephemeral: true });



	// 					//collector.on('end', () => { });
	// 					collector.on('end', (collected) => {
	// 						if(collected.size === 0){
								
	// 							interaction.editReply({content: 'This game timed out. Please try again', components:[],  ephemeral: true})
								
	// 						}
							
	// 						if(collected.size === 1){
								
	// 							//TODO check if bet was sent, and send back if heads or tails not clicked. 
	// 							//interaction.editReply({content: 'You did not choose in time, sending back your bet.', components:[],  ephemeral: true})
								
	// 						}
							
	// 					});



	// 					// interaction.editReply({ content: `You sent ${amount} SOL to\n${address}\nTX: ${signature}`, ephemeral: true })


	// 				} catch (err) {

	// 					console.log(err)

	// 					interaction.editReply({ content: `Something went wrong.`, ephemeral: true })


	// 				}




	// 			}

	// 		} finally {
	// 			// Ensures that the client will close when you finish/error
	// 			//await client.close();
	// 		}
	// 	}
	// 	run().catch(console.dir);


	// }
	
	// if (commandName === 'pfp'){
		
	// 	var user = (interaction.options.getUser('user'))
		
	// 	if(user === null) user = interaction.user
		
	// 	const avatarEmbed = new EmbedBuilder()
	// 		.setColor('0x0099ff')
	// 		.setAuthor({name: `${user.username}#${user.discriminator}`, iconURL: user.avatarURL()})
	// 		.setTitle(`Avatar`)
	// 		.setImage(user.displayAvatarURL({dynamic: true, size: 1024}))
			
	// 	interaction.reply({embeds: [avatarEmbed]})
	// }
	
	


});


// Login to Discord with your client's token
clientDC.login(process.env.DISCORDJS_BOT_TOKEN);