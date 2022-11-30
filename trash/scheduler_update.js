const { Client } = require("discord.js")
const mongoose = require("mongoose");
const { Database } = require("../config.json")
const schedule = require('node-schedule');
const getData = require('../Validation/source').getData;
const worldRole = require('../Validation/source').worldRole;
const serverRole = require('../Validation/source').serverRole;

module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param {Client} client
     */
    execute(client) {
        var j = schedule.scheduleJob('0 0 ? * 1', function(){
            client.guilds.cache.get('887614214703833088').roles.cache.get('887638493487071233').members.forEach((member)=>{
                nickArray = member.nickname.split(' | ').catch((err)=>{console.log(err)})//887874562006589470
                uid = nickArray[2];
                getData(uid).then((data)=>{
                    nickname = data[0];
                    level = data[1];
                    worldlevel = data[2];
                    server = data[3];
                    worldR = member.guild.roles.cache.get(eval(`worldRole[${worldlevel}-1]`));
                    for(i=0;i<=7;i++){
                        if(eval(`worldRole[${worldlevel}-1]`)===worldRole[i]){
                            continue;
                        }
                        member.roles.remove(member.guild.roles.cache.get(worldRole[i])).catch((err)=>{console.log(err)})
                    }
                    member.roles.add(worldR,(err)=>console.error(err));
                    member.setNickname(`${nickname} | ${level} | ${uid}`).catch((err)=>{console.log(err)});
                })
            
            });
        })
    }
}