const { deleteCsvFile, writeCsvData, csvData } = require('./csv');
const { processAllPdfsInDirectory } = require('./pdfUtils');
const { analyzeAllImagesInDirectory } = require('./imageUtils');
const { emptyDirectory, moveFiles } = require('./fileUtils');
const config = require('./config');

async function processFiles(req, res) {
    const pdfDirectory = 'pdfs/';
    const outputDirectory = 'output/';
    const pdfViewDirectory = 'pdfs_view/';

    if (!config.apiKey) {
        return res.status(400).json({ error: 'API key not set' });
    }

    try {
        await emptyDirectory(pdfViewDirectory);
        csvData.length = 0;  // Reset csvData
        deleteCsvFile();
        await processAllPdfsInDirectory(pdfDirectory, outputDirectory);
        await analyzeAllImagesInDirectory(outputDirectory);
        await writeCsvData();
        moveFiles(pdfDirectory, pdfViewDirectory);
        await emptyDirectory(pdfDirectory);
        await emptyDirectory(outputDirectory);
        res.json(csvData);
    } catch (err) {
        console.error('Error processing files:', err);
        res.status(500).send('Error processing files');
    }
}

function setApiKey(req, res) {
    config.apiKey = req.body.apiKey; // Correct assignment
    res.status(200).send('API Key saved');
}

module.exports = {
    processFiles,
    setApiKey
};
