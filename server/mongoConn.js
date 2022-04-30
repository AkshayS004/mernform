const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://AkshayS004:akshay@mern123@cluster0.01c4r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("cluster0").collection("students");
  // perform actions on the collection object
  
  client.close();
});
