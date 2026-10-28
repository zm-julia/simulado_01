const {Funcionario, Motorista, Carga, Entrega} = require('./models/rel')
const conn = require('./db/conn')

async function syncDataBase() {

    try{
        await conn.sync({force: true})
        console.log('Conectando com o banco de dados!')

    }catch(err){
         console.error('Erro de conexão com o banco de dados!', err)

    }finally{
        conn.close()
         console.log('Finalizando conexão com o banco de dados!')


    }
    
}

syncDataBase()