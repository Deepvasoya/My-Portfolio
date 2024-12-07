// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const saveData = require('./api/save-data'); 

const app = express();
const port = 3000;
app.use(cors());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.post('/api/save-data', saveData);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
