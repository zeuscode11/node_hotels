//function add (a,b){
 //   return a+b;
//}
//var add = function(a,b){
  //  return a+b;
//}
//var result = add(4,5);
//console.log(result);
//function callback(){
 //   console.log("Hitesh Babu Function Chal pada");
//}
//var add= function(a,b,callback){
 //   var result = a+b;
   // console.log("result "+result);
   // callback();

//}
//add(3,4,callback);
//var fs = require('fs');
//var os= require('os');

//var user= os.userInfo();
//console.log(user);
//console.log(user.username);
//fs.appendFile("greetings.txt","hii "+ user.username + "!\n",()=>{
   // console.log("File is Created");
//});

/*const notes = require('./notes.js');
var age = notes.age;
var _ = require('lodash');
console.log('server file is available');
console.log(age);
var result = notes.addNumber(age+18,20);
console.log(result);
var data =["person","person",1,1,2,"name","2"];
var filter = _.uniq(data);
console.log(filter);
console.log(_.isString(false));*/
const express = require('express') ;

const app = express();

const menueItems = require('./models/menueItems');
const PORT = process.env.PORT || 3000 ;
connectToDatabase(app);
require('dotenv').config();

const bodyParser= require('body-parser');
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World')
})

// import router file
const personRoutes = require('./routes/personRoutes');
//use the router
app.use('/person',personRoutes);

const menueRoutes = require('./routes/menueRoutes');

app.use('/menueItems',menueRoutes);

app.listen(3000,()=>{
  console.log("server is running on port 3000");
})








































//This is my code for call back erroe handeling

/*  const data = req.body
  //now I have to create an new person document using mongoose model
  const newperson = new person(data);
  //save new person to database
  newperson.save(error,saveperson=>{
    if(error){
      console.log('error is detected ',error);
      res.status(500).jason({error:'Internal ServerError'})
    }
    else{
      console.log('person is saved');
      res.status(200).jason(saveperson)
      
    }
  })*/