const router=require("express").Router();
const analytics =require("../middleware/analytic");

router.get("/blog-stats",analytics,(req,res)=>{
    return res.status(200).send({status:true,data:req.expectedData});
})
router.get("/blog-search",analytics,(req,res)=>{
    return res.status(200).send({status:true,data:req.expectedData});
})

module.exports=router;
