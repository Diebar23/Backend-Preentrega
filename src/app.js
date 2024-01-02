
const express = require("express");
const app = express();
const PUERTO = 8080;

//Sistema de gestión de clientes: 

const clientes = [
    {id: "1", nombre: "Lionel", apellido: "Messi"},
    {id: "2", nombre: "Fideo", apellido: "Di Maria"},
    {id: "3", nombre: "Dibu", apellido: "Martinez"},
    {id: "4", nombre: "Bati", apellido: "Gol"}
]

//1) Que la ruta raiz "/" me traiga todos los clientes. 

app.get("/", (req, res)=> {
    res.send(clientes);
})

//2) La ruta get "/:id" debera traer solo el cliente con el id seleccionado: 

app.get("/:id", (req, res)=> {
    let {id} = req.params;

    const buscado = clientes.find(cliente => cliente.id == id);

    if(buscado) {
        return res.send(buscado);
    } else {
        return res.send("No se encuentra el cliente con el ID");
    }
})

//POST: sirve para crear recursos. 
//3) Vamos a agregar un nuevo cliente: 

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post("/", (req, res)=> {
    const clienteNuevo = req.body;

    clientes.push(clienteNuevo);
    console.log(clientes);
    res.send({status:"success", message: "Cliente creado"});
})

//4) La ruta put "/:id" deberá tomar un cliente y actualizarlo por los campos enviados desde el body. 

app.put("/:id", (req, res) => {
    const {id} = req.params;
    const {nombre, apellido} = req.body;

    //Una vez que yo tengo el ID tengo que buscarlo en mi Array de Clientes: 
    const clienteIndex = clientes.findIndex(cliente => cliente.id === id);

    if(clienteIndex !== -1){
        //Si esto ocurre, quiere decir que lo encontré: 
        //Siguiente: actualizo los datos: 
        clientes[clienteIndex].nombre = nombre;
        clientes[clienteIndex].apellido = apellido;

        //Muestro mi array de clientes de forma actualizada: 
        console.log(clientes);

        res.send({status:"success", message: "Cliente actualizado"});
    } else {
        res.status(404).send({status: "error", message: "Cliente no encontrado"});
    }
})

//5) La ruta DELETE "/:id" deberá eliminar el cliente con el id indicado: 

app.delete("/:id", (req, res) => {
    const {id} = req.params;

    const clienteIndex = clientes.findIndex(cliente => cliente.id === id);

    if(clienteIndex !== -1) {
        //Si el cliente existe, lo voy a eliminar. 
        clientes.splice(clienteIndex, 1);

        console.log(clientes);
        res.send({status:"success", message: "Cliente eliminado"});
    } else {
        res.status(404).send({status:"error", message: "Cliente no encontrado"});
    }
})



//No se olviden del "listen" para que escuche todas las rutas: 

app.listen(PUERTO, ()=> {
    console.log(`Escuchando en http://localhost:${PUERTO}`);
})
