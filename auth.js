//Person defining for authentication 
const Person = require('./models/person')  ;
//for using passport methode
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//verification function //local Strategy passport methode

passport.use(new LocalStrategy(async(USERNAME,password,done)=>{
  //authentication logic here
  try{
    console.log('Recieved credentials:',USERNAME,password);
    const user = await Person.findOne({username:USERNAME});
    if(!user)
      return done(null,false,{message:'Incorrect username.'});
    const isPasswordMatch = user.comparePassword(password);
if(isPasswordMatch){
  return done(null,user);
}else{
  return done(null,false,{message: 'Incorrect Password.'});
}
}

catch(err){
  return done(err);
}

}))
module.exports=passport;

