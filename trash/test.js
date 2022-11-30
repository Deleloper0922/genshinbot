const vision = require('@google-cloud/vision');
const fs = require('fs');
const fetch = require('node-fetch');
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
// Creates a client
const client = new vision.ImageAnnotatorClient({keyFile:'aut/genshin-impact-355617-df90149ebdcb.json'});





module.exports = {
    name: "도우미",
    description: "도우미 모집을 합니다",
    options:[
        {
            name:"도움",
            description:"어떤 도움이 필요한지 적어주세요",
            type:ApplicationCommandOptionType.String,
            required:true
        },{
            name: 'uid',
            description:'자신의 uid를 적어주세요',
            type:ApplicationCommandOptionType.String,
            required:true
        }
    ],
    async execute(interaction) {
        const { channel, options } = interaction;
        const attachment = interaction.options.getAttachment('이미지');
        const file = `${interaction.user.id}.jpg`
        const url = attachment.url;
        const response = await fetch(url);
        const buffer = await response.buffer();
        fs.writeFile(file, buffer, () => 
        console.log());
        // Performs text detection on the local file
        const [result] = await client.textDetection(file);
        const detections = result.textAnnotations;
        console.log(detections);
        interaction.reply(detections[0].description);
        fs.unlinkSync(file);
        detections.forEach(text => interaction.channel.send(text.description));
    
    }
}