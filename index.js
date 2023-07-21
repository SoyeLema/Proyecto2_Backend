const fs = require('fs')
const express = require('express')
const app = express()

app.listen(3000, console.log('Servidor iniciado en el puerto 3000 :)'))

app.use(express.json())

app.post('/canciones', (req, res) => {

    //{        id,        titulo: cancion.value,        artista: artista.value,        tono: tono.value,      };

    const cancion = req.body;

    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'))

    canciones.push(cancion)

    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))

    res.send('Canción agregada correctamente')

})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/canciones', (req, res) => {
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'))
    res.json(canciones);
})

app.delete('/canciones/:id', (req, res) => {

    const { id } = req.params;

    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'));

    let index = canciones.findIndex(c => c.id == id)  //let index = followersArray.findIndex(i => i.id === follower.id); //
    canciones.splice(index, 1)

    //OTRA FORMA
    // const filtrado = inscritos.filter(i => i.id != id);
    //fs.writeFileSync('inscritos.json', JSON.stringify(filtrado));


    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))

    res.send('Canción borrada correctamente')
})

app.put('/canciones/:id', (req, res) => {

    const { id } = req.params;
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'));

    let index = canciones.findIndex(c => c.id == id);

    canciones[index] = cancion;

    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))

    res.send('Canción modificada correctamente')
})