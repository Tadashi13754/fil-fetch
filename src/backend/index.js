const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { execute } = require("./utils");
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors())
app.use(morgan('dev'));
const PORT = 8000;

const homeDir = require('os').homedir();
const folderPath = path.join(homeDir, 'Downloads');

app.get('/health', (req, res) => {
  res.send('Server is running');
});

app.get('/download_file', async(req, res) => {
  const filePath = path.join(folderPath, req.query.cid)
  const command = `lassie fetch -o ${filePath} ${req.query.cid}`
  const response = await execute(command)
  console.log(response)
  res.send(`Complete`)
});

// app.get('/download_file', async(req, res) => {
//   const filePath = path.join(folderPath, req.query.file_name);
//   // Check if file exists
//   fs.access(filePath, fs.constants.F_OK, (err) => {
//     if (err) {
//       return res.status(404).send('File not found');
//     }
//     // Set the filename in the download dialog (optional)
//     const filename = path.basename(filePath);
//     // Trigger the download
//     res.download(filePath, filename, (err) => {
//       if (err) {
//         // Handle error, but do not expose to the client
//         console.error(err);
//         res.status(500).send('Error downloading file');
//       }
//     });
//   });
// });

const testFun = async(cid) =>{
  
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
