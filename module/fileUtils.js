const fs = require('fs');
const path = require('path');

function emptyDirectory(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const filePath = path.join(directory, file);
        fs.unlinkSync(filePath);
    }
}
function moveFiles(sourceDir, destDir) {
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir);
    }
    const files = fs.readdirSync(sourceDir);
    for (const file of files) {
        const sourceFile = path.join(sourceDir, file);
        const destFile = path.join(destDir, file);
        fs.renameSync(sourceFile, destFile);
    }
}

module.exports = {
    emptyDirectory,
    moveFiles
};
