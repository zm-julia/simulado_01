const express = require('express')
const app = express()
const cors = require('cors')

const conn  = require('./db/conn')

require('./models/rel')

const funcionarioController = require('./controller/funcionario.controller')
const motoristaController = require('./controller/motorista.controller')
const cargaController = require('./controller/carga.controller')
const entregaController = require('./controller/entrega.controller')
const authController = require('./controller/auth.controller')
const authMiddleware = require('./middleware/auth.middleware')
const hostname = 'localhost'
const PORT = 3000

//middleware

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())


// rotas publicas

app.post('/logar', authController.logar)
app.post('/funcionario', funcionarioController.cadastrar)

app.get('/', (req,res)=>{
    res.status(200).json('Aplicação rodando!')
})

app.use(authMiddleware)

//rotas privadas

//motorista
app.post('/motorista', motoristaController.cadastrar)

//carga 
app.post('/carga', cargaController.cadastrar)

//entrega

app.post('/entrega', entregaController.cadastrar)


conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})

.catch((err)=>{
    console.error('Erro ao conectar com o banco de dados!', err)
})