const Discord = require('discord.js');
const client = new Discord.Client();

console.log('loaded');

module.exports = {


    connectToDiscord: ()=>{

        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}!`);
        });
              
          
          client.on('message', msg => {

            //
            if (msg.content === 'ping') {
              msg.reply('Pong!');
            }
          });
        
        //client.login('mfa.LKSGUeNOxFVIGL9d0je3v64RwCXc4TR2TZSBDK0QiJKAoPHV1a38mCiWjNRqrx0yfIR-gb2nYVTcCqarmHoc');
        client.login('MTQyNDM1MTk1NzkzMDQ3NTUy.XTomNg.ChfEPledz8uKVPwsgV-kFx598NA');
        

      },

        sendEmbeddedKillMessage: (kill, corp, character, alliance)  => {
          console.log(kill, corp,character);


       /*  sde.fetchItemInfo(23057).then((r)=>{

            console.log(r[0].typeID);
        }); */

          client.channels.get('604049077864366108').send({embed: {
              color: 3447003,
          /*   author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
              }, */
              author: {
              name: 'Ship name goes here', // fetch from SDE
              icon_url: client.user.avatarURL
              },
              thumbnail:{
                  url: 'https://image.eveonline.com/Type/'+kill.victim.ship_type_id+'_64.png',
              },  
              //title: "This is an embed",
              url: kill.zkb.url,
            //  description: "Ship Title here",
              fields: [{
                  name: "Kill Info",
                  value: "Name: ["+character.name+"](https://zkillboard.com/character/"+kill.victim.character_id+")\n \
                  Corporation: ["+corp.name+"](https://zkillboard.com/corporation/"+kill.victim.corporation_id+")\n \
                  Alliance:  ["+alliance.name+"](https://zkillboard.com/alliance/"+kill.victim.alliance_id+")",
              },
              {
                  name: "Details",
                  value: "Time: "+kill.killmail_time+"\n \
                  Value: "+kill.zkb.totalValue+"",
              }
              ],
              timestamp: new Date(),
              footer: {
              icon_url: client.user.avatarURL,
              text: "© Echo Bot"
              }
          }
          });
      
      },

      test: ()=>{

        console.log('test');
      }

      
};


