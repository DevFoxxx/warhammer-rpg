async function loadPG() {
  const res = await fetch('/pg');
  const pgList = await res.json();

  const container = document.getElementById('pg-cards');
  container.innerHTML = '';

  pgList.forEach(pg => {
    const div = document.createElement('div');
    div.className = "pg-card"; // usa la classe CSS
    div.innerHTML = `
      <h3>${pg.nome}</h3>
      <p><strong>Archetipo:</strong> ${pg.archetype || '-'}</p>
      <p><strong>Specie:</strong> ${pg.career || '-'}</p>
      <div class="pg-backstory">${pg.background || ''}</div>
    `;
    container.appendChild(div);
  });
}

// Carica i PG al caricamento della pagina
loadPG();

window.addEventListener('storage', (e) => {
    if (e.key === 'refreshPG') {
        loadPG(); // ricarica i PG automaticamente
    }
});

