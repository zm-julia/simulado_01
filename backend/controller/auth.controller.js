const Funcionario = require('../models/Funcionario')
const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'


const logar = async(req,res)=>{
    const valores = req.body 

    if(!valores.email || !valores.senha){
          return res.status(400).json({message: 'Preencha todos os campos!'})
    }

    try{
        const funcionario = await Funcionario.findOne({where: {email: valores.email}})
          if(!funcionario){
             return res.status(400).json({message: 'funcionario não encontrado!'})
        }

        const bytes = CryptoJS.AES.decrypt(funcionario.senha, CHAVE_SECRETA)
        const senhaBD = bytes.toString(CryptoJS.enc.Utf8)

        if(valores.senha !== senhaBD){
             return res.status(400).json({message: 'Senha incorreta!'})
        }

        const HorasEmMs = 3 * 60 * 60 * 100
        const tempoExpiracao = Date.now() + HorasEmMs

        const payload = {
            idFuncionario:  funcionario.codFuncionario,
            nome: funcionario.nome, 
            tempo: tempoExpiracao

        }

        const token = CryptoJS.AES.encrypt(JSON.stringify(payload), CHAVE_SECRETA).toString()
        return res.status(200).json({
            message: 'Funcionario logado com sucesso!',
            nome: funcionario.nome, 
            token: token


        })
    }catch(err){
        console.error('Erro ao logar funcionario!', err)
        return res.status(500).json({message: 'Erro ao logar funcionario!'})

    }
}

module.exports = {logar}