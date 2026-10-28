let btn_cadastrar = document.getElementById('btn_cadastrar')
let resposta_cadastrar = document.getElementById('resposta_cadastrar')

btn_cadastrar.addEventListener('click', (e)=>{
    e.preventDefault()

    const entrega = {
        cidade: document.getElementById('cidade').value, 
        statusAtual: document.getElementById('statusAtual').value, 
        data: document.getElementById('data').value, 
        hora: document.getElementById('hora').value,
        idCarga: Number(document.getElementById('idCarga').value) 
    }

    fetch(`http://localhost:3000/entrega`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entrega)
    })

    .then(res => res.json())
    .then(dados =>{
        resposta_cadastrar.innerHTML = `<p>${dados.message}</p>`
        document.querySelector('form').reset()
})

.catch((err)=>{
    console.error('Erro ao cadastrar entrega!', err)
    resposta_cadastrar.innerHTML = `<p>Erro ao cadastrar entrega!</p>`
})
})