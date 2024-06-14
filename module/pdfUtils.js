const pdf = require('pdf-poppler');
const path = require('path');
const fs = require('fs');

async function convertPdfToImages(pdfPath, outputDir) {
    let opts = {
        format: 'png',
        out_dir: 'output/',
        out_prefix: path.basename(pdfPath, path.extname(pdfPath)) ,
        page: '1'
    };

    try {
        await pdf.convert(pdfPath, opts);
    } catch (err) {
        console.error(`Error during PDF conversion for ${pdfPath}:`, err);
    }
}

async function processAllPdfsInDirectory(pdfDirectory, outputDirectory) {
    const files = fs.readdirSync(pdfDirectory);
    for (const file of files) {
        const filePath = path.join(pdfDirectory, file);
        if (path.extname(file).toLowerCase() === '.pdf') {
            const outputDir = path.join(outputDirectory, path.basename(file, path.extname(file)));
            await convertPdfToImages(filePath, outputDir);
        }
    }
}

module.exports = {
    convertPdfToImages,
    processAllPdfsInDirectory
};
