const API_KEY = "b655454e0c281c941eb2a99e6ecec4c6"; 
// Ampio 'https://corsproxy.io/?' eo alohan'ny URL-n'ny API
const url = "https://corsproxy.io/?" + encodeURIComponent("https://api.football-data.org/v4/matches");

fetch(url, {
  headers: { 'X-Auth-Token': API_KEY }
})
.then(response => {
  if (!response.ok) {
    throw new Error('Erreur HTTP: ' + response.status);
  }
  return response.json();
})
.then(data => {
  const container = document.getElementById('matchs-container');
  container.innerHTML = '';

  if (!data.matches || data.matches.length === 0) {
    container.innerHTML = 'Tsy misy match anio.';
    return;
  }

  data.matches.forEach(match => {
    const div = document.createElement('div');
    div.className = 'match-card';
    div.innerHTML = `
      <strong>${match.homeTeam.name}</strong> 
      VS 
      <strong>${match.awayTeam.name}</strong><br>
      <small>Statut: ${match.status}</small>
    `;
    container.appendChild(div);
  });
})
.catch(error => {
  console.error('Erreur detalie:', error);
  document.getElementById('matchs-container').innerHTML = 'Misy olana ny fidirana amin meva: ' + error.message;
});
