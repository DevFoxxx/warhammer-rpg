async function loadOverview() {
    try {
    const res = await fetch('/campagna');
    const campagne = await res.json();
    if (!campagne.length) return;

    const campagna = campagne[0]; // o quella selezionata
    document.getElementById('overview-titolo').textContent = campagna.titolo;
    document.getElementById('overview-sessioni').textContent = campagna.sessioni?.length || 0;
    document.getElementById('overview-stato').textContent = campagna.status;
    } catch (err) {
    console.error('Errore overview:', err);
    }
}
loadOverview();