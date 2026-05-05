import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger.js';
import orderRoutes from './routes/order.routes.js';
import customerRoutes from './routes/customer.routes.js';
import supplierRoutes from './routes/supplier.routes.js';
import productRoutes from './routes/product.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas de la aplicación
app.use('/api/v1', orderRoutes);
app.use('/api/v1', customerRoutes);
app.use('/api/v1', supplierRoutes);
app.use('/api/v1', productRoutes);

// Documentación de la API
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Bienvenido
app.get('/', (req, res) => {
    res.send(`
        <div>
            <p>La API está funcionando correctamente puedes acceder a la documentacion agregando /api/v1/docs a la URL o api/v1/health para verificar el estado del servicio.</p>
        </div>
    `);
});

app.get('/api/v1/health', (req, res) => {
    res.json({ status: 'ok', message: 'API is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Docs available at http://localhost:${PORT}/api/v1/docs`);
});
