module.exports = {
  // Dashboard + JSON API
  httpPort: 3000,
  // RTMP ingest — this is where OBS / ffmpeg publish to
  rtmpPort: 1935,
  // HTTP-FLV playback — the dashboard pulls video from here
  flvPort: 8000,
  // RTMP application name, so URLs look like rtmp://host:1935/live/<key>
  app: 'live',
  mediaRoot: './media',
};
