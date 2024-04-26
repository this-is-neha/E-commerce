const express =require("express")
const mainRoute=express.Router()



const authRouter=require("../modules/auth/auth.router")
const userRouter=require("../modules/user/user.router")

mainRoute.use('/auth',authRouter)
mainRoute.use('/user',userRouter)


module.exports=mainRoute