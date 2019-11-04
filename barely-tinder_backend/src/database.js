const MongoClient = require('mongodb').MongoClient;
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const router = require('express').Router();

let profilesCollection = null;
let profileId = 0;

async function initDBConnection(){
    let connect = await client.connect();
    profilesCollection = client.db("barely-tinder").collection("profiles");
    console.log("Database connected");
}

function writeToDatabase(){
    // this is a promise
    profilesCollection.insertOne({_id: profileId}); 
    profileId += 1;
}

router.route('/').get((req, res) => {
    res.send("Hello");
});
  
router.route('/create').get((req, res) => {
    writeToDatabase();
});

module.exports = {initDBConnection, writeToDatabase, router};