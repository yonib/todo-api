const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const dotenv = require('dotenv');

const sequelize = require('./config/db');
const Todo = require('./models/todo');

dotenv.config();

async function initializeDB() {
  try {
    // Sync all models (create tables if they don't exist)
    await sequelize.sync({ force: false }); // `force: false` will not drop the table if it already exists
    console.log('Database synced successfully.');

    // Optionally, add a sample Todo
    await Todo.create({
      title: 'Sample Todo',
      description: 'This is a sample todo item.',
      completed: false,
    });
    console.log('Sample todo added.');
  } catch (error) {
    console.error('Error syncing the database:', error);
  }
}

initializeDB();

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'TODOs API',
      description: 'A simple CRUD API for managing TODOs',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/todoRoutes.js'], // Path to the API documentation
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/todos', require('./routes/todoRoutes'));

// Listen on configured port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
