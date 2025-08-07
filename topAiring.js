// Top airing and Top completed anime fetching and display script
async function fetchTopAiring(){
    const container = document.getElementById('top-airing-container');

    try{
        // Fetch the top airing anime from Jikan API
        const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing');
        const data = await response.json();

        // Clear container first
        container.innerHTML = '';

        const seenTitles = new Set();
        let count = 0;
        const maxAnime = 6;
        // Loop through the top airing anime and display them

        for (const anime of data.data) {
            if (seenTitles.has(anime.title)) continue;
            seenTitles.add(anime.title);
        

            const animeCard = document.createElement('div');
            animeCard.className = 'anime-card';

            animeCard.innerHTML = `<div class="image-container">
                <img src="${anime.images.webp.image_url}" alt="${anime.title}" />
                <div class="hover-title">${anime.title}
                <p>Score: ${anime.score || 'N/A'}</p></div>
            </div>`;

            container.appendChild(animeCard);
            count++;
            if(count >= maxAnime) break;

        }

       
    }catch(error){
        container.innerHTML = `<p class="error">Failed to load top airing anime. Please try again later.</p>`;
        console.error('Error fetching top airing anime:', error);
    }
}

async function fetchTopCompleted(){
    const container = document.getElementById('top-completed-container');

    try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=bypopularity');
        const data = await response.json();

        container.innerHTML = '';

        const seenTitles = new Set();
        let count = 0;
        const maxAnime = 6;

        for (const anime of data.data) {
            if (seenTitles.has(anime.title)) continue;
            seenTitles.add(anime.title);

            const animeCard = document.createElement('div');
            animeCard.className = 'anime-card';

            animeCard.innerHTML = `<div class="image-container">
                <img src="${anime.images.webp.image_url}" alt="${anime.title}" />
                <div class="hover-title">${anime.title}
                <p>Score: ${anime.score || 'N/A'}</p></div>
            </div>`;

            container.appendChild(animeCard);
            count++;
            if (count >= maxAnime) break;
        }
    } catch (error) {
        container.innerHTML = `<p class="error">Failed to load top completed anime. Please try again later.</p>`;
        console.error('Error fetching top completed anime:', error);
    }
}



fetchTopCompleted();    
fetchTopAiring();

// Modal

document.addEventListener('DOMContentLoaded', () => {
    const signupModal = document.getElementById('signupModal');
    const loginModal = document.getElementById('loginModal');
    
    const openSignupBtns = document.querySelectorAll('#openModalBtn');
    const openLoginBtn = document.getElementById('openModalBtn2');

    openSignupBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            signupModal.style.display = 'block';
            loginModal.style.display = 'none';
        });
    });

    openLoginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
        signupModal.style.display = 'none';
    }
    );

    const LoginToSignUpLink = document.querySelector('#loginModal .signup-link a');
    if(LoginToSignUpLink) {
        LoginToSignUpLink.addEventListener('click', (e) => {
            e.preventDefault()
            signupModal.style.display = 'block';
            loginModal.style.display = 'none';
        });
    }
  
    const SignUpToLoginLink = document.querySelector('#signupModal .login-link a');
    if (SignUpToLoginLink) {
        SignUpToLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'block';
            signupModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === signupModal) signupModal.style.display = 'none';
        if (e.target === loginModal) loginModal.style.display = 'none';

    });

    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = signupForm.email.value.trim();
    const password = signupForm.password.value.trim();

    try {
      const res = await fetch('http://localhost:5000/api/signup', {  // change URL if needed
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Signup successful! You can now log in.');
        signupForm.reset();
        // Optionally switch to login modal after signup
        signupModal.style.display = 'none';
        loginModal.style.display = 'block';
      } else {
        alert(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed due to a network error.');
    }
  });

  // --- Add login form submission ---
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();

    try {
      const res = await fetch('http://localhost:5000/api/login', {  // change URL if needed
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Login successful!');
        loginForm.reset();
        loginModal.style.display = 'none';
        // Store token for future authenticated requests
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);
        updateNavbar();  // Update navbar to reflect login status

        // Optionally redirect user or update UI to show logged-in status
      } else {
        alert(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed due to a network error.');
    }
  });

  //Logout functionality
  function updateNavbar(){
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const authButtons = document.querySelectorAll('.auth-button');
    const userInfo = document.getElementById('userInfo');
    const userEmail = document.getElementById('userEmail');
    if (token) {
        authButtons.forEach(button => button.style.display = 'none');
        if(userInfo) userInfo.style.display = 'inline';
        if(userEmail) userEmail.textContent = email;
    }
    else{
        authButtons.forEach(button => button.style.display = 'inline'); 
        if(userInfo) userInfo.style.display = 'none';
        if(userEmail) userEmail.textContent = '';
    }

  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      updateNavbar();
      alert('You have been logged out.');
      window.location.href = 'index.html';

    });
  }

  updateNavbar();

});

