const path = require('path');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path: 'output.csv',
    header: [
        { id: 'fileName', title: 'fileName' },
        { id: 'titre', title: 'titre' },
        { id: 'auteur', title: 'auteur' },
        { id: 'description', title: 'description' },
    ]
});

let csvData = [];

function deleteCsvFile() {
    const filePath = path.join(__dirname, 'output.csv');
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}

async function writeCsvData() {
    await csvWriter.writeRecords(csvData);
}

module.exports = {
    csvData,
    deleteCsvFile,
    writeCsvData
};
