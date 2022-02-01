const express = require('express')
const bodyparser = require('body-parser')
const PORT = process.env.PORT || 5265

const app = express()
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/frontend'))

app.post('/matches', (req, res) => {
    console.log(req.body)
    res.send('<h1>Partida criada</h1>')
})


app.listen(PORT, () => {
    console.log('http://localhost:' + PORT )
})

console.log(__dirname)