//Calendar
let currentAiring = []; 
let addedAnime = []; 

document.addEventListener('DOMContentLoaded', async function(){
    const calendarEl = document.getElementById('calendar');
    
    currentAiring = await getCachedAnimeEvents();
    console.log('📺 currentAiring:', currentAiring);

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        height: 'auto',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek'
        },
        buttonText:{
          today: 'Today',
          month: 'Month',
          week: 'Week'
        },
        eventColor: 'navyblue',
        eventTextColor: 'black',

        
        eventDidMount: function(info) {
          info.el.setAttribute('title', `${info.event.title} - Air Date: ${info.event.start.toLocaleDateString()}`);
        }

      });
      calendar.render();

      setupSearch(calendar);

      const addedList = document.getElementById('added-anime-list');
      await loadUserAnimeList(calendar, addedList);
    });

    function generateEpisodes(anime) {
      const episodes = anime.episodes || 12; // fallback to 12 if unknown
      const startDateStr = anime.aired.from;
      if (!startDateStr) return [];
    
      const startDate = new Date(startDateStr);
      let episodeEvents = [];
    
      for (let i = 0; i < episodes; i++) {
        let episodeDate = new Date(startDate);
        episodeDate.setDate(startDate.getDate() + i * 7); // weekly episodes
        
        episodeEvents.push({
          title: `${anime.title} Episode ${i + 1}`,
          start: episodeDate.toISOString().split('T')[0],
        });
      }
      return episodeEvents;
    }

    async function getCachedAnimeEvents() {
      const cacheKey = 'animeEvents';
      const cacheTTL = 1000 * 60 * 5; // 5 minutes
      const cached = localStorage.getItem(cacheKey);
    
      if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < cacheTTL) {
          console.log('✅ Loaded anime events from cache');
          return removeDuplicateTitles(data);
        } else {
          console.log('⏰ Cache expired, fetching new data...');
        }
      }
    
      const data = await fetchAnimeEvents();
      const uniqueData = removeDuplicateTitles(data);

      localStorage.setItem(cacheKey, JSON.stringify({
        timestamp: Date.now(),
        data
      }));
      return uniqueData;
    }

    function removeDuplicateTitles(animeList) {
      const seen = new Set();
      return animeList.filter(anime => {
        const title = anime.title;
        if (seen.has(anime.title)) return false;
        seen.add(title);
        return true;
      });
    }

    function setupSearch(calendar){
      const input = document.getElementById('anime-search');
      const resultsList = document.getElementById('anime-results');
      const addedList = document.getElementById('added-anime-list');

      input.addEventListener('input', () => {
        const query = input.value.toLowerCase();
        resultsList.innerHTML = '';
        if (!query) return;

        const filtered = currentAiring.filter(anime => 
          anime.title.toLowerCase().startsWith(query)
        ). slice(0, 10)

          filtered.forEach(anime => {
            const li = document.createElement('li');
            li.innerHTML= highlightMatch(anime.title, query);
            li.style.cursor = 'pointer';
            li.style.padding = '4px';
            li.style.borderBottom = '1px solid #ccc';

            li.onclick = () => {
              if (addedAnime.includes(anime.title)) return; 
              addedAnime.push(anime.title);
              const events = generateEpisodes(anime);
              calendar.addEventSource(events);

              const item = document.createElement('div');
              item.textContent = anime.title;
              const removeBtn = document.createElement('button');
              removeBtn.textContent = '✖'; 
              removeBtn.classList.add('remove-btn');
              removeBtn.title = 'Remove from calendar';
              removeBtn.onclick = () => {
                calendar.getEvents().forEach(e=> {
                  if(e.title.startsWith(anime.title)) e.remove();
                });
                addedAnime = addedAnime.filter (t => t !== anime.title);
                addedList.removeChild(item);
                saveUserAnimeList();
                };
                item.appendChild(removeBtn);
                addedList.appendChild(item);
                saveUserAnimeList();

                resultsList.innerHTML = '';
                input.value = '';
              };
              resultsList.appendChild(li);
          });
    });

    
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const topResult = resultsList.querySelector('li');
      if (topResult) {
        topResult.click(); // simulate clicking it
      }
    }
  });
    input.addEventListener('blur', () => {
      setTimeout(() => {
        resultsList.innerHTML = '';
      }, 200); // Delay to allow click event to register
    });
  }

  function highlightMatch(text, query) {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;
    return text.substring(0, index) + '<strong>' + text.substring(index, index + query.length) + '</strong>' + text.substring(index + query.length);
  }
  

    async function fetchAnimeEvents() {
      try {
        const res = await fetch('https://api.jikan.moe/v4/seasons/now'); // currently airing
        const data = await res.json();
        
        return data.data

      } catch (err) {
        console.error('Error fetching anime events:', err);
        return [];
      }
    }
  
    async function saveUserAnimeList() {
      const token = localStorage.getItem('token');
      if (!token) return;
    
      try {
        await fetch('http://localhost:5000/api/user/anime-list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ animeList: addedAnime })
        });
      } catch (err) {
        console.error('❌ Failed to save anime list:', err);
      }
    }   

    async function loadUserAnimeList(calendar, addedList) {
      const token = localStorage.getItem('token');
      if (!token) return;
    
      try {
        const res = await fetch('http://localhost:5000/api/user/anime-list', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        const savedTitles = data.animeList || [];
    
        for (const title of savedTitles) {
          const anime = currentAiring.find(a => a.title === title);
          if (!anime) continue;
    
          addedAnime.push(anime.title);
          const events = generateEpisodes(anime);
          calendar.addEventSource(events);
    
          const item = document.createElement('div');
          item.textContent = anime.title;
          const removeBtn = document.createElement('button');
          removeBtn.textContent = '✖'; 
          removeBtn.classList.add('remove-btn');
          removeBtn.title = 'Remove from calendar';
          removeBtn.onclick = () => {
            calendar.getEvents().forEach(e => {
              if (e.title.startsWith(anime.title)) e.remove();
            });
            addedAnime = addedAnime.filter(t => t !== anime.title);
            addedList.removeChild(item);
            saveUserAnimeList(); // save on remove
          };
          item.appendChild(removeBtn);
          addedList.appendChild(item);
        }
    
      } catch (err) {
        console.error('❌ Failed to load anime list:', err);
      }
    }
    
// Upcoming Page
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("upcomingContainer");
  if (!container) {
    console.error("No container element with id 'upcomingContainer' found.");
    return;
  }

  const cacheKey = "cachedAnime";
  const cacheExpiryKey = "cachedAnimeExpiry";
  const cacheDuration = 1000 * 60 * 30; // 30 minutes

  const now = Date.now();
  const cachedData = localStorage.getItem(cacheKey);
  const cachedExpiry = localStorage.getItem(cacheExpiryKey);

  let animeList = [];

  // Show loading message while fetching
  container.innerHTML = `<p>Loading upcoming anime...</p>`;

  try {
    if (cachedData && cachedExpiry && now < parseInt(cachedExpiry)) {
      animeList = JSON.parse(cachedData);
      console.log("Loaded upcoming anime from cache");
    } else {
      const res = await fetch("https://api.jikan.moe/v4/seasons/upcoming");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      animeList = data.data;

      localStorage.setItem(cacheKey, JSON.stringify(animeList));
      localStorage.setItem(cacheExpiryKey, (now + cacheDuration).toString());
      console.log("Fetched and cached upcoming anime");
    }
  } catch (err) {
    console.error("Failed to fetch upcoming anime:", err);
    container.innerHTML = `<p class="error">Failed to load upcoming anime. Please try again later.</p>`;
    return;
  }

  // Filter duplicates by title
  const uniqueAnimeList = [];
  const titles = new Set();

  for (const anime of animeList) {
    if (!titles.has(anime.title)) {
      titles.add(anime.title);
      uniqueAnimeList.push(anime);
    }
  }

  // Clear loading message
  container.innerHTML = "";

  if (uniqueAnimeList.length === 0) {
    container.innerHTML = `<p>No upcoming anime found.</p>`;
    return;
  }

  uniqueAnimeList.sort((a, b) => {
    const dateA = a.aired?.from ? new Date(a.aired.from) : null;
    const dateB = b.aired?.from ? new Date(b.aired.from) : null;

    if (!dateA && !dateB) return 0;       
    if (!dateA) return 1;              
    if (!dateB) return -1;               
    return dateA - dateB;
  });

  // Create anime cards
  uniqueAnimeList.slice(0, 20).forEach(anime => {
    const card = document.createElement("div");
    card.classList.add("upcoming-anime-card");

    // Safe image URL fallback if image missing
    const imgSrc = anime.images?.jpg?.image_url || "placeholder.jpg";
    const airDate = anime.aired?.from ? new Date(anime.aired.from).toLocaleDateString() : "TBA";

    card.innerHTML = `
      <img src="${imgSrc}" alt="${anime.title}" class="upcoming-anime-img" loading="lazy" />
      <h3 class="anime-title">${anime.title}</h3>
      <p class="anime-date">Airing: ${airDate}</p>
    `;

    container.appendChild(card);
  });
});
