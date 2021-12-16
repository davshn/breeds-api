const { Router } = require('express');
const dogsRouter = Router();
const {getBreedsAll}= require("../services.js");

dogsRouter.get('/',async (req,res)=>{
    const name=req.query.name;
    try{
        const breeds=   await getBreedsAll();
            if (name){
                const race= breeds.filter(breed=>breed.name.toLowerCase().includes(name.toLowerCase()));      //Si la ruta dog ademas tiene un query name filtra por nombre de la raza
                if ( race.length===0){{res.status(400).json({msg: 'La raza ingresada no existe'})}}
                else res.json( race);
            }
            res.json( breeds);}     //Si no responde con el listado de razas
                                          
     catch(e){   
         res.send("No response dogs"+e);}
});

dogsRouter.get('/:id',async (req,res)=>{                               
    try{
        const breeds= await getBreedsAll();
        const id =parseInt(req.params.id);
        const race= breeds.filter(breed=>breed.id===id)                //Filtra por el id ingresado por parametro
        if (race.length===0){{res.status(400).json({msg: 'La raza ingresada no existe'})}};
        res.json(race);}

    catch(e){   
        res.send("No response dogs/:id"+e);}
});

module.exports=dogsRouter;
