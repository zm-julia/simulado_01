const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

function authMiddleware(req,res,next){
    let token = req.headers['authorization']

   if(!token){
       return res.status(401).json({message: 'Erro ao encontrar token!'})

   }

   try{
            const bytes = CryptoJS.AES.decrypt(token, CHAVE_SECRETA)
            const dadosDescriptografados = bytes.toString(CryptoJS.enc.Utf8)

            if(!dadosDescriptografados){
                 return res.status(401).json({message: 'token inválido!'})
            }

            const payload = JSON.parse(dadosDescriptografados)

            if(Date.now() < payload.tempo){
                 return res.status(401).json({message: 'Tempo expirado, faça login novamente'})
            }

            req.funcionario = payload
            next()
   }catch(err){
        console.error('Erro ao autenticar token!', err)
        return res.status(500).json({message: 'Erro ao autenticar token'})
   }
}

module.exports = authMiddleware