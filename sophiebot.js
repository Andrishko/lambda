const TelegramBot = require('node-telegram-bot-api');
const { Command } = require('commander');
const fs = require('fs')
const program = new Command();
process.env["NTBA_FIX_350"] = 1;

const token = '6553126154:AAHgp6J22Hp6Gd2ULRJP7lN6xeJIv6YBSyI';
const bot = new TelegramBot(token);




program.command('photo')
    .description('send photo')
    .argument('<string>', 'path to file')
    .action((str) => {
        try {
            bot.sendChatAction(536717492, 'upload_photo')
            bot.sendPhoto(536717492, str,
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
        console.log(['work']);
        try {
            bot.sendMessage(536717492, str)
        }
        catch (err) { console.log(err); }
    });





program.parse();

