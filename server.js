const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001; 

app.use(cors());
app.use(bodyParser.json());

const archivoContactos = path.join(__dirname, 'contactos.json');

// Cargar contactos 
const cargarContactos = () => {
    if (fs.existsSync(archivoContactos)) {
        const datos = fs.readFileSync(archivoContactos);
        return JSON.parse(datos);
    }
    return [];
};

let contactos = cargarContactos(); // Cargar contacto


app.get('/', (req, res) => {
    res.send('A este mismo link, agrele el: /contactos para que vea los contactos agregados en el formato JSON');
});

// Listar contactos
app.get('/contactos', (req, res) => {
    res.json(contactos);
});

// Almacenar contacto
app.post('/contactos', (req, res) => {
    const nuevoContacto = req.body;
    contactos.push(nuevoContacto);
    fs.writeFileSync(archivoContactos, JSON.stringify(contactos, null, 2)); // Guardar en el archivo
    res.status(201).json(nuevoContacto);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
