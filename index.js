require('dotenv').config();

const express = require('express');
const mongoose =require('mongoose');
const cors=require('cors');
const { resolve } = require('path');

const MenuItem=require('./models/user');
const { error } = require('console');
const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.DB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log('MongoDb Connected');
  
}).catch(err=>console.error("MongoDb connection error: ",err)
);



// Routes 
app.post('/menu',async (req,res) => {
  
try{
  const {name, description, price }=req.body;
  if(!name || !price){
    return res.status(400).json({error:"Name and price are required."});
  }
  const newItem=new MenuItem({name,description,price});
  await newItem.save();
  res.status(201).json({message:"Menu item added successfully",item:newItem});
}catch(error)
{
  res.status(500).json({error:error.message});
}


});

app.get('/menu',async (req,res) => {
  
try{
  const menuItem=await MenuItem.find();
  res.status(200).json(menuItem);

}
catch(error){
  res.status(500).json({ error: error.message });
  }
});




const PORT = process.env.PORT || 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});