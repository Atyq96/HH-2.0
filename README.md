# 🎵 HarmonyHub 🎵

## 🌟 Introduction

Welcome to **HarmonyHub** – a school project designed to enhance your music discovery experience by providing personalized music recommendations from Spotify. By analyzing your top tracks, HarmonyHub suggests new songs that match your taste. Log in with your Spotify credentials to view your top tracks and receive curated recommendations, complete with album covers and direct links to play on Spotify.

[🌐 Deployed Site](https://hh-2-0-fth8.vercel.app/)

[📄 Final Project Blog Article](https://medium.com/@ayoub3412/harmonyhub-a-journey-of-music-and-code-babbd7c54190)

### 👥 Authors

- **Amine Atyq**  
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/amine-atyq)  
  [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/atyq96)

- **Ayoub Abouchadi**  
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ayoub-abouchadi)  
  [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ghifrank)

## ⚙️ Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/harmonyhub.git
    cd harmonyhub
    ```

2. **Install the dependencies:**
    ```bash
    npm install
    ```

3. **Set up your Spotify API credentials:**

   - Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) and log in with your Spotify account.
   - Create a new application and get the **Client ID** and **Client Secret**.
   - Add a redirect URI (e.g., `http://localhost:3000`).

4. **Create a `.env` file:**
    ```bash
    touch .env
    ```

    Add the following lines to the `.env` file:
    ```env
    REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
    REACT_APP_SPOTIFY_REDIRECT_URI=http://localhost:3000
    ```

5. **Run the development server:**
    ```bash
    npm start
    ```

    The application will be available at `http://localhost:3000`.

## 🚀 Usage

1. **Log in with your Spotify account:**

   Click the "Get Started" button to log in with your Spotify credentials and authorize HarmonyHub to access your Spotify data.

2. **View your top tracks:**

   After logging in, you will see a list of your top tracks based on your listening history.

3. **Get recommendations:**

   Click the "Get Recommendations" button to receive personalized music recommendations based on your top tracks.

4. **Explore new music:**

   Each recommended track includes album covers and direct links to play the songs on Spotify.

## 🤝 Contributing

We welcome contributions to enhance HarmonyHub. To contribute, please follow these steps:

1. **Fork the repository:**
    ```bash
    git fork https://github.com/yourusername/harmonyhub.git
    ```

2. **Create a new branch:**
    ```bash
    git checkout -b feature/your-feature-name
    ```

3. **Make your changes and commit them:**
    ```bash
    git commit -m "Add your commit message"
    ```

4. **Push to the branch:**
    ```bash
    git push origin feature/your-feature-name
    ```

5. **Create a pull request:**

   Open a pull request on GitHub and describe your changes in detail.

## 🔗 Related Projects

- [Spotify Web API JS](https://github.com/JMPerez/spotify-web-api-js): A client-side JavaScript wrapper for the Spotify Web API.
- [React Icons](https://github.com/react-icons/react-icons): A library for including popular icons in your React projects.


---

Thank you for using HarmonyHub! We hope you enjoy discovering new music tailored just for you. If you have any questions or feedback, please feel free to reach out to us on [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/amine-atyq) or [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ayoub-abouchadi).
