const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const PORT = process.env.PORT || 3000


app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const DB = [
    { 
        titulo: 'Harry Potter', 
        editora: 'Rocco',
        foto: 'https://i.imgur.com/UH3IPXw.jpg', 
        autores: ["JK Rowling", "..."]
    }
]

app.get('/obras', (req, res) => {
    res.status(200)
    res.json(DB)
})


app.post('/obras', (req, res) => {
    const { titulo, editora, foto, autores } = req.body

    if(!titulo || !editora || !foto || !autores || autores.lenght == 0){
        res.status(400)
        res.json({ status: "Erro",  txt: "Valores faltando" })
        return
    }

    DB.push({ titulo, editora, foto, autores })
    res.status(200)
    res.json({ status: "OK", txt: "Livro cadastrado" })
})

app.put('/obras/:id', (req, res) => {
    const id = req.params.id

    if(isNaN(id) || !DB[id]){
        res.status(404)
        res.json({ status: "Erro",  txt: "ID invalido" })
        return
    }

    const { titulo, editora, foto, autores } = req.body

    if(titulo == "" || editora == "" || foto == "" || autores.lenght == 0){
        res.status(400)
        res.json({ status: "Erro",  txt: "Campo vazio" })
        return
    }

    if(titulo) DB[id].titulo = titulo
    if(editora) DB[id].editora = editora
    if(foto) DB[id].foto = foto
    if(autores) DB[id].autores = autores

    res.status(200)
    res.json({ status: "OK", txt: "Livro atualizado" })
})

app.delete('/obras/:id', (req, res) => {
    const id = req.params.id

    if(isNaN(id) || !DB[id]){
        res.status(404)
        res.json({ status: "Erro",  txt: "ID invalido" })
        return
    }

    delete DB[id]
    res.status(200)
    res.json({ status: "OK", txt: "Livro apagado" })
})

app.listen(PORT, () => console.log('Online'))