var MongoClient=require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/house';
 
MongoClient.connect(url,function(err,db){
 
   if(err) throw err;
   //Write databse Insert/Update/Query code here..
 
   db.collection('Persons',function(err,collection){
    collection.insert({ id:1, firstName:'Steve', lastName:'Jobs' });
    collection.insert({ id:2, firstName:'Bill', lastName:'Gates' });
    collection.insert({ id:3, firstName:'James', lastName:'Bond' });
 
    collection.count(function(err,count){
        if(err) throw err;
        console.log('Total Rows:'+count);
    });
  });
  db.close(); //關閉連線
});