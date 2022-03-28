const path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');
const XLSX = require('xlsx');
const dotenv = require('dotenv');
const envConfig = dotenv.parse(
  fs.readFileSync(`.env.${process.env.NODE_ENV ? process.env.NODE_ENV : 'production'}`)
);
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}
const PORT = process.env.PORT || 1001;

app.use(process.env.BASE_URL, express.static(path.resolve(__dirname, './dist'), {
  setHeaders: (res, path, stat) => {
    res.set('Cache-Control', 'no-cache');
  },
}));

app.post('/download-excel', async (req, res) => {
  // simulate file download
  let buffer = fs.readFileSync(path.resolve(__dirname, './static/example.txt'), {});
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Expose-Headers', '*');
  res.send(buffer);
  return;
});

app.use('*', (req, res) => {
  return res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Ajaib Test is running at port: ${PORT}`);
});
