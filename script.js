// Daftar lagu Rex Orange County
const tracks = [
  { title: "Television / So Far So Good", artist: "Rex Orange County", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Loving Is Easy", artist: "Rex Orange County", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "Asking", artist: "Rex Orange County", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { title: "Pre", artist: "Rex Orange County", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { title: "It's Not the Same Anymore", artist: "Rex Orange County", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
];

let currentTrackIndex = 0;
const audio = new Audio();
const playBtn = document.querySelector('.btn.play');
const prevBtn = document.querySelector('.btn.prev');
const nextBtn = document.querySelector('.btn.next');
const progressBar = document.querySelector('.progress-bar');
const timeDisplay = document.querySelectorAll('.time');

// Fungsi untuk memuat lagu
function loadTrack(index) {
  const track = tracks[index];
  document.querySelector('.track-title').textContent = track.title;
  document.querySelector('.track-artist').textContent = track.artist;
  audio.src = track.src;
  audio.load();
}

// Fungsi putar/jeda
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
}

// Fungsi next
function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  audio.play();
  playBtn.textContent = "⏸";
}

// Fungsi prev
function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  audio.play();
  playBtn.textContent = "⏸";
}

// Update progress bar
audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.value = percent;
  timeDisplay[0].textContent = formatTime(audio.currentTime);
  timeDisplay[1].textContent = formatTime(audio.duration || 0);
});

// Format waktu
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Atur waktu saat diubah
progressBar.addEventListener('input', () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Event listeners
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

// Load first track
loadTrack(currentTrackIndex);

// Render daftar lagu
const container = document.querySelector('.tracks-container');
tracks.forEach((track, index) => {
  const trackEl = document.createElement('div');
  trackEl.classList.add('track-item');
  trackEl.innerHTML = `
    <img src="https://i.scdn.co/image/ab67616d0000b2734e42c6b7c1f0b4e7a0b5f0b5" alt="Album">
    <div class="track-details">
      <div class="track-title">${track.title}</div>
      <div class="track-artist">${track.artist}</div>
    </div>
  `;
  trackEl.addEventListener('click', () => {
    currentTrackIndex = index;
    loadTrack(currentTrackIndex);
    audio.play();
    playBtn.textContent = "⏸";
  });
  container.appendChild(trackEl);
});
