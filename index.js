const express = require('express')

const app = express()

const port = 3000

app.use(express.static('public'))

const server = app.listen(port, () => {
    console.log("Escuchando 3000")
})

// Inicializar productos
const candidates = {
    "0":{votes: 0, label: 'UPS', color: randomRGB() },
    "1":{votes: 0, label: 'Aires de precisión', color: randomRGB() },
    "2":{votes: 0, label: 'Baterias de litio', color: randomRGB() },
    "3":{votes: 0, label: 'Rectificadores', color: randomRGB() },
    "4":{votes: 0, label: 'Reguladores de potencia', color: randomRGB() },
}

function randomRGB() {
    const r = () => Math.random() * 256 >> 0;
    return `rgb(${r()}, ${r()}, ${r()})`;
}

// socket.io con express
const io = require('socket.io')(server)
io.on('connection',(socket) => {
    console.log('Nuevo cliente conectado')
    // Mandar datos
    io.emit('update', candidates)

    // Cuando alguien selecciona una opcion
    socket.on('vote',(index, valor) => {
        if(candidates[index]){
            candidates[index].votes += valor
        }

        // Mostrar si alguien voto
        io.emit('update',candidates)
    });

    socket.on('reset',(index) => {
        candidates[0].votes = 0
        candidates[1].votes = 0
        candidates[2].votes = 0
        candidates[3].votes = 0
        candidates[4].votes = 0
        // Mostrar si alguien voto
        io.emit('update',candidates)
    })
})