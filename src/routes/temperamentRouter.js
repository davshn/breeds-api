const { Router } = require('express');
const temperamentRouter = Router();
const {getTemperamentsDB}= require("../services.js");

temperamentRouter.get('/',async (req,res)=>{                //Responde con todos los temperamentos
    try{
        res.json(await getTemperamentsDB());}
    
    catch(e){   
        res.send("No response temperament"+e);} 
});

module.exports=temperamentRouter;
