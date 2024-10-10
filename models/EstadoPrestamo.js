import mongoose from 'mongoose';

const EstadoPrestamoSchema = new mongoose.Schema({
    id_prestamo: { type: Number, required: true },
    estado_prestamo: { type: String, required: true },
    tipo_prestamo: { type: String, required: true },
});

export default mongoose.model('EstadoPrestamo', EstadoPrestamoSchema);
