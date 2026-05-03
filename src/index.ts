import express from 'express';
import cors from 'cors';
import orderRoutes from './routes/order.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Prefijo obligatorio según la guía
app.use('/api/v1', orderRoutes);

app.get('/api/v1/health', (req, res) => {
    res.json({ status: 'ok', message: 'API is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Docs available at http://localhost:${PORT}/api/v1/docs`);
});
