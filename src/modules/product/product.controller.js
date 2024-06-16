const productSvc=require("./product.service");
class ProductContoller{
create =async(req,res,next)=>{
try{
const payload=productSvc.transformCreateData(req);
const createdProduct=await productSvc.store(payload)
res.json({
    result:createdProduct,
    message:"Product created successfully",
    meta:null

})
}
catch(exception){
    next(exception)
}
}
index=async(req,res,next)=>{
    try{

        
const page= +req.query.page||1;
const limit=req.query.limit||15
const skip=(page-1)*limit;

let filter={};
if(req.query.search){
    filter={
        title:new RegExp(req.query.search,'i')
        
    
    }
}

const data=await productSvc.listAll({
    limit:limit,
    skip:skip,
    filter:filter
});
const countData=await productSvc.count({
    filter:filter
})

res.json({
    result:data,
    message:"product list",
    meta:{
        limit:limit,
        page:page,
        total:countData
    }
})
    }
    catch(exception){
        next(exception)
    }
}
show=async(req,res,next)=>{
    try{
const detail=await productSvc.findOne({
    _id:req.params.id
})
res.json({
    result:detail,
    meaaage:"Product detail fetched",
    meta:null
})}
    
    catch(exception)
   { 
    next(exception)

}
}
update=async(req,res,next)=>{
    try {
        const existingData = await productSvc.findOne({
            _id:req.params.id
        })
        const payload=productSvc.transformUpdateData(req,existingData);
        const updateStatus=await productSvc.update({_id:req.params.id},payload);
        res.json({
            result:updateStatus,
            message:"Data updated",
            meta:null
        
        })
    } 
    catch (exception) {
        next(exception)
        
    }

}



delete =async(req,res,next)=>{
    try{
        await productSvc.findOne({_id:req.params.id})
const status=await productSvc.deleteOne({_id:req.params.id});
res.json({
    result:status,
    messgae:"Product deleted successfully",
    meta:null
})   

}
    catch(exception){
        next(exception)
    }
}
listForHome=async(req,res,next)=>{
    try{
const list = await productSvc.getForHome()
res.json({
    result:list,
    message:"Product listed successfully",
    meta:null

})
    }
    catch(exception){

    }
}
}
const productCtrl=new ProductContoller()
module.exports=productCtrl