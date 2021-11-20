const qrcode = require('qrcode-terminal');
var fs = require("fs");
const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});


client.on('message', async msg => {
    if (msg.hasMedia) {
        const media = await msg.downloadMedia();
        // do something with the media data here

        console.log(media);
        fs.writeFile('./upload/', JSON.stringify(media.data), function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
});

client.on('message', message => {
    console.log(message.body);
});


client.initialize();
