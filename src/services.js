const axios = require('axios');
const { Dog,Temperament } = require('./db');

const getBreedsApi = async()=>{                                 //Trae las razas de la api
    try{
        const apiInfo = await axios.get('https://api.thedogapi.com/v1/breeds',{
            headers:{'x-api-key':`006605a5f-6757-4526-b72c-ff707727c6d5`}});
        const breedsInfo= apiInfo.data.map((element)=>{
            return {
                id:element.id,
                name:element.name,
                heightMin:parseInt(element.height.metric.split(' - ')[0]),              //Separa los valores en dos y los hace numericos
                heightMax:parseInt(element.height.metric.split(' - ')[1]),
                origin:element.origin,
                weightMin:parseInt(element.weight.metric.split(' - ')[0]),
                weightMax:parseInt(element.weight.metric.split(' - ')[1]),
                lifeSpan:element.life_span.slice(0, -6),
                image:element.image.url,
                created:false,
                temperament:element.temperament,
            }
        });
        return breedsInfo;}

    catch(e){   
        console.log(e);}
}

const getBreedsDB= async ()=>{                              //Relaciona los datos de las razas almacenadas en la db los atributos temperamento
    try{
        const dBInfo= await Dog.findAll({
            include:{
                model:Temperament,
                attributes:['temperament'],
                through:{
                    attributes:[],
                },
            }
        })
        return dBInfo;}
    
    catch(e){   
        console.log(e);}
}

async function setTemperaments (){                          
    try{
        const infoApi = await getBreedsApi();                           //Trae los datos de las razas
        const getTemper = infoApi.map(element=>element.temperament);
        getTemper.forEach(temps => {
            if(temps!==undefined){
                for (let i=0;i<temps.split(',').length;i++){            //Separa los temperamentos 
                    const temp=temps.split(', ')[i];
                    Temperament.findOrCreate({                              //Almacena los temperamentos en la BD no guarda los repetidos
                        where:{temperament:temp}
                    })
                }
            }
        });}

    catch(e){   
        console.log(e);}
}

setTemperaments();

async function searchTemperament (temperament){                     //Busca temperamentos en la BD
        try{
            const temperaments= await Temperament.findAll({
            where:{temperament:temperament}
            })
            return temperaments;}

        catch(e){   
            console.log(e);}
    }

module.exports= {
    getBreedsAll:async()=>{                                 //Consolida los datos traidos junto a los de la db
        try{
            const infoApi = await getBreedsApi();
            const infoDB = await getBreedsDB();
            const infoAll= infoApi.concat(infoDB);
            return infoAll;
        }

        catch(e){   
            console.log(e);}
    },
    getTemperamentsDB: async ()=>{                      //Trae los temperamentos de la db
        try{
            const dBInfo= await Temperament.findAll()
            return dBInfo;}

        catch(e){   
            console.log(e);}
    },
    setBreed: async (id,name,heightMin,heightMax,weightMin,weightMax,lifeSpan,temperament,image,origin)=>{      //Crea una raza en la db
        try{
            const temp= await searchTemperament(temperament);
            const newBreed= await Dog.create({
                id:id,
                name:name,
                heightMin:heightMin,
                heightMax:heightMax,
                weightMin:weightMin,
                weightMax:weightMax,
                lifeSpan:lifeSpan,
                origin:origin,
                image:image,
            })
            newBreed.addTemperament(temp);                              //Relaciona sus temperamentos
        }

        catch(e){   
            console.log(e);}
    }
}