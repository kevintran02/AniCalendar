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
});


