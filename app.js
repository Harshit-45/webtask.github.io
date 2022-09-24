const express=require("express");
const path=require("path");
const app= express();
var mongoose = require('mongoose');
const bodyparser= require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port=8000;

// define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
  });
  const contact = mongoose.model('Kitten', contactSchema);

 // EXPRESS SPEIFI STUFF
 app.use('/static',express.static('static'))  //FOR SERVING STATIC FILE 
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
 app.set('views engine','pug')  //SET THE TEMPLATE ENGINE AS PUG
 app.set('views',path.join(__dirname, 'views'))  //SET THE VIEW DIRECTORY

 //ENDPOINTS
 app.get('/',(req ,res)=>{
     const con= "this is the best contant on the internet so far so use it wisely"
     const params={}
     res.status(200).render('home.pug',params);

 })
 app.get('/contact',(req ,res)=>{
    const con= "this is the best contant on the internet so far so use it wisely"
    const params={}
    res.status(200).render('contact.pug',params);

})
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send('This item has been saved to the database')
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
});
// res.status(200).render('contact.pug',params);
})
 
 //START THE SERVER 
  app.listen(port,()=>{
      console.log(`the application started successfully on the port ${port}`);
  });
