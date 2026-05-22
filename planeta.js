const API_BASE = 'https://dragonball-api.com/api';

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function getStatusBadge(isDestroyed) {
  if (isDestroyed === true) return `<span class="status-badge destroyed"> Planeta destruido</span>`;
  if (isDestroyed === false) return `<span class="status-badge alive"> Planeta activo</span>`;
  return `<span class="status-badge unknown">? Estado desconocido</span>`;
}

async function load() {
  const id = getParam('id');
  const charId = getParam('charId');

  if (charId) {
    document.getElementById('backBtn').href = `personaje.html?id=${charId}`;
    document.getElementById('backBtn').textContent = '← Volver al personaje';
  }

  if (!id) {
    document.getElementById('content').innerHTML = '<div class="error-msg">No se especificó un planeta.</div>';
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/planets/${id}`);
    if (!res.ok) throw new Error('No encontrado');
    const p = await res.json();
    render(p);
  } catch (e) {
    document.getElementById('content').innerHTML = `<div class="error-msg">Error al cargar el planeta.</div>`;
  }
}

function render(p) {
  document.title = `${p.name} - Dragon Ball Z`;

  const chars = p.characters || [];

  const charsHTML = chars.length
    ? `
      <div class="section-title">Personajes del planeta</div>
      <div class="chars-grid">
        ${chars.map(c => `
          <div class="char-card">
            <div class="char-img">
              <img src="${c.image}" alt="${c.name}" onerror="this.src='https://placehold.co/180x180/0d1525/f5c518?text=?'" />
            </div>
            <div class="char-body">
              <div class="char-name">${c.name}</div>
              <div class="char-info"><strong>Raza:</strong> ${c.race || '-'}</div>
              <div class="char-info"><strong>Ki:</strong> ${c.ki || '-'}</div>
              <a href="personaje.html?id=${c.id}" class="btn-detail">Ver detalle</a>
            </div>
          </div>
        `).join('')}
      </div>`
    : `<div class="section-title">Personajes del planeta</div><p class="no-chars">No hay personajes registrados para este planeta.</p>`;

  document.getElementById('content').innerHTML = `
    <div class="planet-card">
      <div class="planet-img-wrap">
        <img src="${p.image}" alt="${p.name}" onerror="this.src='https://placehold.co/260x260/0d1525/22c55e?text=🌍'" />
      </div>
      <div class="planet-info">
        <div class="planet-name">${p.name}</div>
        ${getStatusBadge(p.isDestroyed)}
        <p class="planet-description">${p.description || 'Sin descripción disponible.'}</p>
      </div>
    </div>
    ${charsHTML}
  `;
}

load();