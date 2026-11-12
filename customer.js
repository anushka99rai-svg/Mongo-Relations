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

const Order= mongoose.model("Order",orderSchema);
const Customer=mongoose.model("Customer",customerSchema);

const findCustomer=async()=>{
    let result=await Customer.find().populate("orders");
    console.log(result[0]);
}

findCustomer();
// const addCustomer=async()=>{
//     let cust1=new Customer({
//         name:"Rahul Kumar"
//     });

//     let order1=await Order.findOne({item:"Chips"});
//     let order2=await Order.findOne({item:"Samosa"});

//     cust1.orders.push(order1);
//     cust1.orders.push(order2);

//     let result=await cust1.save();
//     console.log(result);

// }

// addCustomer();
// const addOrder= async()=>{
//    let res=await Order.insertMany([
//     {item:"Samosa",price:20},
//     {item:"Chips",price:25},
//     {item:"Chocolate",price:30}
//    ]);

//    console.log(res);
// }

// addOrder();