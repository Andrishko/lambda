const TelegramBot = require('node-telegram-bot-api');
const { Command } = require('commander');
const fs = require('fs')
const program = new Command();
process.env["NTBA_FIX_350"] = 1;

const token = '6593423536:AAGhVicjUlVj7qawXERS92Nivw03u2gpayw';
const bot = new TelegramBot(token);




program.command('photo')
    .description('send photo')
    .argument('<string>', 'path to file')
    .action((str) => {
        try {
            bot.sendChatAction(466419776, 'upload_photo')
            bot.sendPhoto(466419776, str,
                {
                    contentType: 'photo/' + str.match(/\.([a-zA-Z]+)$/)[1] // визначаємо тип файлу (останні символи в строчуці після крапки);
                })
        }
        catch (err) { console.log(err); }
    });

program.command('text')
    .description('send text')
    .argument('<string>', 'text to send')
    .action((str) => {
        try {
            bot.sendMessage(466419776, str)
        }
        catch (err) { console.log(err); }
    });





program.parse();

