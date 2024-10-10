import mongoose from 'mongoose';

const PrestamoSchema = new mongoose.Schema({
    id_prestamo: Number,
    id_usuario: Number,
    fecha_prestamo: Date,
    fecha_devolucion: Date,
    estado: String,
    multa: Number
});

const Prestamo = mongoose.model('Prestamo', PrestamoSchema);
export default Prestamo;
