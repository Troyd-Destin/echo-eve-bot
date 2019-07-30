const WebSocket = require('ws');
const zKillAddress = 'wss://zkillboard.com:2096';
var ws;
var http = require('axios');
var HTMLParser = require('node-html-parser');


module.exports = {


}


connectToZkillWebSocket = ()=>
{
    console.log('triggered');
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