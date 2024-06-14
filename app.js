const express = require('express');
const { upload } = require('./module/config');
const { processFiles, setApiKey } = require('./module/routes');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use('/pdfs_view', express.static('pdfs_view'));
app.post('/upload', upload.array('pdfs'), processFiles);
app.post('/set-api-key', setApiKey);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
