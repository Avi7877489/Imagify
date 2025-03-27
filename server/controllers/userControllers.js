
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import razorpay from 'razorpay'
import transactionModel from '../models/transactionModel.js'



export const regristerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body
        if(!name || !email || !password){
            return res.status(404).json({sucess:false,message:'Missing Details'})
        }
        const hashPassword = await bcrypt.hash(password,10)
        const userData = {name,email,password:hashPassword}
        const newUser = new userModel(userData)
        const user = await newUser.save()
        
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.status(201).json({success:true,token,user:{name:user.name}})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:error.message})
    }
}

export const loginUsers = async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await userModel.findOne({email})
        
        if(!user){
            return res.status(404).json({success:false,message:'User not found'})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(404).json({success:false,message:'Enter correct password'})
        }else{
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.status(201).json({success:true,token,user:{name:user.name}})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:error.message})
    }
}

export const userCredits = async (req, res)=>{
    try {
    const {userId} = req. body
    const user = await userModel. findById(userId)

    res.status(201).json( {success: true, credits: user. creditBalance, user:{name: user. name}})
    } catch (error) {
    console. log(error. message)
    res. json({ success: false, message: error.message })

    }

}

const razorepayInstancs = new razorpay({
    key_id:process.env.RAZOREPAY_KEY_ID,
    key_secret:process.env.RAZOREPAY_KEY_SECRET
})

export const paymentRazorepay = async(req,res)=>{
    try {
        const {userId,planId} = req.body

        const userData = await userModel.findById(userId)
        
        if(!userId || !planId){
            return res.status(404).json({success:false,message:'Missing Details'})
        }

        let credits,plan,amount,date

        switch (planId) {
            case 'Basic':
                plan = 'Basic'
                credits = 100
                amount = 10
            case 'Advanced':
                plan = 'Advanced'
                credits = 500
                amount = 50
            case 'Business':
                plan = 'Business'
                credits = 5000
                amount = 250
                break;
        
            default:
                return res.status(404).json({success:false,message:'plan not found'})
        }

        date = Date.now()

        const transactionData = {
            userId,plan,amount,credits,date
        }
        const newTransaction = await transactionModel.create(transactionData)

        const options = {
            amount:amount * 100,
            currency:process.env.CURRENCY,
            receipt:newTransaction._id

        }
        await razorepayInstancs.orders.create(options,(error,order)=>{
            if(error){
                console.log(error)
                return res.status(404).json({success:false,message:error.message})
            }
            res.status(200).json({success:true,order})
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
}