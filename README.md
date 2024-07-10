HarmonyHub
Introduction
Welcome to HarmonyHub – a school project designed to enhance your music discovery experience by providing personalized music recommendations from Spotify. By analyzing your top tracks, HarmonyHub suggests new songs that match your taste. Log in with your Spotify credentials to view your top tracks and receive curated recommendations, complete with album covers and direct links to play on Spotify.

Deployed Site

Final Project Blog Article

Authors
Amine Atyq
LinkedIn
GitHub

Ayoub Abouchadi
LinkedIn
GitHub

Installation
To run this project locally, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/harmonyhub.git
cd harmonyhub
Install the dependencies:

bash
Copy code
npm install
Set up your Spotify API credentials:

Go to the Spotify Developer Dashboard and log in with your Spotify account.
Create a new application and get the Client ID and Client Secret.
Add a redirect URI (e.g., http://localhost:3000).
Create a .env file:

bash
Copy code
touch .env
Add the following lines to the .env file:

env
Copy code
REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
REACT_APP_SPOTIFY_REDIRECT_URI=http://localhost:3000
Run the development server:

bash
Copy code
npm start
The application will be available at http://localhost:3000.

Usage
Log in with your Spotify account:

Click the "Get Started" button to log in with your Spotify credentials and authorize HarmonyHub to access your Spotify data.

View your top tracks:

After logging in, you will see a list of your top tracks based on your listening history.

Get recommendations:

Click the "Get Recommendations" button to receive personalized music recommendations based on your top tracks.

Explore new music:

Each recommended track includes album covers and direct links to play the songs on Spotify.

Contributing
We welcome contributions to enhance HarmonyHub. To contribute, please follow these steps:

Fork the repository:

bash
Copy code
git fork https://github.com/yourusername/harmonyhub.git
Create a new branch:

bash
Copy code
git checkout -b feature/your-feature-name
Make your changes and commit them:

bash
Copy code
git commit -m "Add your commit message"
Push to the branch:

bash
Copy code
git push origin feature/your-feature-name
Create a pull request:

Open a pull request on GitHub and describe your changes in detail.

Related Projects
Spotify Web API JS: A client-side JavaScript wrapper for the Spotify Web API.
React Icons: A library for including popular icons in your React projects.
Licensing
This project is licensed under the MIT License. See the LICENSE file for more details.

Thank you for using HarmonyHub! We hope you enjoy discovering new music tailored just for you. If you have any questions or feedback, please feel free to reach out to us on LinkedIn or LinkedIn.