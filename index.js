const LakhtaBot = require('node-telegram-bot-api'); // подключаем node-telegram-bot-api

const token = '2043899746:AAEL4kYfU5hmxYYpH1IJnQC8m8C5xDt9-R0'; // тут токен кторый мы получили от botFather

// включаем самого обота
const bot = new LakhtaBot(token, { polling: true });

//конфиг клавиатуры
const keyboard = [
    [
        {
            text: 'Хочу в панорамный ресторан', // текст на кнопке
            url: 'https://visotnaya1.ru/panoramnyy-restoran-v-lakhta-centre/' // данные для обработчика событий
        }
    ],
    [
        {
            text: 'Хочу на Смотровую площадку',
            url: 'https://visotnaya1.ru/smotrovaya-obzornaya-ploshchadka/'
        }
    ],
    [
        {
            text: 'Лахта Центр - Инфо',
            url: 'https://visotnaya1.ru' //внешняя ссылка
        }
    ]
];

// обработчик события присылания нам любого сообщения
bot.on('message', (msg) => {
    const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал

    // отправляем сообщение
    bot.sendMessage(chatId, 'Привет, Друг! Рад, что ты зашел.', { // прикрутим клаву
        reply_markup: {
            inline_keyboard: keyboard
        }
    });
});

// обработчик событий нажатий на клавиатуру
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    let img = '';

    if (query.data === 'moreKeks') { // если кот
        img = 'keks.png';
    }

    if (query.data === 'morePes') { // если пёс
        img = 'pes.png';
    }

    if (img) {
        bot.sendPhoto(chatId, img, { // прикрутим клаву
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } else {
        bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', { // прикрутим клаву
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    }
});