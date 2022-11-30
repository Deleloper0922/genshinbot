const vision = require('@google-cloud/vision');
const fs = require('fs');
const fetch = require('node-fetch');
// Creates a client
const client = new vision.ImageAnnotatorClient({keyFile:'aut/genshin-impact-355617-df90149ebdcb.json'});
const list = require('../Validation/source.js').list;




module.exports = {
    name: "tt",
    description: "서버의 입장을 위해 인증을 합니다",
    options:[
        {
            name:"이미지",
            description:"image",
            type:11,
            required:false
        }
    ],
    async execute(interaction) {
        array = list
        console.log(typeof array)
        array.forEach(text => {
            if(text.includes('기원\n')){
                text = text.replace('기원\n',``);
            }
            arr = text.split('\n');
            cnt = 0,nick = '', world = 0, adv = 0, uid = '',check=0
            arr.forEach(data =>{
                if(data.includes('임무')){
                    nick = arr[cnt+1]
                }
                else if(data.slice(-1)=='i'){
                    if(check == 0){
                        adv = Number(data.replace('i',''));
                        check = 1;
                    }else{
                        world = Number(data.replace('i',''));
                    }
                }
                else if(data.includes('UID:')){
                    uid = data.replace('UID: ','')
                }

                cnt++;
            })
            interaction.channel.send(`${nick}\n${adv}\n${world}\n${uid}`);//\n${adv}\n${world}\n${uid}
        });
    }
}