var express = require("express");
var body_parser = require('body-parser');
const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/users_order_information', { useNewUrlParser: true });
mongoose.connect('mongodb+srv://amankhanna:PetLoverz@cluster0.mjklf.mongodb.net/Pet_orders?retryWrites=true&w=majority')
.then(()=>{
  console.log("database connected");
}).catch(err=>console.log(err));

var app = express();


const user_data = new mongoose.Schema({
    first_name: String,
    last_name: String,
    phone_no: String,
    country: String,
    state: String,
    city: String,
    breeds: String,
    zip: String
});

var information = mongoose.model('user_informations',user_data);

app.use("/static", express.static('static'));
app.use(express.urlencoded());
app.get("/", function (request, response) {

    response.sendFile(__dirname + "/views/index.html");
});

app.get("/contact", function (request, response) {
    response.sendFile(__dirname + "/views/contact.html");
});

app.post("/contact", function (req, res) {
    var myData = new information(req.body);
    myData.save().then(()=>{
        // res.send("Your order has been placed accordingly your choice")
            console.log("order saved");
            res.sendFile(__dirname + "/views/index.html");
       
    }).catch(()=>{
        // res.send("Please retry your given order is not placed yet");
        res.send("There is some problem please try to place order again");
        res.sendFile(__dirname + "/views/index.html");


    })
});
app.get("/fluffy", function (request, response) {
    response.sendFile(__dirname + "/views/fluffy.html");
});

app.get("/german", function (request, response) {
    response.sendFile(__dirname + "/views/german.html");
});

app.get("/golden", function (request, response) {
    response.sendFile(__dirname + "/views/golden.html");
});

app.get("/lebra", function (request, response) {
    response.sendFile(__dirname + "/views/lebra.html");
});

app.get("/puppy", function (request, response) {
    response.sendFile(__dirname + "/views/puppy.html");
});

app.listen(8080);

console.log("Go through this link http://localhost:8080");