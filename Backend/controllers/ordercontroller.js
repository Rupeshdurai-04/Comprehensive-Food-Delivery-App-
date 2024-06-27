import orderModel from "../models/ordermodel.js";
import userModel from '../models/usermodel.js';
import Stripe from 'stripe'

const stripe = new Stripe("sk_test_51PHLvjSFvVARcOEc7J546Q2KLvE0fjC443R6BtiIDyUtAMOKYDo9c2SBOH4xg0npMqmg6JfIWVwrm4JCktHNUeCJ00PC4B0JQD")

// placing user order for frontend

const placeOrder = async(req,res)=>{
    const frontendUrl = 'http://localhost:5173'
    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        console.log(newOrder);
        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        
        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount: item.price *100 *80
            },
            quantity:item.quantity
        }))
           line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
           })
           const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items:line_items,
            mode:"payment",
            success_url:`${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontendUrl}/verify?success=false&orderId=${newOrder._id}`
           })
    
           res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const verifyOrder = async(req,res)=>{
    const{orderId,success} = req.body;
    try {
        if(success == 'true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// user orders for frontend

const userOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// listing orders for admin panel

const listOrder = async(req,res)=>{
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders}) 
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// api for updating order status

const updateStatus = async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {placeOrder,verifyOrder,userOrders,listOrder,updateStatus}