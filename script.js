const API_KEY = "b655454e0c281c941eb2a99e6ecec4c6"; // Soloy amin'ny API Key azonao ao amin'ny football-data.org
const matchDateInput = document.getElementById('match-date');
const container = document.getElementById('matchs-container');

// Daty androany
const today = new Date().toISOString().split('T')[0];
matchDateInput.value = today;

function fetchMatches(date) {
  container.innerHTML = 'Chargement des matchs...';

  // Mampiasa CORS Proxy mba handehanan'ny API key maimaimpoana
  const targetUrl = `https://api.football-data.org/v4/matches?dateFrom=${date}&dateTo=${date}`;
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;

  fetch(proxyUrl, {
    headers: { 'X-Auth-Token': API_KEY }
  })
  .then(response => response.json())
  .then(data => {
    container.innerHTML = '';

    if (!data.matches || data.matches.length === 0) {
      container.innerHTML = '<p>Aucun match programmé pour cette date.</p>';
      return;
    }

    data.matches.forEach(match => {
      const scoreHome = match.score.fullTime.home !== null ? match.score.fullTime.home : '';
      const scoreAway = match.score.fullTime.away !== null ? match.score.fullTime.away : '';
      const scoreText = (scoreHome !== '' && scoreAway !== '') ? `${scoreHome} - ${scoreAway}` : 'VS';

      // Hanova ny ora ho mazava (UTC -> Ora lokal)
      const matchTime = new Date(match.utcDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

      const div = document.createElement('div');
      div.className = 'match-card';
      div.innerHTML = `
        <div class="league-title">${match.competition.name}</div>
        <div class="teams-score">
          <strong>${match.homeTeam.name}</strong> ${scoreText} <strong>${match.awayTeam.name}</strong>
        </div>
        <div class="match-time">Statut : ${match.status} | Heure : ${matchTime}</div>
      `;
      container.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Erreur:', error);
    container.innerHTML = '<p>Erreur lors du chargement des matchs. Vérifiez votre API Key.</p>';
  });
}

// Antsoina rehefa misokatra ny pejy
fetchMatches(today);

// Antsoina rehefa miova ny daty amin'ny calendrier
matchDateInput.addEventListener('change', (e) => {
  fetchMatches(e.target.value);
});
