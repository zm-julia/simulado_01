
const Motorista = require('../models/Motorista')
const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async(req,res)=>{
    const valores = req.body 

    if(!valores.nome || !valores.cnh || !valores.cpf || !valores.telefone){
        return res.status(400).json({message: 'Preencha todos os campos!'})
    }

    if(valores.cpf.length !== 11){
        return res.status(400).json({message: 'Preencha 11 digitps do cpf!'})
    }

    try{
  
        const cpfCriptografado = CryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()

        const cnhCriptografada = CryptoJS.AES.encrypt(valores.cnh, CHAVE_SECRETA).toString()

        await Motorista.create({
            nome: valores.nome, 
            cnh:  cnhCriptografada, 
            cpf: cpfCriptografado, 
            telefone: valores.telefone
        })
        return res.status(201).json({message: 'Motorista cadastrado com sucesso!'})

        
    }catch(err){
        console.error('Erro ao cadastrar Motorista!', err)
        return res.status(500).json({message: 'Erro ao cadastrar Motorista!'})

    }
}

module.exports = {cadastrar}