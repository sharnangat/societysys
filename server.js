const express = require('express');
const { connectDB, sequelize } = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Start server
const startServer = async () => {
  await connectDB();
  // Use alter in dev to align Postgres schema with the current model.
  await sequelize.sync({ alter: true });
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
};

startServer();
