const API_BASE = 'https://dragonball-api.com/api';
let allCharacters = [];
let filtered = [];
let currentPage = 1;
const PER_PAGE = 12;


document.getElementById('btnExplorer').addEventListener('click', () => enterApp());
document.getElementById('btnPlanets').addEventListener('click', () => {
  enterApp();
  setTimeout(() => window.scrollTo({ top: 400, behavior: 'smooth' }), 700);
});

function enterApp() {
  const splash = document.getElementById('splashScreen');
  splash.style.opacity = '0';
  splash.style.transition = 'opacity 0.6s ease';
  setTimeout(() => {
    splash.style.display = 'none';
    document.getElementById('appScreen').style.display = 'block';
    setTimeout(() => {
      document.getElementById('appScreen').style.opacity = '1';
    }, 50);
  }, 600);
  if (allCharacters.length === 0) initApp();
}


async function fetchAllCharacters() {
  let page = 1;
  let results = [];
  while (true) {
    const res = await fetch(`${API_BASE}/characters?limit=58&page=${page}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const items = Array.isArray(data.items) ? data.items : (Array.isArray(data) ? data : []);
    results = results.concat(items);
    if (!data.links?.next) break;
    page++;
    if (page > 10) break;
  }
  return results;
}


function buildRaceFilter(chars) {
  const races = [...new Set(chars.map(c => c.race).filter(Boolean))].sort();
  const sel = document.getElementById('raceFilter');
  while (sel.options.length > 1) sel.remove(1);
  races.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r;
    opt.textContent = r;
    sel.appendChild(opt);
  });
}

function applyFilters() {
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  const race = document.getElementById('raceFilter').value;
  filtered = allCharacters.filter(c => {
    const nameMatch = !q || c.name.toLowerCase().includes(q);
    const raceMatch = !race || c.race === race;
    return nameMatch && raceMatch;
  });
  currentPage = 1;
  renderGrid();
}

function renderGrid() {
  const start = (currentPage - 1) * PER_PAGE;
  const page = filtered.slice(start, start + PER_PAGE);
  const content = document.getElementById('content');
  const countEl = document.getElementById('resultsCount');

  countEl.textContent = `${filtered.length} personaje${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`;

  if (page.length === 0) {
    content.innerHTML = '<div class="empty">No se encontraron personajes.</div>';
    document.getElementById('pagination').innerHTML = '';
    return;
  }

  content.innerHTML = `<div class="characters-grid">${page.map(cardHTML).join('')}</div>`;

  const total = Math.ceil(filtered.length / PER_PAGE);
  const pag = document.getElementById('pagination');
  if (total <= 1) { pag.innerHTML = ''; return; }
  pag.innerHTML = `
    <button class="page-btn" onclick="goPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>‹ Anterior</button>
    <span class="page-info">Página ${currentPage} de ${total}</span>
    <button class="page-btn" onclick="goPage(${currentPage + 1})" ${currentPage === total ? 'disabled' : ''}>Siguiente ›</button>
  `;
}

function goPage(p) {
  currentPage = p;
  renderGrid();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cardHTML(c) {
  return `
    <div class="char-card" onclick="goToDetail(${c.id})">
      <div class="card-img">
        <img src="${c.image}" alt="${c.name}" onerror="this.src='https://placehold.co/200x200/0d1525/f5c518?text=?'" loading="lazy"/>
      </div>
      <div class="card-body">
        <div class="card-name">${c.name}</div>
        <div class="card-info"><strong>Raza:</strong> ${c.race || 'Desconocida'}</div>
        <div class="card-info"><strong>Género:</strong> ${c.gender || '-'}</div>
        <div class="card-info"><strong>Base Ki:</strong> ${c.ki || '-'}</div>
        <div class="card-info"><strong>Total Ki:</strong> ${c.maxKi || '-'}</div>
        <button class="btn-detail">Ver detalle</button>
      </div>
    </div>`;
}

function goToDetail(id) {
  window.location.href = `personaje.html?id=${id}`;
}

async function initApp() {
  document.getElementById('content').innerHTML = '<div class="loader"><div class="spinner"></div>Cargando personajes...</div>';
  try {
    allCharacters = await fetchAllCharacters();
    filtered = [...allCharacters];
    buildRaceFilter(allCharacters);
    renderGrid();
  } catch (e) {
    document.getElementById('content').innerHTML = '<div class="empty"> Error al cargar la API. Asegurate de estar en un servidor web.</div>';
  }
}

document.getElementById('searchInput').addEventListener('input', applyFilters);
document.getElementById('raceFilter').addEventListener('change', applyFilters);