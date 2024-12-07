// api/save-data.js
const fs = require('fs');
const path = require('path');

const saveData = (req, res) => {
    const userData = req.body; // Get data from the request

    // Define the path to the JSON file
    const filePath = path.join(__dirname, '..', 'userData.json');

    // Read the current contents of the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ message: 'Error saving data' });
        }

        let jsonData = [];

        // If the file has data, parse it
        if (data) {
            try {
                jsonData = JSON.parse(data);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                return res.status(500).json({ message: 'Error parsing data' });
            }
        }

        // Append the new data
        jsonData.push(userData);

        // Write the updated data back to the file
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ message: 'Error saving data' });
            }

            console.log('Data saved successfully');
            res.status(200).json({ message: 'Data saved' });
        });
    });
};

module.exports = saveData;
