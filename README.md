# StreamHero

Self-hosted live production hub. You publish one or more cameras over RTMP,
watch every input live in the browser, and (on the roadmap) direct a single
program out to YouTube, Instagram, and other platforms.

It is for solo streamers and small crews who want their own ingest and
switcher instead of renting a cloud studio. One person can run it on a
machine they control.

Built with Node.js, Express, and
[node-media-server](https://github.com/illuspas/Node-Media-Server) for RTMP
ingest and HTTP-FLV playback. The dashboard is plain HTML, CSS, and JavaScript
and plays each input with [flv.js](https://github.com/bilibili/flv.js).
Publishers use OBS or ffmpeg.

What works today is ingest and monitoring. Switching, transitions, graphics,
recording, restream, director roles, and multi-tenant admin are planned in
[ROADMAP.md](ROADMAP.md).

Licensed under the [MIT License](LICENSE).

## Quickstart

Requires Node.js 18 or newer.

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
- `GET /api/config` — ports and app name the dashboard uses to build URLs

## How it works

- node-media-server accepts RTMP on `:1935` and remuxes each stream to HTTP-FLV on `:8000`.
- Express serves the dashboard on `:3000` and a small JSON API.
- The dashboard polls `/api/streams` and plays each live input with flv.js.
