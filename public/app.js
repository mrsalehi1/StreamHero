const grid = document.getElementById('grid');
const emptyState = document.getElementById('empty');
const countEl = document.getElementById('stream-count');

const players = new Map(); // streamPath -> { card, player }

function flvUrlFor(streamPath) {
  return `http://${location.hostname}:8000${streamPath}.flv`;
}

function addStream(stream) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<video muted autoplay></video>`;
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

async function refresh() {
  const res = await fetch('/api/streams');
  const { streams } = await res.json();

  for (const stream of streams) {
    if (!players.has(stream.path)) addStream(stream);
  }

  countEl.textContent = `${streams.length} stream${streams.length === 1 ? '' : 's'}`;
  emptyState.style.display = streams.length ? 'none' : 'block';
}

refresh();
setInterval(refresh, 3000);
