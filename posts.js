const mongoose=require("mongoose");
const {Schema}=require("mongoose");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/user');
}

main().then(()=>{
    console.log("Connection Successfull");
}).catch((err)=>{
    console.log(err);
});

const accHolderSchema=new Schema({
    name:String,
    email:String
});

const postSchema = new Schema({
    content:String,
    like:Number,
    accHolder:{
        type:Schema.Types.ObjectId,
        ref:"AccHolder"
    }
});

const AccHolder=mongoose.model("AccHolder",accHolderSchema);
const Post=mongoose.model("Post",postSchema);

const addPost= async()=>{
    let user= await AccHolder.findOne({name:"Shristi"});

    let post2=new Post({
        content:"what are you doing",
        like:29
    });

    post2.accHolder=user;

    // user1.save();
    post2.save();
}


const deletePost=async()=>{
  await Post.deleteOne({like:29});
}

// deletePost();

 addPost();