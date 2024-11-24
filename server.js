const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();

// Enable CORS for all routes
app.use(cors());

// Use body-parser to parse JSON requests
app.use(bodyParser.json());

// Proxy endpoint
app.post('/proxy', async (req, res) => {
    const API_URL = 'https://api.langflow.astra.datastax.com';
    const { endpoint, body } = req.body;

    try {
        const response = await axios.post(`${API_URL}${endpoint}`, body, {
            headers: {
                Authorization: `Bearer AstraCS:ZGCCFiagvnrzQoWDZmZjJWeZ:c886fe0d4af7f7e11294c7d99b2e0d34de4dcd8f41685d0a49e54a6e7e1c15b8`,
                'Content-Type': 'application/json',
            },
        });

        // Send back the response from the Langflow API
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Proxy Error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            error: error.response?.data || 'Internal Server Error',
        });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
