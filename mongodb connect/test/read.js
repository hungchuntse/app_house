var MongoClient=require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/house';
 
MongoClient.connect(url,function(err,db){
    db.collection("housedata",function(err,collection){
        collection.find({}).toArray(function(err,items){
            if(err) throw err;
            console.log(items);
            console.log("We found "+items.length+" results!");
        });
 
    });
    db.close(); //關閉連線
});