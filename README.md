# Anime Calendar Web App

A dynamic web application that lets you browse top anime, search currently airing shows, and add episodes to a personalized calendar. Includes user authentication to save and load your anime episode schedule.

---

## Features

- Display top airing and popular completed anime from the Jikan API.
- Search currently airing anime with autocomplete.
- View and manage weekly episode air dates on a monthly calendar.
- User signup and login with JWT authentication.
- Save and load your personalized anime list linked to your user account.
- Responsive UI with modal login/signup forms.

---

## Technologies Used

- **Frontend:**
  - Vanilla JavaScript (ES6+)
  - [FullCalendar](https://fullcalendar.io/) for calendar UI
  - Jikan API for anime data

- **Backend:**
  - Node.js with Express
  - MongoDB (Mongoose)
  - JSON Web Tokens (JWT) for authentication
  - Bcrypt for password hashing

---

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local or remote instance)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/anime-calendar-app.git
   cd anime-calendar-app

2. Go into the backend files and install node module

   ```bash
    cd backend
    npm install

3. Create a .env file with the below specs

   ```bash
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    PORT=5000

4. Start Backend Server
   ```bash
    npm start
     or
    node server.js

5. Open index.html into your browser

