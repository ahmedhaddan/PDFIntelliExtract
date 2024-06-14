const fs = require('fs');
const path = require('path');
const axios = require('axios');
const base64Img = require('base64-img');
const config = require('./config');
const { csvData } = require('./csv');

function encodeImage(imagePath) {
    return base64Img.base64Sync(imagePath);
}

function cleanJsonString(jsonString) {
    return jsonString.replace(/```json/g, '').replace(/```/g, '').trim();
}

async function analyzeImage(imagePath) {
    if (!config.apiKey) {
        console.error('API key not set');
        return;
    }

    const base64Image = encodeImage(imagePath);
    const base64ImageContent = base64Image.split(',')[1];

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
    };

    const payload = {
        model: 'gpt-4o',
        messages: [
            {
                role: 'user',
                content: [
                    {
                        type: 'text',
                        text: 'Donne moi le Titre et auteur et une petite description de 3 ligne max sous format dun object json sans aucun autre text et respecte cette format titre, auteur, description , with properly structured JSON'
                    },
                    {
                        type: 'image_url',
                        image_url: {
                            url: `data:image/jpeg;base64,${base64ImageContent}`
                        }
                    }
                ]
            }
        ],
        response_format: { type: 'json_object' },
        max_tokens: 300
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', payload, { headers });
        const data = JSON.parse(cleanJsonString(response.data.choices[0].message.content));
        console.log('Data:', data);
        csvData.push({
            fileName: path.basename(imagePath, path.extname(imagePath)),  // Include the file name
            titre: data.titre,
            auteur: data.auteur,
            description: data.description,
            //TVA: data.TVA
        });
        console.log('CSV Data:', csvData);
    } catch (error) {
        console.error('Error analyzing image:', error.response ? error.response.data : error.message);
    }
}

async function analyzeAllImagesInDirectory(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const filePath = path.join(directory, file);
        if (['.png', '.jpg', '.jpeg'].includes(path.extname(file).toLowerCase())) {
            await analyzeImage(filePath);
        }
    }
}

module.exports = {
    encodeImage,
    analyzeImage,
    analyzeAllImagesInDirectory
};


