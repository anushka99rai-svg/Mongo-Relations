const express=require("express");
const app=express();
const mongoose=require("mongoose");
const {Schema}=require("mongoose");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/user');
}

main().then(()=>{
    console.log("Connection successful");
}).catch((err)=>{
    console.log(err);
})

const userSchema=new Schema({
    name:String,
    email:String,
    address:[
        { 
            _id:false,
            location:String,
            city:String
        }
    ]
});

const User = mongoose.model("User",userSchema);

const addUser=async()=>{
    let user1=new User({
    name:"Ankit",
    email:"ankit99@gmail.com",
    address:[
        { location:"Ayodhya Bypass",
            city:"Bhopal"
        },{
            location:"Indrapuri",
            city:"Bhopal"
        }
    ]
})
await user1.save();
};

addUser();