const { Router } = require('express');
const dogRouter = Router();
const {setBreed}= require("../services.js");

let id=270;                 //id para razas creadas (no unico por facilidad para tomar los datos detallados)

dogRouter.post('/',async (req,res)=>{                   //recibe por body los datos para crear una raza en la bd
    try{
        const { name,heightMin,heightMax,weightMin,weightMax,lifeSpan,temperament,image,origin} = req.body;
        await setBreed(id++,name,heightMin,heightMax,weightMin,weightMax,lifeSpan,temperament,image,origin);
        res.json({msg: id-1});}
    
    catch(e){   
        res.send("No response dog"+e);} 
});

module.exports=dogRouter;