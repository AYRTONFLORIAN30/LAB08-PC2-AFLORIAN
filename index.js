import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

// Configuración del motor de plantillas Handlebars
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');

// Archivos estáticos
app.use(express.static('public'));

// Rutas para Préstamos
app.get('/', (req, res) => {
    res.render('prestamos/list');
});

app.get('/prestamos/list', (req, res) => {
    res.render('prestamos/list');
});

app.get('/prestamos/add', (req, res) => {
    res.render('prestamos/add');
});

app.get('/prestamos/edit/:id', (req, res) => {
    const { id } = req.params;
    // Aquí podrías buscar en la base de datos el préstamo con el ID para prellenar los datos
    res.render('prestamos/edit', { id }); // Pasa el ID a la vista si es necesario
});

// Rutas para Estados de Préstamo
app.get('/estados/list', (req, res) => {
    res.render('estados/list');
});

app.get('/estados/add', (req, res) => {
    res.render('estados/add');
});

app.get('/estados/edit/:id', (req, res) => {
    const { id } = req.params;
    // Aquí podrías buscar en la base de datos el estado con el ID para prellenar los datos
    res.render('estados/edit', { id }); // Pasa el ID a la vista si es necesario
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor funcionando en http://localhost:3000');
});
