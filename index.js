const Discord = require('discord.js');
const client = new Discord.Client();
const WebSocket = require('ws');
const zKillAddress = 'wss://zkillboard.com:2096';
var http = require('axios');
var HTMLParser = require('node-html-parser');
var ws;




connectToZkillWebSocket = ()=>
{
     const subscribeMessage = {
        'action':'sub',
      //  'channel':'alliance:1258727717'
      'channel':'killstream'
    };

     ws = new WebSocket(zKillAddress, {
        perMessageDeflate: false
      });
      ws.on('open', function open() {             
        ws.send(JSON.stringify(subscribeMessage)); 
    });
      ws.on('message', function incoming(message) {

        let kill = JSON.parse(message);
        console.log('km');
        if(kill.victim)
        {
        let requestArray = [
            http.get('https://esi.evetech.net/latest/characters/'+kill.victim.character_id+'/?datasource=tranquility'),
            http.get('https://esi.evetech.net/latest/corporations/'+kill.victim.corporation_id+'/?datasource=tranquility'),
       //     http.get('https://zkillboard.com/ship/'+kill.victim.ship_type_id),
        ];

        //if alliance, add it to the query 
        if(kill.victim.alliance_id){ 
            requestArray.push(http.get('https://esi.evetech.net/latest/alliances/'+kill.victim.alliance_id+'/?datasource=tranquility'));
        }

        http.all(requestArray).then(http.spread((character, corp, zkillShip, alliance) => {

           console.log(corp.data, character.data);
            
            /* console.log('character',character.data);
            console.log('corp',corp.data);
            console.log('alliance',alliance.data);  */

            //  sendEmbeddedKillMessage(kill, character.data,corp.data,alliance.data);

           // let parse = HTMLParser.parse(zkillShip.data);
           // console.log(parse);
         // level1 = parse.text;
           // console.log(level1);

          })).catch(error => {
            console.log('Error occured', error);
          });

        }  

      });

   
    
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
      connectToZkillWebSocket();
});
      
  
  
  client.on('message', msg => {
    if (msg.content === 'ping') {
      msg.reply('Pong!');
    }
  
  
    ///604049077864366108
  });



//client.login('mfa.LKSGUeNOxFVIGL9d0je3v64RwCXc4TR2TZSBDK0QiJKAoPHV1a38mCiWjNRqrx0yfIR-gb2nYVTcCqarmHoc');
client.login('MTQyNDM1MTk1NzkzMDQ3NTUy.XTomNg.ChfEPledz8uKVPwsgV-kFx598NA');



sendEmbeddedKillMessage = (kill, corp, character, alliance)  => {
  //  console.log(character);
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

}
