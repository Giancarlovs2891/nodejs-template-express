const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerAdminDocument = YAML.load('./src/swaggerDoc/swagger-admin.yaml');
const dbConnection = require('./src/database/connection');
const cronJob = require('./src/cron-job')

dotEnv.config();

const app = express();

// db connectivity
dbConnection();
cronJob();

// cors
app.use(cors());

// request payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1/user', require('./src/routes/userRoutes'));
app.use('/api/v1/customer', require('./src/routes/customerRoutes'));

// API Documentation
if (process.env.NODE_ENV != 'production') {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerAdminDocument));
}

app.get('/', (req, res, next) => {
    res.send('Template API');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// error handler middleware
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send({
        status: 500,
        message: err.message,
        body: {}
    });
})