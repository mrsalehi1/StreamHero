# Ingest options

Brain-dump on how to accept RTMP from OBS / ffmpeg.

## Option A: raw TCP, implement RTMP by hand
- Full control, but the handshake + chunking + AMF is a rabbit hole.
- Chunk-size negotiation and window acks are fiddly.
- Probably weeks of work for something solid.

## Option B: nginx-rtmp
- Battle tested, but needs a separate nginx build + config.
- Extra moving part for users; not "npm install and go".

## Option C: node-media-server
- Pure Node, wraps RTMP + HTTP-FLV nicely.
- Emits publish/play events — exactly what we need for a live registry.
- Leaning this way.

Decision: try node-media-server first, keep the surface area small.
