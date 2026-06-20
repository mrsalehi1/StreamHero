const grid = document.getElementById('grid');
const emptyState = document.getElementById('empty');
const countEl = document.getElementById('stream-count');
const ingestEl = document.getElementById('ingest-url');
const copyBtn = document.getElementById('copy-btn');

let flvPort = 8000;
const players = new Map(); // streamPath -> { card, player }

async function loadConfig() {
  const res = await fetch('/api/config');
  const cfg = await res.json();
  flvPort = cfg.flvPort;
  ingestEl.textContent = `rtmp://${location.hostname}:${cfg.rtmpPort}/${cfg.app}/<stream-key>`;
}

copyBtn.addEventListener('click', async () => {
  await navigator.clipboard.writeText(ingestEl.textContent);
  copyBtn.textContent = 'Copied!';
  setTimeout(() => (copyBtn.textContent = 'Copy'), 1500);
});

function flvUrlFor(streamPath) {
  return `http://${location.hostname}:${flvPort}${streamPath}.flv`;
}

function addStream(stream) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <video muted autoplay></video>
    <div class="card-meta">
      <span class="live-badge">LIVE</span>
      <span class="stream-key">${stream.name}</span>
      <span class="uptime" data-started="${stream.startedAt}"></span>
    </div>`;
  grid.appendChild(card);

  const video = card.querySelector('video');
  const player = flvjs.createPlayer(
    { type: 'flv', url: flvUrlFor(stream.path), isLive: true },
    { enableStashBuffer: false }
  );
  player.attachMediaElement(video);
  player.load();
  player.play().catch(() => {});

  players.set(stream.path, { card, player });
}

function removeStream(path) {
  const entry = players.get(path);
  if (!entry) return;
  entry.player.pause();
  entry.player.unload();
  entry.player.detachMediaElement();
  entry.player.destroy();
  entry.card.remove();
  players.delete(path);
}

async function refresh() {
  try {
    const res = await fetch('/api/streams');
    const { streams } = await res.json();
    const active = new Set(streams.map((s) => s.path));

    for (const stream of streams) {
      if (!players.has(stream.path)) addStream(stream);
    }
    for (const path of [...players.keys()]) {
      if (!active.has(path)) removeStream(path);
    }

    countEl.textContent = `${streams.length} stream${streams.length === 1 ? '' : 's'}`;
    emptyState.style.display = streams.length ? 'none' : 'block';
  } catch (err) {
    console.error('Failed to refresh streams', err);
  }
}

function tickUptimes() {
  document.querySelectorAll('.uptime').forEach((el) => {
    const started = Number(el.dataset.started);
    const secs = Math.max(0, Math.floor((Date.now() - started) / 1000));
    const h = String(Math.floor(secs / 3600)).padStart(2, '0');
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    el.textContent = `${h}:${m}:${s}`;
  });
}

loadConfig().then(refresh);
setInterval(refresh, 3000);
setInterval(tickUptimes, 1000);
