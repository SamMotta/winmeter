const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

const database = require('./src/database.js')
const PORT = process.env.PORT || 5265
const app = express()

app.use(cors())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/frontend'))

app.post('/createMatches', (req, res) => {
    database.createMatch(req.body)
    res.redirect('/')
})

// assíncrono porque precisa esperar o SQL
app.get('/viewMatches', async (req, res) => {
    const matchesRAW = await database.showMatches()
    res.json(matchesRAW)
})


app.listen(PORT, () => {
    console.log('http://localhost:' + PORT )
})

console.log(__dirname)