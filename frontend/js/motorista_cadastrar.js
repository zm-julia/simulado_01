let btn_cadastrar = document.getElementById('btn_cadastrar')
let resposta_cadastrar = document.getElementById('resposta_cadastrar')

btn_cadastrar.addEventListener('click', (e)=>{
    e.preventDefault()

    const motorista = {
        nome: document.getElementById('nome').value, 
        cnh: document.getElementById('cnh').value, 
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value
    }

    fetch(`http://localhost:3000/motorista`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(motorista)
    })

    .then(res => res.json())
    .then(dados =>{
        resposta_cadastrar.innerHTML = `<p>${dados.message}</p>`
        document.querySelector('form').reset()
})

.catch((err)=>{
    console.error('Erro ao cadastrar motorista!', err)
    resposta_cadastrar.innerHTML = `<p>Erro ao cadastrar motorista!</p>`
})
})