require('dotenv').config()
const cors = require('cors')
const express = require('express')
const { readPosts, createPost, updateSong, deleteSong } = require('../utils/pg')

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/posts', async (_, res) => {
  const posts = await readPosts()
  res.status(200).json(posts)
})

app.post('/posts', async (req, res) => {
  const { titulo, url, descripcion } = req.body
  const posts = await createPost({ titulo, url, descripcion })
  res.status(200).json(posts)
})

app.put('/posts/like/:id', (req, res) => {
  updateSong(req.params.id)
    .then((result) => res.status(result?.code ? 500 : 200).json(result))
    .catch((error) => res.status(500).json(error))
})

app.delete('/posts/:id', (req, res) => {
  deleteSong(req.params.id)
    .then((result) => res.status(result?.code ? 500 : 200).json(result))
    .catch((error) => res.status(500).json(error))
})

app.all('*', (_, res) => res.status(404).json({ code: 404, message: 'Esta ruta no existe 🧐' }))

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
