const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = express();

app.get('/api/search/:sort/:time/:limit/:term', async (req, res) => {
  try {
    const { term, sort, time, limit } = req.params;

    const response = await fetch(`https://www.reddit.com/search.json?q=${term}&sort=${sort}&t=${time}&limit=${limit}&raw_json=1`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json('Server Error');
  }
});

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(__dirname + '/public/'));

  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});