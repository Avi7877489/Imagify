import express from "express";
import { loginUsers, paymentRazorepay, regristerUser, userCredits } from "../controllers/userControllers.js";
import { userAuth } from "../Middleware/auth.js";

const userRouter = express.Router()

userRouter.post('/signup', regristerUser)

userRouter.post('/login', loginUsers)

userRouter.get('/credits',userAuth,userCredits)
userRouter.post('/pay',userAuth,paymentRazorepay)





export default userRouter