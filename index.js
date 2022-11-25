const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.port || 5000;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://travel:AdminTul@cluster0.yyxrk8i.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const categoryCollection = client.db('laptop').collection('laptopCategoryCollection');
        const laptopProductsCollection = client.db('laptop').collection('laptopProductsCollection');
        const usersCollection=client.db('laptop').collection('usersCollection');
     app.get('/category',async(req,res)=>{
        const query = {};
        const result=await categoryCollection.find(query).toArray();
        res.send(result);
     });
     app.post('/products', async (req, res) => {
      const product = req.body;
      console.log(product);
      const result = await laptopProductsCollection.insertOne(product);
      res.send(result);
  });
     app.post('/users', async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await usersCollection.insertOne(user);
      res.send(result);
  });
  app.get('/users', async (req, res) => {
    const query ={};
    const result = await usersCollection.find(query).toArray();
    res.send(result);
});
app.get('/users/admin/:email', async (req, res) => {
  const email = req.params.email;
  const query = { email }
  const user = await usersCollection.findOne(query);
  res.send({ isAdmin: user?.optionRole === 'admin' });
});
app.get('/users/seller/:email', async (req, res) => {
  const email = req.params.email;
  const query = { email }
  const user = await usersCollection.findOne(query);
  res.send({ isSeller: user?.optionRole === 'seller' });
});
     app.get('/category/:id',async(req,res)=>{
        const id = req.params.id;
        const query = {category_id:id};
        const result=await laptopProductsCollection.find(query).toArray();
        res.send(result);
     })
    //  app.get('/addType', async (req, res) => {
    //       const filter = {}
    //       const options = { upsert: true }
    //       const updatedDoc = {
    //           $set: {
    //               condition: "Good"
    //           }
    //       }
    //       const result = await laptopProductsCollection.updateMany(filter, updatedDoc, options);
    //       res.send(result);
    //   })
    } finally {
      
    }
  }
  run().catch(console.dir);