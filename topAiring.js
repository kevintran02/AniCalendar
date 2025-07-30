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
    });
  }

  updateNavbar();

});

