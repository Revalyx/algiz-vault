import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Importamos las rutas del cofre
import vaultRoutes from './routes/vault.routes';
// Cargamos variables de entorno
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middlewares de seguridad y utilidad.
app.use(helmet());
app.use(cors());
app.use(express.json());

// Ruta raíz de bienvenida
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    app: 'Algiz Vault API',
    version: '1.0.0',
    status: 'online',
    endpoints: {
      health: '/api/health',
      vault: '/api/vault'
    }
  });
});

// Ruta de comprobación de estado del servidor
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Algiz Vault API is running securely',
    timestamp: new Date().toISOString()
  });
});

// Montamos las rutas del cofre bajo el prefijo /api/vault
app.use('/api/vault', vaultRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});