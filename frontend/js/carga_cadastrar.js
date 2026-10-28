let btn_cadastrar = document.getElementById('btn_cadastrar')
let resposta_cadastrar = document.getElementById('resposta_cadastrar')

btn_cadastrar.addEventListener('click', (e)=>{
    e.preventDefault()

    const carga = {
        descricao: document.getElementById('descricao').value, 
        peso: Number(document.getElementById('peso').value), 
        volume: Number(document.getElementById('volume').value), 
        codRastreio: document.getElementById('codRastreio').value,
        idMotorista: Number(document.getElementById('idMotorista').value) 
    }

    fetch(`http://localhost:3000/carga`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carga)
    })

    .then(res => res.json())
    .then(dados =>{
        resposta_cadastrar.innerHTML = `<p>${dados.message}</p>`
        document.querySelector('form').reset()
})

.catch((err)=>{
    console.error('Erro ao cadastrar carga!', err)
    resposta_cadastrar.innerHTML = `<p>Erro ao cadastrar carga!</p>`
})
})