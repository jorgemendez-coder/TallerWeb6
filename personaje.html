const API_BASE = 'https://dragonball-api.com/api';

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

async function load() {
  const id = getParam('id');
  if (!id) {
    document.getElementById('content').innerHTML = '<div class="error-msg">No se especificó un personaje.</div>';
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/characters/${id}`);
    if (!res.ok) throw new Error('No encontrado');
    const c = await res.json();
    render(c);
  } catch (e) {
    document.getElementById('content').innerHTML = `<div class="error-msg">Error al cargar el personaje (ID: ${id}).</div>`;
  }
}

function render(c) {
  const transformsHTML = (c.transformations && c.transformations.length)
    ? `
      <div class="section-title">Transformaciones</div>
      <div class="transformations-grid">
        ${c.transformations.map(t => `
          <div class="transform-card">
            <div class="transform-img">
              <img src="${t.image}" alt="${t.name}" onerror="this.src='https://placehold.co/150x150/0d1525/f5c518?text=?'" />
            </div>
            <div class="transform-body">
              <div class="transform-name">${t.name}</div>
              <div class="transform-ki">Ki: <span>${t.ki || '-'}</span></div>
            </div>
          </div>
        `).join('')}
      </div>`
    : '';

  const planetBtn = (c.originPlanet)
    ? `<a href="planeta.html?id=${c.originPlanet.id}" class="btn-planet"> Ver planeta: ${c.originPlanet.name}</a>`
    : '';

  document.getElementById('content').innerHTML = `
    <div class="hero-card">
      <div class="hero-img-wrap">
        <img src="${c.image}" alt="${c.name}" onerror="this.src='https://placehold.co/300x300/0d1525/f5c518?text=?'" />
      </div>
      <div class="hero-info">
        <div class="hero-name">${c.name}</div>
        <div class="hero-tags">
          ${c.race ? `<span class="tag">${c.race}</span>` : ''}
          ${c.gender ? `<span class="tag">${c.gender}</span>` : ''}
          ${c.affiliation ? `<span class="tag affiliation">${c.affiliation}</span>` : ''}
        </div>
        <div class="stats-row">
          <div class="stat-box">
            <div class="stat-label">Base Ki</div>
            <div class="stat-value gold">${c.ki || '-'}</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Max Ki</div>
            <div class="stat-value blue">${c.maxKi || '-'}</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">ID</div>
            <div class="stat-value white">${c.id}</div>
          </div>
        </div>
        <p class="description">${c.description || 'Sin descripción disponible.'}</p>
        ${planetBtn}
      </div>
    </div>
    ${transformsHTML}
  `;

  document.title = `${c.name} - Dragon Ball Z`;
}

load();