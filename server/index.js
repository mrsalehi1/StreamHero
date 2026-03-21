const path = require('path');
const express = require('express');
const NodeMediaServer = require('node-media-server');
const StreamRegistry = require('./registry');

const registry = new StreamRegistry();

// RTMP ingest. Publishers connect to rtmp://localhost:1935/live/<stream-key>
// HTTP-FLV playback for the browser at http://localhost:8000/live/<stream-key>.flv
const nms = new NodeMediaServer({
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    mediaroot: './media',
    allow_origin: '*',
  },
});

nms.on('postPublish', (id, streamPath) => {
  console.log(`[rtmp] publish started: ${streamPath}`);
  registry.add(streamPath, id);
});
nms.on('donePublish', (id, streamPath) => {
  console.log(`[rtmp] publish ended: ${streamPath}`);
  registry.remove(streamPath, id);
});

nms.run();

const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname, '..', 'public')));
app.listen(PORT, () => {
  console.log(`StreamHero dashboard on http://localhost:${PORT}`);
  console.log(`RTMP ingest on rtmp://localhost:1935/live/<stream-key>`);
});
