# StreamHero Roadmap

Where StreamHero is today, and where it's headed.

## Phase 1 — Ingest & Monitor (current, done)

- [x] RTMP ingest endpoint (`rtmp://<host>:1935/live/<stream-key>`)
- [x] Multiple simultaneous publishers, isolated by stream key
- [x] Live dashboard showing every input in real time (HTTP-FLV + flv.js)
- [x] Stream registry JSON API (`/api/streams`, `/api/config`)

## Phase 2 — Restream to YouTube (next up)

- [ ] ffmpeg relay pipeline: pull an RTMP input → transcode → push to
      YouTube Live (`rtmp://a.rtmp.youtube.com/live2/<key>`)
- [ ] Per-stream "Go live" button in the dashboard
- [ ] **Camera switching**: pick which connected input is the one being
      restreamed to YouTube, and switch live without dropping the broadcast
- [ ] YouTube stream-key management (stored locally, never committed)
- [ ] Relay health surfaced in the UI: bitrate, uptime, dropped frames,
      ffmpeg restart on failure

## Phase 3 — Production hardening

- [ ] Auth: dashboard login + per-user stream keys
- [ ] Record inputs to disk while live
- [ ] HLS output alongside FLV (Safari/iOS playback)
- [ ] WebRTC preview for sub-second latency
- [ ] Per-stream analytics: viewers, bitrate history
- [ ] Docker image + docker-compose for one-command deploy

## Ideas / maybe later

- [ ] Multi-destination restream (Twitch, Facebook, custom RTMP targets)
- [ ] Server-side scene layouts / overlays (picture-in-picture, lower thirds)
- [ ] SRT ingest support
- [ ] Mobile-friendly dashboard
