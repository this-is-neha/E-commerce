const express = require("express")
const helmet=require("helmet")
const cors=require("cors")
const app = express();
app.use(helmet())
app.use(cors())
const mainRouter = require("./routing.config")

const router = express.Router()
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use("/assets/image",express.static('./public/images'))
router.get('/health', (req, res, next) => {
    res.json({
        result: "Hello there",
        message: "Successs OK",
        meta: null 

    })
})
app.use(router)
app.use(mainRouter)

app.use((request, response,next) => {
    next({
     code:404,
     message:"Resouce not found",
 
    })
 
   
 });
app.use((error,req,res,next)=>{

   const statusCode=error.code||500;
   const data=error.data||null;
   const msg=error.message||"Internal server error"
        res.status(statusCode).json({
            result: data,
            message: msg,
            meta: null
        })
    
})





module.exports = app