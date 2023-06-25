import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const Database = [
	{
		titulo: 'Harry Potter',
		editora: 'Rocco',
		foto: 'https://i.imgur.com/UH3IPXw.jpg',
		autores: ['JK Rowling', '...'],
	},
]

app.get('/obras', (req, res) => {
	res.status(200).json(Database)
})

app.post('/obras', (req, res) => {
	const { titulo, editora, foto, autores } = req.body

	if (!titulo || !editora || !foto || !autores || autores.length == 0) {
		return res.status(400).json({ status: 'Erro', txt: 'Valores faltando' })
	}

	Database.push({ titulo, editora, foto, autores })
	res.status(200).json({ status: 'OK', txt: 'Livro cadastrado' })
})

app.get('/obras/:id', (req, res) => {
	const id = Number(req.params.id)

	if (isNaN(id) || !Database[id]) {
		return res.status(404).json({ status: 'Erro', txt: 'ID invalido' })
	}

	res.status(200).json(Database[id])
})

app.put('/obras/:id', (req, res) => {
	const id = Number(req.params.id)

	if (isNaN(id) || !Database[id]) {
		return res.status(404).json({ status: 'Erro', txt: 'ID invalido' })
	}

	const { titulo, editora, foto, autores } = req.body

	if (titulo == '' || editora == '' || foto == '' || autores.length == 0) {
		return res.status(400).json({ status: 'Erro', txt: 'Campo vazio' })
	}

	if (titulo) Database[id].titulo = titulo
	if (editora) Database[id].editora = editora
	if (foto) Database[id].foto = foto
	if (autores) Database[id].autores = autores

	res.status(200).json({ status: 'OK', txt: 'Livro atualizado' })
})

app.delete('/obras/:id', (req, res) => {
	const id = Number(req.params.id)

	if (isNaN(id) || !Database[id]) {
		return res.status(404).json({ status: 'Erro', txt: 'ID invalido' })
	}

	delete Database[id]
	res.status(200).json({ status: 'OK', txt: 'Livro apagado' })
})

app.listen(PORT, () => console.log(`Online na porta ${PORT}`))
