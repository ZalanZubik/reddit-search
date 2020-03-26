const express = require('express');
const fetch = require('node-fetch');

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

app.listen(5000, () => {
  console.log('Server is running on port 5000!');
});