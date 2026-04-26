// First pass: play one hardcoded stream to prove out flv.js playback.
const grid = document.getElementById('grid');
const emptyState = document.getElementById('empty');

const TEST_PATH = '/live/test';

function boot() {
  if (!flvjs.isSupported()) {
    emptyState.querySelector('.hint').textContent = 'flv.js is not supported in this browser.';
    return;
  }

  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<video muted autoplay></video>`;
  grid.appendChild(card);

  const video = card.querySelector('video');
  const player = flvjs.createPlayer(
    { type: 'flv', url: `http://${location.hostname}:8000${TEST_PATH}.flv`, isLive: true },
    { enableStashBuffer: false }
  );
  player.attachMediaElement(video);
  player.load();
  player.play().catch(() => {});

  emptyState.style.display = 'none';
}

boot();
