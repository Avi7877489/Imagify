import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import ConnectDb from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'


const PORT = process.env.PORT
const app = express()


app.use(express.json())
app.use(cors())
await ConnectDb()


app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)


app.get('/', (req,res)=>{
    res.send('AIP Working')
})

app.listen(PORT,()=>console.log(`server at http://localhost:${PORT}`))