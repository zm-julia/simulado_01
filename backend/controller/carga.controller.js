
const Carga = require('../models/Carga')
const Motorista = require('../models/Motorista')


const cadastrar = async(req,res)=>{
    const valores = req.body 

    if(!valores.descricao || !valores.peso || !valores.volume || !valores.codRastreio || !valores.idMotorista){
        return res.status(400).json({message: 'Preencha todos os campos!'})
    }


    try{

        const motorista = await Motorista.findByPk(valores.idMotorista)
        if(!motorista){
             return res.status(400).json({message: 'Motorista não encontrado!'})
        }
  

        await Carga.create(valores)
        return res.status(201).json({message: 'Carga cadastrado com sucesso!'})

        
    }catch(err){
        console.error('Erro ao cadastrar carga!', err)
        return res.status(500).json({message: 'Erro ao cadastrar carga!'})

    }
}

module.exports = {cadastrar}