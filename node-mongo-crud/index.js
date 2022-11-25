const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('this code is running 2')
})



const uri = "mongodb+srv://dbuser:ywAXRSG10tIPKdGz@cluster0.wum2reu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const userCollection = client.db("travel").collection("user");
        // const user = {name:'haniful', email:'haniful@gmail.com'}
        // const result = await userCollection.insertOne(user);
        // console.log(`user with id:${result.insertedId}`);

        // create get api/// user paoyar jonno
        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);

        })

        // user ubdate
        app.get('/user/:id', async (req, res) => {
            const id = req.params.id;
           const query = {_id: ObjectId(id)}
           const result = await userCollection.findOne(query);
           res.send(result); 

        })

        // POST usr: add a new user
        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log('adding new user', newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result);
        })

        // delete a user
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await userCollection.deleteOne(query)
            res.send(result);
        })
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log('crud server is running');
});

