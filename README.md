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
