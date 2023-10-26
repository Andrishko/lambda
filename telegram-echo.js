const { default: axios } = require('axios');
const TelegramBot = require('node-telegram-bot-api');
process.env["NTBA_FIX_350"] = 1;

const token = '6636409042:AAGyty0nRVrXqDOCs7MwrtKwtOPk5hSA_vM';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    console.log(msg.text);
    bot.sendMessage(msg.chat.id, msg.text,
        {
            "reply_to_message_id": msg.message_id,
        });
})

bot.onText(/\/photo/, async (msg) => {
    try {
        const response = await axios.get('https://picsum.photos/200/300', { responseType: 'arraybuffer' });
        // Send the fetched image to the Telegram bot
        bot.sendPhoto(msg.chat.id, Buffer.from(response.data), { caption: 'Here is the image' });
    } catch (error) {
        console.error('Error fetching or sending the image:', error);
    }
})

bot.onText(/\/help/, (msg) => {
    const text = `/help - show all comands\n/photo - get random picture\nany message - get reply with the same text`
    bot.sendMessage(msg.chat.id, text)
})