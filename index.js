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
     app.get('/category',async(req,res)=>{
        const query = {};
        const result=await categoryCollection.find(query).toArray();
        res.send(result);
     })
     app.get('/category/:id',async(req,res)=>{
        const id = req.params.id;
        const query = {category_id:id};
        const result=await laptopProductsCollection.find(query).toArray();
        res.send(result);
     })
    } finally {
      
    }
  }
  run().catch(console.dir);