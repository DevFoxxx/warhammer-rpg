async function loadPG() {
  const res = await fetch('/pg'); // endpoint che restituisce tutti i PG
  const pgList = await res.json();

  const container = document.getElementById('pg-list');
  container.innerHTML = '';

  pgList.forEach(pg => {
    const div = document.createElement('div');
    div.className = "col-12 col-md-6 col-lg-4"; // 1 colonna su mobile, 2 su tablet, 3 su desktop
    div.innerHTML = `
      <div class="card shadow-sm h-100">
        <div class="card-body">
          <h5 class="card-title">${pg.nome}</h5>
          <p class="card-text"><strong>Classe:</strong> ${pg.classe}</p>
          <p class="card-text"><strong>Razza:</strong> ${pg.razza}</p>
          <p class="card-text"><strong>Livello:</strong> ${pg.livello}</p>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

loadPG();
