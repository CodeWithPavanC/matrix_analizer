import express from 'express';
import cors from 'cors';
import matrixRoutes from './routes/matrixRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());  // Enable CORS for frontend communication
app.use(express.json());  // Parse JSON bodies

// Routes
app.use('/api/matrix', matrixRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Matrix Analysis API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`📊 Matrix Analysis API ready`);
});
