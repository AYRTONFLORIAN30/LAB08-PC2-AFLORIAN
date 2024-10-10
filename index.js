import express from 'express';
import moment from 'moment';
import { engine } from 'express-handlebars';
import connectDB from './db.js'; 
import Prestamo from './models/Prestamo.js'; 
import EstadoPrestamo from './models/EstadoPrestamo.js'; 
import { formatDate } from './helpers.js'; 

const app = express();

// Conectar a MongoDB
connectDB();

// Configuración del motor de plantillas Handlebars
app.engine('hbs', engine({
    extname: '.hbs',
    helpers: { 
        formatDate
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('view engine', 'hbs');
app.set('views', './views');

// Configuración para procesar datos de formularios
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static('public'));

// Rutas para Préstamos
app.get('/', async (req, res) => {
    try {
        const prestamos = await Prestamo.find();
        res.render('prestamos/list', { prestamos });
    } catch (err) {
        console.error('Error al obtener los préstamos:', err);
        res.status(500).send('Error al obtener los préstamos');
    }
});

app.get('/prestamos/list', async (req, res) => {
    try {
        const prestamos = await Prestamo.find();
        res.render('prestamos/list', { prestamos });
    } catch (err) {
        console.error('Error al obtener los préstamos:', err);
        res.status(500).send('Error al obtener los préstamos');
    }
});

// Ruta para mostrar el formulario de añadir un préstamo
app.get('/prestamos/add', (req, res) => {
    res.render('prestamos/add');
});

// Ruta para añadir un préstamo (método POST)
app.post('/prestamos/add', async (req, res) => {
    try {
        const nuevoPrestamo = new Prestamo(req.body);
        await nuevoPrestamo.save();
        res.redirect('/prestamos/list');
    } catch (err) {
        console.error('Error al añadir el préstamo:', err);
        res.status(500).send('Error al añadir el préstamo');
    }
});

// Ruta para mostrar el formulario de edición
app.get('/prestamos/edit/:id', async (req, res) => {
    try {
        const prestamo = await Prestamo.findById(req.params.id);
        
        if (prestamo.fecha_prestamo && moment(prestamo.fecha_prestamo).isValid()) {
            prestamo.fecha_prestamo = moment(prestamo.fecha_prestamo).format('YYYY-MM-DD');
        }

        if (prestamo.fecha_devolucion && moment(prestamo.fecha_devolucion).isValid()) {
            prestamo.fecha_devolucion = moment(prestamo.fecha_devolucion).format('YYYY-MM-DD');
        }

        res.render('prestamos/edit', { prestamo });
    } catch (err) {
        console.error('Error al obtener el préstamo para editar:', err);
        res.status(500).send('Error al obtener el préstamo para editar');
    }
});

// Ruta para procesar la actualización del préstamo (método POST)
app.post('/prestamos/edit/:id', async (req, res) => {
    try {
        await Prestamo.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/prestamos/list');
    } catch (err) {
        console.error('Error al actualizar el préstamo:', err);
        res.status(500).send('Error al actualizar el préstamo');
    }
});

// Ruta para eliminar un préstamo
app.post('/prestamos/delete/:id', async (req, res) => {
    try {
        await Prestamo.findByIdAndDelete(req.params.id);
        res.redirect('/prestamos/list');
    } catch (err) {
        console.error('Error al eliminar el préstamo:', err);
        res.status(500).send('Error al eliminar el préstamo');
    }
});

// Rutas para Estados de Préstamo
app.get('/estados/list', async (req, res) => {
    try {
        const estados = await EstadoPrestamo.find();
        res.render('estados/list', { estados });
    } catch (err) {
        console.error('Error al obtener los estados de préstamo:', err);
        res.status(500).send('Error al obtener los estados de préstamo');
    }
});

// Ruta para mostrar el formulario de añadir un estado de préstamo
app.get('/estados/add', (req, res) => {
    res.render('estados/add');
});

// Ruta para añadir un estado de préstamo (método POST)
app.post('/estados/add', async (req, res) => {
    try {
        const nuevoEstado = new EstadoPrestamo(req.body);
        await nuevoEstado.save();
        res.redirect('/estados/list');
    } catch (err) {
        console.error('Error al añadir el estado de préstamo:', err);
        res.status(500).send('Error al añadir el estado de préstamo');
    }
});

// Ruta para mostrar el formulario de edición de un estado de préstamo
app.get('/estados/edit/:id', async (req, res) => {
    try {
        const estado = await EstadoPrestamo.findById(req.params.id);
        res.render('estados/edit', { estado });
    } catch (err) {
        console.error('Error al obtener el estado de préstamo para editar:', err);
        res.status(500).send('Error al obtener el estado de préstamo para editar');
    }
});

// Ruta para procesar la actualización del estado de préstamo (método POST)
app.post('/estados/edit/:id', async (req, res) => {
    try {
        await EstadoPrestamo.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/estados/list');
    } catch (err) {
        console.error('Error al actualizar el estado de préstamo:', err);
        res.status(500).send('Error al actualizar el estado de préstamo');
    }
});

// Ruta para eliminar un estado de préstamo con confirmación
app.post('/estados/delete/:id', async (req, res) => {
    try {
        await EstadoPrestamo.findByIdAndDelete(req.params.id);
        res.redirect('/estados/list');
    } catch (err) {
        console.error('Error al eliminar el estado de préstamo:', err);
        res.status(500).send('Error al eliminar el estado de préstamo');
    }
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor funcionando en http://localhost:3000');
});
