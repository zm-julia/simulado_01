
const Carga = require('../models/Carga')
const Entrega = require('../models/Entrega')


const cadastrar = async(req,res)=>{
    const valores = req.body 

    if(!valores.cidade || !valores.statusAtual || !valores.data || !valores.hora || !valores.idCarga){
        return res.status(400).json({message: 'Preencha todos os campos!'})
    }


    try{

        const carga = await Carga.findByPk(valores.idCarga)
        if(!carga){
             return res.status(400).json({message: 'Carga não encontrado!'})
        }
  

        await Entrega.create(valores)
        return res.status(201).json({message: 'Entrega cadastrado com sucesso!'})

        
    }catch(err){
        console.error('Erro ao cadastrar Entrega!', err)
        return res.status(500).json({message: 'Erro ao cadastrar Entrega!'})

    }
}

module.exports = {cadastrar}