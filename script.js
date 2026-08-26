const API_KEY = "b655454e0c281c941eb2a99e6ecec4c6"; 

fetch('https://api.football-data.org/v4/matches', {
  headers: { 'X-Auth-Token': API_KEY }
})
.then(response => response.json())
.then(data => {
  const container = document.getElementById('matchs-container');
  container.innerHTML = ''; // Fafana ilay soratra miandry

  if (!data.matches || data.matches.length === 0) {
    container.innerHTML = 'Tsy misy match anio.';
    return;
  }

  // Asehoy tsirairay ny match
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
  console.error('Erreur:', error);
  document.getElementById('matchs-container').innerHTML = 'Misy olana ny fidirana amin meva.';
});
