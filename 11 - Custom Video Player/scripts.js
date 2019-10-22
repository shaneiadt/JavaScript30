const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.player__button.fullscreen');

function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    const { skip } = this.dataset;
    const { currentTime } = video;
    video.currentTime = currentTime + parseInt(skip);
}

function handleRangeUpdate() {
    const { name, value } = this;

    if (name === 'volume') {
        video.volume = value;
    } else if (name === 'playbackRate') {
        video.playbackRate = value;
    }
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function toggleFullscreen() {
    if (player.style.height === '100%') {
        player.style.height = '';
        player.style.width = '';
        player.style.border = '5px solid rgba(0,0,0,0.2)';
        player.style.boxShadow = '0 0 20px rgba(0,0,0,0.2)';
    } else {
        player.style.height = '100%';
        player.style.width = '100%';
        player.style.border = 'none';
        player.style.boxShadow = 'none';
    }
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousedown', () => mousedown = true);

toggle.addEventListener('click', togglePlay);

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

skipButtons.forEach(btn => btn.addEventListener('click', skip));

fullscreen.addEventListener('click', toggleFullscreen);

