import userModel from "../models/userModel.js"
import FormData from 'form-data'
import axios from 'axios'

export const generateImage = async(req,res)=>{
    try {
        const {userId,prompt} = req.body
        const user = await userModel.findById(userId)

        if(!user || !prompt){
            return res.status(404).json({success:false,message:'Messing Detailes'})
        }

        if(user.creditBalance===0 || userModel.creditBalance < 0){
            return res.status(404).json({success:false,message:'No credit balance', creditBalance:user.creditBalance})
        }

        const formData = new FormData()
        formData.append('prompt',prompt)

        const {data} = await axios.post(' https://clipdrop-api.co/text-to-image/v1', formData,{headers: {
            'x-api-key': process.env.CLIPDROP_API,
          },
        responseType:'arraybuffer'
        })

        const basse65Image = Buffer.from(data,'binary').toString('base64')

        const resultImage = `data:image/png;base64,${basse65Image}`
        await userModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance-1})

        res.status(200).json({success:true,message:'Image Generated', creditBalance:user.creditBalance-1,resultImage})


    } catch (error) {   
        console.log(error.message)
        res.status(500).json({success:false, message:error.message})

    }
}