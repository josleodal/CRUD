const express = require('express');
const app = express();
const methodOverride = require('method-override');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Usuario</title>
        </head>
        <body>
            <h1>Usuarios</h1>
            <ul id="lista">
                ${usuarios.map(
                    (usuario) => `<li>Nombre: ${usuario.nombre} - Edad: ${usuario.edad} - Nacionalidad: ${usuario.lugarProcedencia}</li>`
                ).join(" ")}
            </ul>

            <h2>Añadir Usuarios</h2>
            
            <form action="/usuarios" method="post">
                <label for="nombre">Nombre: </label>
                <input type="text" id="nombre" name="nombre" required >

                <label for="edad">Edad: </label>
                <input type="text" id="edad" name="edad" required >

                <label for="nacionalidad">Nacionalidad: </label>
                <input type="text" id="nacionalidad" name="lugarProcedencia" required >

                <button type="submit"> Añadir usuario</button>
            </form>

        </body>
        </html>
    `);
});

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});


app.get('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const usuarioAecontrar = usuarios.find(usuario => usuario.nombre === nombre);
    return res.send(usuarioAecontrar);

});




app.delete('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const usuarioAEliminar = usuarios.findIndex(usuario => usuario.nombre === nombre);
    
    if(usuarioAEliminar!==-1){

        usuarios.splice(indexAEliminar, 1);

    }
    
    return res.send(usuarios)
  
});

///////////////////////////////////////////////////

app.put('/usuarios/:nombre', (req, res) => {
   const nombre = req.params.nombre;
   const body = req.body

   usuarios.filter(element=>{

    if(element.nombre===nombre){

        element.edad= body.edad,
        element.nombre=body.nombre,
        element.lugarProcedencia=body.lugarProcedencia


    }
   })
   return res.send(usuarios)
});



/////////////////////////////////////////////

app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    };
    usuarios.push(nuevoUsuario);
    res.redirect('/');
});

app.listen(3000, () => {
    console.log("Servidor en funcionamiento en http://localhost:3000");
});
