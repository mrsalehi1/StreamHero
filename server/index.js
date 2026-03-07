const path = require('path');
const express = require('express');
const NodeMediaServer = require('node-media-server');

// RTMP ingest. Publishers connect to rtmp://localhost:1935/live/<stream-key>
const nms = new NodeMediaServer({
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
});

nms.on('postPublish', (id, streamPath) => {
  console.log(`[rtmp] publish started: ${streamPath}`);
});
nms.on('donePublish', (id, streamPath) => {
  console.log(`[rtmp] publish ended: ${streamPath}`);
});

nms.run();

const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname, '..', 'public')));
app.listen(PORT, () => {
  console.log(`StreamHero dashboard on http://localhost:${PORT}`);
  console.log(`RTMP ingest on rtmp://localhost:1935/live/<stream-key>`);
});
