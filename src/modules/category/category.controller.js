const categorySvc=require("./category.service");
class CategoryContoller{
create =async(req,res,next)=>{
try{
const payload=categorySvc.transformCreateData(req);
const createdCategory=await categorySvc.store(payload)
res.json({
    result:createdCategory,
    message:"Category created successfully",
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

const data=await categorySvc.listAll({
    limit:limit,
    skip:skip,
    filter:filter
});
const countData=await categorySvc.count({
    filter:filter
})

res.json({
    result:data,
    message:"category list",
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
const detail=await categorySvc.findOne({
    _id:req.params.id
})
res.json({
    result:detail,
    meaaage:"category detail fetched",
    meta:null
})}
    
    catch(exception)
   { 
    next(exception)

}
}
update=async(req,res,next)=>{
    try {
        const existingData = await categorySvc.findOne({
            _id:req.params.id
        })
        const payload=categorySvc.transformUpdateData(req,existingData);
        const updateStatus=await categorySvc.update({_id:req.params.id},payload);
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
        await categorySvc.findOne({_id:req.params.id})
const status=await categorySvc.deleteOne({_id:req.params.id});
res.json({
    result:status,
    messgae:"Category deleted successfully",
    meta:null
})   

}
    catch(exception){
        next(exception)
    }
}
listForHome=async(req,res,next)=>{
    try{
const list = await categorySvc.getForHome()
res.json({
    result:list,
    message:"category listed successfully",
    meta:null

})
    }
    catch(exception){

    }
}
}
const categoryCtrl=new CategoryContoller()
module.exports=categoryCtrl