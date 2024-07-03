// src/components/MainPage.tsx

import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import "../App.css";

const spotifyApi = new SpotifyWebApi();

const MainPage: React.FC = () => {
  const [topTracks, setTopTracks] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const [recommendations, setRecommendations] = useState<
    SpotifyApi.TrackObjectFull[]
  >([]);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("spotifyAccessToken")
  );

  useEffect(() => {
    const hash = window.location.hash
      .substring(1)
      .split("&")
      .reduce((acc, item) => {
        const parts = item.split("=");
        acc[parts[0]] = decodeURIComponent(parts[1]);
        return acc;
      }, {} as Record<string, string>);

    if (hash.access_token) {
      const accessToken = hash.access_token;
      setToken(accessToken);
      localStorage.setItem("spotifyAccessToken", accessToken);
      spotifyApi.setAccessToken(accessToken);
      window.location.hash = ""; // Clear the token from the URL
    } else if (token) {
      spotifyApi.setAccessToken(token);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      const fetchTopTracks = async () => {
        try {
          const response = await spotifyApi.getMyTopTracks({ limit: 5 });
          setTopTracks(response.items);
        } catch (error) {
          console.error("Error fetching top tracks:", error);
        }
      };

      fetchTopTracks();
    }
  }, [token]);

  const fetchRecommendations = async () => {
    try {
      const seedTracks = topTracks.map((track) => track.id).slice(0, 5);
      const response = await spotifyApi.getRecommendations({
        seed_tracks: seedTracks,
        limit: 5,
      });
      setRecommendations(response.tracks);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const handleLogin = () => {
    const clientId = "f697bc8bf37d4b62aa9c1c2245a97e42"; // Your actual Client ID
    const redirectUri = "http://localhost:5174"; // Your local URL
    const scopes = ["user-top-read", "user-read-recently-played"];

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(
      scopes.join(" ")
    )}&response_type=token&show_dialog=true`;
    window.location.href = authUrl;
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("spotifyAccessToken");
    setTopTracks([]);
    setRecommendations([]);
  };

  return (
    <div className="main-container">
      <header>
        <h1>My Spotify App</h1>
        {!token ? (
          <button onClick={handleLogin}>Login with Spotify</button>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </header>
      {token && (
        <main>
          <section className="top-tracks">
            <h2>Top Tracks</h2>
            <ul>
              {topTracks.map((track) => (
                <li key={track.id}>
                  <img
                    src={track.album.images[0].url}
                    alt={track.name}
                    className="track-image"
                  />
                  <span>{track.name}</span>
                  <a
                    href={track.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/spotify_icon.png"
                      alt="Play on Spotify"
                      className="spotify-icon"
                    />
                  </a>
                </li>
              ))}
            </ul>
            {topTracks.length > 0 && (
              <button onClick={fetchRecommendations}>
                Get Recommendations
              </button>
            )}
          </section>
          {recommendations.length > 0 && (
            <section className="recommendations">
              <h2>Recommendations</h2>
              <ul>
                {recommendations.map((track) => (
                  <li key={track.id}>
                    <img
                      src={track.album.images[0].url}
                      alt={track.name}
                      className="track-image"
                    />
                    <span>{track.name}</span>
                    <a
                      href={track.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="/spotify_icon.png"
                        alt="Play on Spotify"
                        className="spotify-icon"
                      />
                    </a>
                  </li>
                ))}
              </ul>
              <button onClick={fetchRecommendations}>
                Refresh Recommendations
              </button>
            </section>
          )}
        </main>
      )}
      <footer>
        <p>Footer content here</p>
      </footer>
    </div>
  );
};

export default MainPage;
