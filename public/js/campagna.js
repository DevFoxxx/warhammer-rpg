async function fetchCampagna() {
  try {
    const res = await fetch('/campagna');
    const campagne = await res.json();
    console.log('Campagne:', campagne);

    if (!campagne.length) {
      document.getElementById('campagna-titolo').textContent = 'Nessuna campagna trovata';
      return;
    }

    const campagna = campagne[0];
    document.getElementById('campagna-titolo').textContent = campagna.titolo;

    const list = document.getElementById('sessioni-list');
    list.innerHTML = '';

    if (!campagna.sessioni) campagna.sessioni = [];

    campagna.sessioni.forEach(s => {
      const div = document.createElement('div');
      // Colonna responsive: tutta larghezza su mobile, 8/12 centrata su tablet/desktop
      div.className = "col-12 col-md-8 offset-md-2";
      div.innerHTML = `
        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <h5 class="card-title">Sessione ${s.numero} - ${new Date(s.data).toLocaleDateString()}</h5>
            <p class="card-text">${s.descrizione}</p>
          </div>
        </div>
      `;
      list.appendChild(div);
    });

  } catch (err) {
    console.error('Errore fetch campagna:', err);
    document.getElementById('campagna-titolo').textContent = 'Errore nel caricamento della campagna';
  }
}

fetchCampagna();
