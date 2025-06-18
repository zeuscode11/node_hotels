const mongoose=require('mongoose');
//define person schema
const bcrypt = require('bcrypt');
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        enum: ['chef' , 'waiter','manager'],
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required: true

    },
    username:{
        type:String,
        required:true
    },
    password:{
        required:true,
        type : String
    }
    });
    personSchema.pre('save',async function(next){
        const person = this ;
        // Hash the Password only if it has  been modified (or is new)
        if(! person.isModified('password')) return next();
        try{
            //hash password generate
            const salt = await bcrypt.genSalt(10);

            //hash password
            const hashedPassword = await bcrypt.hash(person.password,salt);
             person.password = hashedPassword;
             next();
        }
        catch(err){
         return next(err);

        }
        
    })
    personSchema.methods.comparePassword = async function (candidatePassword){
        try{
            const isMatch = await bcrypt.compare(candidatePassword,this.password);
        }
        catch(err){s
            throw err;
        }
    }
    const Person = mongoose.model('Person',personSchema);
    module.exports=Person;