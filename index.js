const express = require('express')

const app = express()

const port = 3000

app.use(express.static('public'))

const server = app.listen(port, () => {
    console.log("Escuchando 3000")
})

// Inicializar votos
const candidates = {
    "0":{votes: 0, label: 'Javascript', color: randomRGB() },
    "1":{votes: 0, label: 'C#', color: randomRGB() },
    "2":{votes: 0, label: 'PHP', color: randomRGB() },
    "3":{votes: 0, label: 'Python', color: randomRGB() },
    "4":{votes: 0, label: 'Go', color: randomRGB() },
}

function randomRGB() {
    const r = () => Math.random() * 256 >> 0;
    return `rgb(${r()}), ${r()}),, ${r()}))`;
}