const express = require('express');
const app = express();

// Middleware para procesar cuerpos de solicitud JSON
app.use(express.json());

// Middleware para procesar cuerpos de solicitud URL-encoded
app.use(express.urlencoded({ extended: true }));

const productos = [
    { id: 1, nombre: 'Iphone 15', precio: 5000 },
    { id: 2, nombre: 'Samsung S24', precio: 4800 },
    { id: 3, nombre: 'Xiaomi Redmi 11', precio: 2000 }
];

const clientes = [
    { id: 1, nombre: 'Marco ', apellido: 'Valencia' },
    { id: 2, nombre: 'Alfredo', apellido: 'Zegarra' },
    { id: 3, nombre: 'Rodrigo', apellido: 'Jimenez' }
];

// Obtener productos y clientes juntos
app.get('/productos-clientes', (req, res) => {
    res.json({
        productos: productos,
        clientes: clientes
    });
});

// Obtener todos los productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// Obtener todos los clientes
app.get('/clientes', (req, res) => {
    res.json(clientes);
});

// Crear un nuevo producto
app.post('/productos', (req, res) => {
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// Crear un nuevo cliente
app.post('/clientes', (req, res) => {
    const nuevoCliente = {
        id: clientes.length + 1,
        nombre: req.body.nombre,
        apellido: req.body.apellido
    };
    clientes.push(nuevoCliente);
    res.status(201).json(nuevoCliente);
});

// Actualizar un producto existente
app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);
    
    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    producto.nombre = req.body.nombre || producto.nombre;
    producto.precio = req.body.precio || producto.precio;

    res.json(producto);
});

// Actualizar un cliente existente
app.put('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = clientes.find(p => p.id === id);
    
    if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    cliente.nombre = req.body.nombre || cliente.nombre;
    cliente.apellido = req.body.apellido || cliente.apellido;

    res.json(cliente);
});

// Eliminar un producto existente
app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = productos.findIndex(p => p.id === id);

    if (indice === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const productoEliminado = productos.splice(indice, 1);
    res.json(productoEliminado);
});

// Eliminar un cliente existente
app.delete('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = clientes.findIndex(p => p.id === id);

    if (indice === -1) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    const clienteEliminado = clientes.splice(indice, 1);
    res.json(clienteEliminado);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
