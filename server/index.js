const path = require('path');
const express = require('express');
const NodeMediaServer = require('node-media-server');
const config = require('./config');
const StreamRegistry = require('./registry');

const registry = new StreamRegistry();

// RTMP ingest. Publishers connect to rtmp://host:1935/live/<stream-key>
// HTTP-FLV playback for the browser at http://host:8000/live/<stream-key>.flv
const nms = new NodeMediaServer({
  rtmp: {
    port: config.rtmpPort,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: config.flvPort,
    mediaroot: config.mediaRoot,
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
app.use(express.static(path.join(__dirname, '..', 'public')));

// Currently-live publishers, consumed by the dashboard.
app.get('/api/streams', (req, res) => {
  res.json({ streams: registry.list() });
});

// Ports/app info so the UI can build ingest + playback URLs.
app.get('/api/config', (req, res) => {
  res.json({
    rtmpPort: config.rtmpPort,
    flvPort: config.flvPort,
    app: config.app,
  });
});

const server = app.listen(config.httpPort, () => {
  console.log(`StreamHero dashboard: http://localhost:${config.httpPort}`);
  console.log(`RTMP ingest:          rtmp://localhost:${config.rtmpPort}/${config.app}/<stream-key>`);
});

function shutdown() {
  console.log('\nShutting down...');
  server.close();
  nms.stop();
  process.exit(0);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
