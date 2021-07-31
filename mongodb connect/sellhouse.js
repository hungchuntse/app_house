var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
var mongo = require('mongodb').MongoClient;
var url = 'mongodb://student:yzu2020iem@140.138.45.82:27017/stHouse';

app.get('/sellhouse', (req, res)=>{
    mongo.connect(url, (err, db)=>{
        var collection = db.collection('sellhouse');
        collection.find({}).toArray((err, items)=>{
            if(items==null){
	            res.send("NO POSTS");
	        }
	        else{
	            res.json(items);
	        }
            
        })
    })
})


app.set('port', (process.env.PORT || 3610));

app.listen(app.get('port'), function(){
    console.log("Server started on port: " + app.get('port'));
});