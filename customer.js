const mongoose=require("mongoose");
const {Schema} = require("mongoose");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/user');
}

main()
.then(()=>{
    console.log("Connection successful");
}).catch((err)=>{
    console.log(err);
})

const orderSchema =new Schema({
    item:String,
    price:Number
});

const customerSchema=new Schema({
    name:String,
    orders:[
        {
            type:Schema.Types.ObjectId,
            ref:"Order"
        }
    ],
});


customerSchema.post("findOneAndDelete", async(customer)=>{
    console.log("POST MIDDLEWARE");
    if(customer.orders.length){
        let result=await Order.deleteMany({_id : { $in : customer.orders}});
        console.log(result);
    }
}) 

const Order= mongoose.model("Order",orderSchema);
const Customer=mongoose.model("Customer",customerSchema);


// const findCustomer=async()=>{
//     let result=await Customer.find().populate("orders");
//     console.log(result[0]);
// }

// findCustomer();

//delete customer

const deleteCustomer= async()=>{
       await Customer.findByIdAndDelete('6af6c9cc19948b93c6dee174');
       console.log("deleted succesfully");

}
 
deleteCustomer();

// const addCustomer=async()=>{
//     let cust1=new Customer({
//         name:"Karan Arjun"
//     });

//     let order1=await Order.findOne({item:"Burger"});
//     let order2=await Order.findOne({item:"Pizza"});

//     cust1.orders.push(order1);
//     cust1.orders.push(order2);

//     let result=await cust1.save();
//     console.log(result);

// }

// addCustomer();

// const addOrder= async()=>{
//    let res=await Order.insertMany([
//     {item:"Burger",price:90},
//     {item:"Pizza",price:120},
//    ])

//    console.log(res);
// }

// addOrder();