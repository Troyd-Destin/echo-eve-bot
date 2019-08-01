var mysql = require('knex')({
    client: 'mysql',
    connection: {
      host : 'api.edm.quantiam.com',
      user : 'Troyd',
      password : '951951',
      database : 'eo'
    }
  });



  

module.exports = {

    fetchItemInfo: (typeId) =>
    {
        return mysql.select().where('typeID', typeId).from('invtypes');
      //  console.log(item);
    }
}



