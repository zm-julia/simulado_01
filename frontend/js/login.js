let btn_logar = document.getElementById('btn_logar')
let resposta_logar = document.getElementById('resposta_logar')

btn_logar.addEventListener('click', (e)=>{
    e.preventDefault()

    const logar = { 
        email: document.getElementById('email').value, 
        senha: document.getElementById('senha').value
    }

    fetch(`http://localhost:3000/logar`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(logar)
    })

    .then(res => res.json())
    .then(dados =>{
        resposta_cadastrar.innerHTML = `<p>${dados.message}</p>`
        document.querySelector('form').reset()
        if(dados.token){
            localStorage.setItem('nome', dados.nome )
            localStorage.setItem('token', dados.token )
            location.href = '../index.html'
        }
})

.catch((err)=>{
    console.error('Erro ao cadastrar funcionario!', err)
    resposta_cadastrar.innerHTML = `<p>Erro ao cadastrar funcionario!</p>`
})
})