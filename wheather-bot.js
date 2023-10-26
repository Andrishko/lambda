const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const { default: axios } = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

process.env["NTBA_FIX_350"] = 1;

const token = '6429807575:AAF4YugitutRk3r3TBx9a7nolxF5Ht8xLkM';
const bot = new TelegramBot(token, { polling: true });


// Цей роут встановлює вебхук для бота
app.post(`/bot${token}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});


let request = {
    lat: 0,
    lon: 0,
    appId: 'e0053ce8d959e0a108ba46b6cb866a02',
}

const dateFormat = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert to milliseconds

    // Set the time zone offset to GMT+2
    date.setHours(date.getHours() + 2);

    // Define arrays for month and day names in Ukrainian
    const monthNamesUkr = [
        'січня', 'лютого', 'березня', 'квітня',
        'травня', 'червня', 'липня', 'серпня',
        'вересня', 'жовтня', 'листопада', 'грудня'
    ];

    const dayOfWeekNamesUkr = [
        'неділя', 'понеділок', 'вівторок', 'середа',
        'четвер', 'пʼятниця', 'субота'
    ];

    // Get the day, month, year, hour, and minutes
    const day = date.getUTCDate();
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();
    const hour = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    // Get the day of the week and month names in Ukrainian
    const dayOfWeekNameUkr = dayOfWeekNamesUkr[date.getUTCDay()];
    const monthNameUkr = monthNamesUkr[month];

    // Construct the formatted date string
    return `${dayOfWeekNameUkr}, ${day} ${monthNameUkr} ${year}, ${hour}:${minutes}0`;

}



const startHandler = (msg) => {
    const text = 'Оберіть опцію';
    const chatId = msg.chat.id;
    const options = {
        reply_markup: {
            keyboard: [
                ["Дізнатись прогноз погоди"]
            ]
        }
    }
    bot.sendMessage(chatId, text, options)
}

const getCityHandler = async (msg) => {
    const text = 'Введіть місто';
    const chatId = msg.chat.id;
    const options = {
        reply_markup: {
            keyboard: [
                ['Повернутись назад']
            ]
        }
    }
    bot.sendMessage(chatId, text, options)
    bot.once("text", async (msg) => {
        if (msg.text != 'Повернутись назад') {
            console.log('once');
            const city = encodeURIComponent(msg.text);
            const chatId = msg.chat.id
            try {
                const response = await axios(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${request.appId}`)
                const data = response.data
                if (data.length > 1) {
                    const text = 'оберіть місто'

                    const options = {
                        reply_markup: {
                            inline_keyboard: data.map((el) => {
                                return [{
                                    text: `Місто: ${el.name} Країна: ${el.country} ${el.state ? 'Область: ' + el.state : ''}`,
                                    callback_data: JSON.stringify({
                                        choose: 'city', lat: el.lat,
                                        lon: el.lon,
                                    })
                                }]
                            })

                        }
                    }
                    bot.sendMessage(chatId, text, options)
                }
                else {
                    request.lat = data[0].lat
                    request.lon = data[0].lon
                    bot.sendMessage(chat, id, 'оберіть термін')
                }
            }
            catch (err) { console.log(err); }
        }
    })
}

const getBackHandler = (msg) => {
    const text = 'Оберіть опцію';
    const chatId = msg.chat.id;
    const options = {
        reply_markup: {
            keyboard: [
                ["Дізнатись прогноз погоди"]
            ]
        }
    }
    bot.sendMessage(chatId, text, options)
}


bot.on('callback_query', async (query) => {
    const data = JSON.parse(query.data)
    const choose = data.choose
    if (choose === 'city') {
        request.lat = data.lat;
        request.lon = data.lon;
        options = {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "Дізнатись прогноз погоди на зараз",
                            callback_data: JSON.stringify({ choose: "wheather_now" })
                        }
                    ],
                    [
                        {
                            text: "Дізнатись прогноз погоди на 5 днів",
                            callback_data: JSON.stringify({ choose: "wheather_for_5_days" })
                        }
                    ]
                ]
            }
        }
        bot.sendMessage(query.message.chat.id, 'Оберіть проміжок часу', options)
    }
    if (choose === "wheather_now") {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${request.lat}&lon=${request.lon}&appid=${request.appId}&units=metric&lang=ua`)
        const data = response.data;
        console.log(data.weather);
        console.log(data.main);
        const message = `температура: ${data.main.temp}C\nвідчувається як: ${data.main.feels_like}C\nпогода: ${data.weather[0].description}`
        bot.sendMessage(query.message.chat.id, message)
    }
    if (choose === "wheather_for_5_days") {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${request.lat}&lon=${request.lon}&appid=${request.appId}&units=metric&lang=ua`)
        const data = response.data;
        let message = ''
        data.list.map((el) => {
            message += dateFormat(el.dt) + '\n' + 'температура: ' + el.main.temp + 'C\n' + 'відчувається як: ' + el.main.feels_like + 'C\n\n'
        })
        bot.sendMessage(query.message.chat.id, message)
    }
})



bot.onText(/\/start/, startHandler);
bot.onText(/Дізнатись прогноз погоди/, getCityHandler)
bot.onText(/Повернутись назад/, getBackHandler)

app.listen(4000, () => {
    console.log('Сервер запущено на порту 3000');
});
