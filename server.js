const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors");
let port = process.env.port || 3699
let {connectDB, getData, postData, updateData, deleteData, postMultipleData, deleteMultipleData} = require("./controller/dbController")
const Razorpay = require('razorpay');
const env = require('dotenv').config();

const corsOptions = {
    origin: ['https://avae.vercel.app', 'http://localhost:3000', 'https://www.avae.app'],
  };

app.use(bodyParser.json(), bodyParser.urlencoded({extended: 'true'}));
app.use(cors(corsOptions));

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });

app.get("/", (req, res) => {
    res.send("server online")
})

app.post("/orders", (req, res) => {
    const orderData = {
        amount: req.body.amount, 
        currency: 'INR',
        receipt: req.body.receipt,
        payment_capture: 1,
        partial_payment: false,
      };
    
      razorpay.orders.create(orderData, (error, order) => {
        if (error) {
          console.error('Error creating order:', error);
          res.status(500).json({ error: 'An error occurred while creating the order.' });
        } else {
          res.status(200).json(order);
        }
      });
})

app.post("/order", async(req, res) => {
    let collectionName = "order"
    let data = req.body
    let output = await postData(collectionName, data);
    res.send(output)
});

app.get("/order", async(req, res) => {
    let collectionName = "order"
    let query = {}
    let output = await getData(collectionName, query);
    res.send(output)
});

app.post("/categories", async(req, res) => {
    let collectionName = "categories"
    let data = req.body
    let output = await postMultipleData(collectionName, data)
    res.send({"message": "added successfully", "response": output});
});

app.get("/categories", async(req, res) => {
    let collectionName = "categories"
    let query = {}
    let output = await getData(collectionName, query);
    res.send(output);
});

app.get("/astral", async(req, res) => {
    let collectionName = "astral"
    let query = {}
    let output = await getData(collectionName, query);
    res.send(output);
})

app.get("/astral", async(req, res) => {
    let collectionName = "astral"
    let query = {}
    let output = await getData(collectionName, query);
    res.send(output);
})

app.post("/astral", async(req, res) => {
    let collectionName = "astral"
    let data = req.body
    let output = await postMultipleData(collectionName, data)
    res.send({"message": "added successfully", "response": output});
});

app.get("/pyro", async(req, res) => {
    let collectionName = "pyro"
    let query = {}
    let output = await getData(collectionName, query);
    res.send(output);
})

app.post("/pyro", async(req, res) => {
    let collectionName = "pyro"
    let data = req.body
    let output = await postMultipleData(collectionName, data)
    res.send({"message": "added successfully", "response": output});
});

app.get("/aquagem", async(req, res) => {
    let collectionName = "aquagem"
    let query = {}
    let output = await getData(collectionName, query);
    res.send(output);
})

app.post("/aquagem", async(req, res) => {
    let collectionName = "aquagem"
    let data = req.body
    let output = await postMultipleData(collectionName, data);
    res.send({"message": "added successfully", "response": output});
});

app.get("/terra", async(req, res) => {
    let collectionName = "terra"
    let query = {}
    let output = await getData(collectionName, query);
    res.send(output);
})

app.post("/terra", async(req, res) => {
    let collectionName = "terra"
    let data = req.body
    let output = await postMultipleData(collectionName, data)
    res.send({"message": "added successfully", "response": output});
});

app.get("/airtron", async(req, res) => {
    let collectionName = "airtron"
    let query = {}
    let output = await getData(collectionName, query);
    res.send(output);
})

app.delete("/airtron", async(req, res) => {
    let collectionName = "airtron"
    let query = {}
    let output = await deleteMultipleData(collectionName, query);
    res.send(output);
})

app.post("/airtron", async(req, res) => {
    let collectionName = "airtron"
    let data = req.body
    let output = await postMultipleData(collectionName, data)
    res.send({"message": "added successfully", "response": output});
});

app.put("/order", async(req, res) => {
    let data = {$set: {[req.body.name]: req.body.value}}
    let condition = {email: req.body.email}
    let collectionName = "order"
    let output = await updateData(collectionName, condition, data)
    res.send({"message": "Order created successfully", "response": output});
});

app.listen(port, () => {
    connectDB();
    console.log("server started")
})