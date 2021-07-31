var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
var mongo = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/house';

mongo.connect(url, (err)=>{
    console.log('成功連接資料庫')
})

app.get('/data', (req, res)=>{
    mongo.connect(url, (err, db)=>{
        var collection = db.collection('buyhouse');
        var a =collection.find({"總坪數":{$lte:10}}).toArray();
        var b = a.map(function(item, index, array){
  						return item.總價 ;  });
        console.log(a);
        for(i=0;i<b.length;i++){
　			c=c+b[i];
		}
        collection.find({"總坪數":{$lte:10}}).toArray((x, hasil)=>{
            res.send(c);
            
        })

    })
})



app.listen(3210, ()=>{
    console.log('Sever3210成功架設');
    
})
