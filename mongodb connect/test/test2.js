var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/house';

// Connect to the db
MongoClient.connect(url, function (err, db) {
  if(err) throw err;
  //Write databse Insert/Update/Query code here..
  console.log('mongodb is running!');
  db.close(); //關閉連線
});