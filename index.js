const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./dialogflow');
const youtube = require('./youtube');

const Token = '1295828553:AAG708oXfcVaBnVUwiARPoIR-6TZJL9_gog';
const bot = new TelegramBot(Token, {polling: true});

bot.on('message', async function(msg){
	const chatId = msg.chat.id;
	console.log(msg.text);
	const dfResponse = await  dialogflow.sendMessage(chatId.toString(), msg.text);

    let responseText = dfResponse.text;
	if (dfResponse.intent == 'Treino especifico'){
		
		responseText = await youtube.searchVideoURL(responseText, dfResponse.fields.Corpo.stringValue);
	}
	
	bot.sendMessage(chatId, responseText);
	
});