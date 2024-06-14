# PDF IntelliExtract

PDF IntelliExtract is a web application designed to extract the author, title, and description from PDF files using AI technology. This project leverages various Node.js modules to process PDF files, convert them into images, and analyze the content to produce structured data in CSV format.

## Features

- Upload multiple PDF files.
- Convert PDF files to images.
- Extract author, title, and description from PDF images using AI.
- Export extracted data to CSV.
- Simple and intuitive UI.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ahmedhaddan/pdf-intelliextract.git
    ```

2. Navigate to the project directory: 

    ```bash
    cd pdf-intelliextract
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Create the necessary directories: (if you haven't already)

    ```bash
    mkdir pdfs pdfs_view output 
    ```

## Usage

1. Start the server:

    ```bash
    node app.js
    ```

2. Open your web browser and navigate to:

    ```
    http://localhost:3000
    ```

3. Use the UI to upload PDF files and process them.

## API Endpoints

- `POST /upload` - Upload and process PDF files.
- `POST /set-api-key` - Set the API key for AI analysis.

## Configuration

Edit the `config.js` file to set up your storage configurations.

## Project Structure
```bash
.
├── app.js                # Main application file
├── config.js             # Configuration file for multer and API key
├── csv.js                # CSV writing utilities
├── fileUtils.js          # File handling utilities
├── imageUtils.js         # Image processing utilities
├── pdfUtils.js           # PDF processing utilities
├── routes.js             # Route handlers
├── script.js             # Client-side script
├── index.html            # Main HTML file
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
```


## Dependencies

- [Express](https://expressjs.com/)
- [Multer](https://github.com/expressjs/multer)
- [CSV Writer](https://www.npmjs.com/package/csv-writer)
- [PDF-Poppler](https://github.com/rotaready/pdf-poppler)
- [Axios](https://axios-http.com/)
- [Base64-img](https://www.npmjs.com/package/base64-img)
- [Sharp](https://sharp.pixelplumbing.com/)
- [PDF-Parse](https://github.com/modesty/pdf-parse)
- [Chart.js](https://www.chartjs.org/)

## Contributing

Contributions are welcome! Please create an issue or submit a pull request.

## Contact

For support, please contact [ahmed.haddan.info@gmail.com](mailto:ahmed.haddan.info@gmail.com).

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
