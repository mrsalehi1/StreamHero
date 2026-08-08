# StreamHero

Self-hosted RTMP ingest hub with a live monitoring dashboard.

Run it, point OBS or ffmpeg at your personal RTMP endpoint, and watch every
input show up in the web dashboard in real time.

## Quickstart

```bash
npm install
npm start
```

Then:

| What              | Where                                          |
| ----------------- | ---------------------------------------------- |
| Dashboard         | http://localhost:3000                          |
| RTMP ingest       | rtmp://localhost:1935/live/`<your-stream-key>` |
| HTTP-FLV playback | http://localhost:8000/live/`<your-stream-key>`.flv |

## Publish a stream

**OBS:** Settings → Stream → Service: `Custom` → Server: `rtmp://localhost:1935/live`
→ Stream key: anything you like, e.g. `cam1`.

**ffmpeg:**

```bash
ffmpeg -re -i input.mp4 -c copy -f flv rtmp://localhost:1935/live/cam1
```

Every publisher shows up as a card in the dashboard, live, within a couple of
seconds. Multiple publishers can share the server by using different stream keys.

## API

- `GET /api/streams` — currently live publishers (name, path, startedAt)
- `GET /api/config` — ports/app info used by the dashboard to build URLs

## How it works

- [node-media-server](https://github.com/illuspas/Node-Media-Server) accepts RTMP
  on `:1935` and remuxes each stream to HTTP-FLV on `:8000`.
- An express server serves the dashboard on `:3000` and exposes a small JSON API.
- The dashboard polls `/api/streams` and plays each live input with flv.js.
