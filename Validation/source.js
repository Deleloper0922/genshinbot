const axios = require("axios");
const cheerio = require("cheerio");
const { InteractionCollector } = require("discord.js");


getHtml = async (uid) => {
    try {
      return await axios.get(`https://enka.network/u/${uid}/__data.json`);
    } catch (error) {
      console.error(error);
    }
};



module.exports = {
    owner : ["801776768402718751"],
    serverRole:{
        Asia:'1004073359069433977',
        America:'1004970795287707698',
        Europe:'1004970883611377704',
        China:'1004970978792718416'
    },
    worldRole:['1005104981524873216',
    '1004972396324859925',
    '1004972828199747584',
    '1004972872504180776',
    '1004972909187563667',
    '1004972931270574131',
    '1004972951529082941',
    '1004972976774598726',
    '1004973002619899926',],
        /*{
        1:'1004972396324859925',
        2:'1004972828199747584',
        3:'1004972872504180776',
        4:'1004972909187563667',
        5:'1004972931270574131',
        6:'1004972951529082941',
        7:'1004972976774598726',
        8:'1004973002619899926',
    },*/
    getData :(uid) =>{
        switch(parseInt(uid/100000000)){
            case 1:
                server = "China"
                break;
            case 8:
                server = "Asia"
                break;
            case 6 :
                server = "America"
                break;
            case 7:
                server = "Europe"
                break;
            default:
                server = "Error"
                break;
        }
        return new Promise((suc,fail)=>{
            const uInfo = new Array()
            axios.get(`https://enka.network/u/${uid}/__data.json`)
            .then((res)=>{
                if(res.data.playerInfo.worldLevel == undefined){
                    uInfo.push(res.data.playerInfo.nickname, res.data.playerInfo.level,0,server);
                    suc(uInfo);
                }
                else{
                    uInfo.push(res.data.playerInfo.nickname, res.data.playerInfo.level, res.data.playerInfo.worldLevel,server);
                    suc(uInfo);
                }
            })
            .catch((err)=>{
                uInfo.push(-1,-1,-1,-1);
                suc(uInfo);
                //throw new Error("가져오는 중에 오류 발생");
            })
    })
    },
}