//=================================================================
// SETUP
//=================================================================
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let methodOverride = require('method-override');
let faker = require('faker');
let orderNumber = faker.random.number()
let app = express();

app.use('/assests',express.static('assests'));
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(methodOverride("_method"))
app.set('view engine', 'ejs');
//=================================================================
// DATABASE
//=================================================================
console.log('hi')
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/order_app', {useNewUrlParser: true})
mongoose.connect(URL, {useNewUrlParser: true})



let OrderSchema = new mongoose.Schema({
    invoice: Number,
    image: String,
    menu: String,
    customerName: String,
    quantity: String,
    amount: Number,
    orderStatus: String,
    phone: Number
})
let Order = mongoose.model('order', OrderSchema);




//=================================================================
// Routes
//=================================================================
// plan:
//name      path            HTTP verb       Purpose
//=================================================================
//Index     /orders           GET           List all orders
//New       /orders/new       GET           Show new order form
//Create    /orders           POST          create a new order, then redirect somewhere

//show      /cars/:id       GET             show info about one specific car
//edit      /cars/:id/edit  GET             show edit for one car
//update    /cars/:id       PUT             update a particular car, then redirect somewhere
//destroy   /cars/:id       DELETE          delete a particular car, then redirect somewhere   

app.get('/orders', (req,res) => {
    Order.find({}, (err,userOrder) =>{
        if(err) return console.log(err)
        console.log('i found data')
        res.render('order', {userOrder: userOrder})
    })
})

app.get('/orders/new', (req,res) => {
    res.render('formPage')
})

app.post('/orders',urlencodedParser, (req,res)=>{
    console.log(req.body)
    Order.create({
      invoice: orderNumber,
      image: req.body.image,
      menu: req.body.menu,
      customerName: req.body.customerName,
      quantity: req.body.quantity,
      amount: req.body.amount,
      orderStatus: req.body.orderStatus,
      phone: req.body.phone,  
    }, (err, userOrder) => {
        if (err) return console.log(err);
        console.log('redirect data')
        res.redirect('/orders')
    })


})
//hi
app.listen(3000)