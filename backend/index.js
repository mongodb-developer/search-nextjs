const express = require("express");
const mongodb = require('mongodb');
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

let dbConnected = false;

const getMongoDB = async () => {
  const MongoClient = mongodb.MongoClient;
  let logConnString = MONGODB_URI.replace(/\/(.*:.*)@/, "//<user>:<password>@");

  console.log(`Connecting to database using ${logConnString}`);
  
  let db;

  try {
    const client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    db = await client.db("sample_airbnb");
    dbConnected = true;
    
    console.log("Database is connected and ready to go!");

  } catch (e) {
    console.log(e.toString(), "connection error");
  }
  return db;
}
// let db;
let itemCollection;
getMongoDB().then(async _db => {
  db = _db;
  itemCollection = await db.collection("listingsAndReviews");
});

let app = express();

app.use(cors());

app.get("/", async (req, res) => {
  let results = [];
  try {
    results = await itemCollection.find().limit(50).toArray();
  }
  catch (e) {
    console.log(e.toString());
  }
  res.send(results).status(200);
});

//get all categories
app.get("/category", async (req, res) => {
  let results = [];
  try {
    results = await itemCollection.distinct("property_type");
  }
  catch (e) {
    console.log(e.toString());
  }
  res.send(results).status(200);
});

//get items in each category
app.get("/category_list/:category", async (req, res) => {
  let results = [];
  try {
    results = await itemCollection.aggregate(
      [
        {
          '$match': {
            'property_type': {
              '$eq': req.params.category
            }
          }
        }, {
          '$project': {
            'accommodates': 1,
            'price': 1,
            'property_type': 1,
            'name': 1,
            'description': 1,
            'host': 1,
            'address': 1,
            'images': 1,
            "review_scores": 1
          }
        }
      ]
    ).limit(50).toArray();
  }
  catch (e) {
    console.log(e.toString());
  }
  res.send(results).status(200);
});


//to be updated

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));