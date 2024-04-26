class  AuthController {
   
    register= (req,res,next) => { 
        const payload=req.body;

        res.json({
            result:payload,
            message:"Register success",
            meta:null
        })

    }


    login=(req,res,next)=>({

    })

    
}

const authCtrl=new AuthController()
module.exports=authCtrl