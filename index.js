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
    res.json({ status: "OK", txt: "Dados cadastrados" })
})

app.listen(PORT, () => console.log('Online'))