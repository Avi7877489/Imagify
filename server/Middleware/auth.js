import jwt from 'jsonwebtoken'


export const userAuth = async(req,res,next)=>{

    const {token} = req.headers
    if(!token){
        return res.status(404).json({sucess:false,message:'Not Authirized. login again'})
    }
    try {
        const tokenDecoded = jwt.verify(token,process.env.JWT_SECRET)
        if(tokenDecoded.id){
            req.body.userId = tokenDecoded.id
        }else{
            return res.status(404).json({ success: false, message: 'NotAuthorized Login Again' })
        }
        next()
    } catch (error) {
        res.status(500).json({sucess:false,message:'error.message'})
    }
}