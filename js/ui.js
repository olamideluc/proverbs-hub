import { fetchProverbs, translateProverb, fetchCulturalVideo } from './api.js';

let showFavoritesOnly = false;

function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

export async function loadProverbs() {
  const container = document.getElementById('proverb-list');
  try {
    const proverbs = await fetchProverbs();

    renderProverbs(proverbs);
    renderFavorites();

    // Toggle favorites view
    document.getElementById('toggle-favorites').addEventListener('click', () => {
      showFavoritesOnly = !showFavoritesOnly;
      if (showFavoritesOnly) {
        const favorites = getFavorites();
        renderProverbs(favorites);
        document.getElementById('toggle-favorites').textContent = "View All Proverbs";
      } else {
        renderProverbs(proverbs);
        document.getElementById('toggle-favorites').textContent = "View Favorites Only";
      }
    });

    // Search & filter listeners
    document.getElementById('search').addEventListener('input', e => {
      if (showFavoritesOnly) return;
      const query = e.target.value.toLowerCase();
      const filtered = proverbs.filter(p =>
        p.text.toLowerCase().includes(query) ||
        p.explanation.toLowerCase().includes(query)
      );
      renderProverbs(filtered);
    });

    document.getElementById('region').addEventListener('change', e => {
      if (showFavoritesOnly) return;
      const region = e.target.value;
      const filtered = region
        ? proverbs.filter(p => p.region === region)
        : proverbs;
      renderProverbs(filtered);
    });

    document.getElementById('category').addEventListener('change', e => {
      if (showFavoritesOnly) return;
      const category = e.target.value;
      const filtered = category
        ? proverbs.filter(p => p.category === category)
        : proverbs;
      renderProverbs(filtered);
    });

    // Fetch and embed a cultural video
    const video = await fetchCulturalVideo("Yoruba proverbs");
    if (video) {
      const videoContainer = document.getElementById('video-section');
      videoContainer.innerHTML = `
        <iframe width="560" height="315"
          src="https://www.youtube.com/embed/${video.id.videoId}"
          frameborder="0" allowfullscreen>
        </iframe>
      `;
    }

  } catch (error) {
    container.innerHTML = '<p>Error loading proverbs.</p>';
  }
}

async function renderProverbs(list) {
  const container = document.getElementById('proverb-list');
  container.innerHTML = '';

  const favorites = getFavorites();

  if (list.length === 0) {
    container.innerHTML = '<p>No proverbs found.</p>';
    return;
  }

  for (const item of list) {
    const card = document.createElement('div');
    card.className = 'proverb-card';

    const isFavorite = favorites.some(fav => fav.text === item.text);

    // Translate proverb text (optional)
    let translation = "";
    try {
      translation = await translateProverb(item.text, 'en');
    } catch {
      translation = "";
    }

    card.innerHTML = `
      <div>
        <h3>${item.text}</h3>
        <p>${item.explanation}</p>
        ${translation ? `<p><em>Translation: ${translation}</em></p>` : ""}
      </div>
      <button class="favorite">${isFavorite ? '❤️' : '♡'}</button>
    `;

    const favBtn = card.querySelector('.favorite');
    favBtn.addEventListener('click', () => {
      let updatedFavorites = getFavorites();

      if (isFavorite) {
        updatedFavorites = updatedFavorites.filter(fav => fav.text !== item.text);
      } else {
        updatedFavorites.push(item);
      }

      saveFavorites(updatedFavorites);
      renderProverbs(list); // refresh main list
      renderFavorites();    // refresh favorites section
    });

    container.appendChild(card);
  }
}

function renderFavorites() {
  const favoritesContainer = document.getElementById('favorites-list');
  const favorites = getFavorites();
  favoritesContainer.innerHTML = '';

  if (favorites.length === 0) {
    favoritesContainer.innerHTML = '<p>No favorites yet.</p>';
    return;
  }

  favorites.forEach(item => {
    const card = document.createElement('div');
    card.className = 'proverb-card';
    card.innerHTML = `
      <div>
        <h3>${item.text}</h3>
        <p>${item.explanation}</p>
      </div>
      <button class="remove-fav">✖</button>
    `;

    const removeBtn = card.querySelector('.remove-fav');
    removeBtn.addEventListener('click', () => {
      const updatedFavorites = getFavorites().filter(fav => fav.text !== item.text);
      saveFavorites(updatedFavorites);
      renderFavorites();
      if (showFavoritesOnly) {
        renderProverbs(updatedFavorites); // keep main list synced when in favorites-only mode
      }
    });

    favoritesContainer.appendChild(card);
  });
}
/*done*/