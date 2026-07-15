let allVideos = [];

// ভিডিও ডাটা লোড করা
document.addEventListener('DOMContentLoaded', () => {
    fetch('videos.json')
        .then(res => res.json())
        .then(data => {
            allVideos = data;
            renderVideos(allVideos);
        });
});

function renderVideos(videos) {
    const container = document.getElementById('videoContainer');
    container.innerHTML = '';
    videos.forEach(v => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.onclick = () => openVideo(v.youtubeId);
        card.innerHTML = `<img src="${v.thumbnail}" alt="${v.title}"><h3>${v.title}</h3>`;
        container.appendChild(card);
    });
}

// সার্চিং
function searchVideos() {
    const query = document.getElementById('videoSearch').value.toLowerCase();
    const filtered = allVideos.filter(v => v.title.toLowerCase().includes(query));
    renderVideos(filtered);
}

// ক্যাটাগরি ফিল্টার
function filterCategory(cat, e) {
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    if (cat === 'all') {
        renderVideos(allVideos);
    } else {
        const filtered = allVideos.filter(v => v.category === cat);
        renderVideos(filtered);
    }
}

// পপআপ কন্ট্রোল
function openPopup() { document.getElementById('gpPopup').style.display = 'flex'; }
function closePopup() { document.getElementById('gpPopup').style.display = 'none'; }

// ভিডিও ওপেন
function openVideo(id) {
    document.getElementById('videoPlayer').src = `https://www.youtube.com/embed/${id}?autoplay=1`;
    document.getElementById('videoModal').style.display = 'flex';
}
function closeVideo() { 
    document.getElementById('videoPlayer').src = ""; 
    document.getElementById('videoModal').style.display = 'none'; 
}
function closeVideoOutside(e) { if(e.target.id === 'videoModal') closeVideo(); }
function toggleMenu() { document.getElementById('navLinks').classList.toggle('active'); }
