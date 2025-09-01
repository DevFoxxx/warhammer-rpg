let masterToken = null;

// LOGIN
document.getElementById('login-form').addEventListener('submit', async e => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password})
    });
    const data = await res.json();
    if (res.ok) {
      masterToken = data.token;
      document.getElementById('login-container').classList.add('d-none');
      document.getElementById('master-panel').classList.remove('d-none');
      document.getElementById('master-name').textContent = `Master: ${username}`;
      loadCampagne();
    } else {
      alert(data.error || 'Errore login');
    }
  } catch (err) {
    console.error(err);
    alert('Errore login');
  }
});

// CARICA CAMPAGNE
async function loadCampagne() {
  const select = document.getElementById('campagnaId');
  select.innerHTML = '';
  try {
    const res = await fetch('/campagna');
    const campagne = await res.json();
    campagne.forEach(c => {
      const option = document.createElement('option');
      option.value = c._id;
      option.textContent = c.titolo;
      select.appendChild(option);
    });
    if (campagne.length > 0) {
      select.value = campagne[0]._id;
      loadSessioni(campagne[0]._id);
    }
  } catch (err) { console.error(err); }
}

// CARICA SESSIONI
async function loadSessioni(campagnaId) {
  const list = document.getElementById('master-sessioni-list');
  list.innerHTML = '';
  if (!campagnaId) return;
  try {
    const res = await fetch('/campagna');
    const campagne = await res.json();
    const campagna = campagne.find(c => c._id === campagnaId);
    if (!campagna || !campagna.sessioni) return;

    campagna.sessioni.forEach(s => {
      const div = document.createElement('div');
      div.className = "card mb-2 p-2 d-flex flex-row justify-content-between align-items-center";
      div.innerHTML = `
        <span>Sessione ${s.numero} - ${new Date(s.data).toLocaleDateString()}: ${s.descrizione}</span>
        <div>
          <button class="btn btn-warning btn-sm me-1" onclick="startModifica('${campagna._id}','${s._id}','${s.numero}','${s.data.split('T')[0]}','${s.descrizione}')">Modifica</button>
          <button class="btn btn-danger btn-sm" onclick="eliminaSessione('${campagna._id}','${s._id}')">Elimina</button>
        </div>
      `;
      list.appendChild(div);
    });
  } catch (err) { console.error(err); }
}

// AGGIUNGI SESSIONE
document.getElementById('sessione-form').addEventListener('submit', async e => {
  e.preventDefault();
  const campagnaId = document.getElementById('campagnaId').value;
  const numero = document.getElementById('numero').value;
  const data = document.getElementById('data').value;
  const descrizione = document.getElementById('descrizione').value;

  try {
    const res = await fetch(`/campagna/${campagnaId}/sessione`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${masterToken}` },
      body: JSON.stringify({ numero, data, descrizione })
    });
    const result = await res.json();
    if (res.ok) {
      alert(`Sessione ${numero} aggiunta`);
      document.getElementById('sessione-form').reset();
      loadSessioni(campagnaId);
    } else alert(result.error || 'Errore aggiunta');
  } catch (err) { alert(err.message); }
});

// ELIMINA SESSIONE
async function eliminaSessione(campagnaId, sessioneId) {
  try {
    const res = await fetch(`/campagna/${campagnaId}/sessione/${sessioneId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${masterToken}` }
    });
    const result = await res.json();
    if (res.ok) {
      loadSessioni(campagnaId);
      alert('Sessione eliminata');
    } else {
      alert(result.error || 'Errore eliminazione');
    } 
  } catch (err) { alert(err.message); }
}

// INIZIA MODIFICA SESSIONE
function startModifica(campagnaId, sessioneId, numero, data, descrizione) {
  document.getElementById('modifica-container').classList.remove('d-none');
  document.getElementById('modifica-campagna-id').value = campagnaId;
  document.getElementById('modifica-sessione-id').value = sessioneId;
  document.getElementById('modifica-numero').value = numero;
  document.getElementById('modifica-data').value = data;
  document.getElementById('modifica-descrizione').value = descrizione;
}

// CANCELLA MODIFICA
document.getElementById('modifica-cancel').addEventListener('click', () => {
  document.getElementById('modifica-container').classList.add('d-none');
});

// SALVA MODIFICA
document.getElementById('modifica-form').addEventListener('submit', async e => {
  e.preventDefault();
  const campagnaId = document.getElementById('modifica-campagna-id').value;
  const sessioneId = document.getElementById('modifica-sessione-id').value;
  const numero = document.getElementById('modifica-numero').value;
  const data = document.getElementById('modifica-data').value;
  const descrizione = document.getElementById('modifica-descrizione').value;

  try {
    const res = await fetch(`/campagna/${campagnaId}/sessione/${sessioneId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${masterToken}` },
      body: JSON.stringify({ numero, data, descrizione })
    });
    const result = await res.json();
    if (res.ok) {
      alert('Sessione aggiornata');
      document.getElementById('modifica-container').classList.add('d-none');
      loadSessioni(campagnaId);
    } else alert(result.error || 'Errore aggiornamento');
  } catch (err) { alert(err.message); }
});

// CAMBIO CAMPAGNA
document.getElementById('campagnaId').addEventListener('change', e => loadSessioni(e.target.value));
