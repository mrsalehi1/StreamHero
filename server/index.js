const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('<h1>StreamHero</h1><p>Ingest server coming soon.</p>');
});

app.listen(PORT, () => {
  console.log(`StreamHero listening on http://localhost:${PORT}`);
});
