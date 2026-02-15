const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(PORT, () => {
  console.log(`StreamHero dashboard on http://localhost:${PORT}`);
});
