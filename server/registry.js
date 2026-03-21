// Keeps track of which publishers are currently live.
class StreamRegistry {
  constructor() {
    this.streams = new Map(); // streamPath -> { name, path, sessionId, startedAt }
  }

  add(streamPath, sessionId) {
    const name = streamPath.split('/').pop();
    this.streams.set(streamPath, {
      name,
      path: streamPath,
      sessionId,
      startedAt: Date.now(),
    });
  }

  remove(streamPath, sessionId) {
    const existing = this.streams.get(streamPath);
    // Ignore a stale donePublish if a newer session already took over the key.
    if (existing && existing.sessionId !== sessionId) return;
    this.streams.delete(streamPath);
  }

  list() {
    return [...this.streams.values()];
  }
}

module.exports = StreamRegistry;
