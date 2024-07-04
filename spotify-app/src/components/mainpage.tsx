import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

const MainPage: React.FC = () => {
  const [topTracks, setTopTracks] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const [recommendations, setRecommendations] = useState<
    SpotifyApi.TrackObjectSimplified[]
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
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID; // Your actual Client ID
    const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI; // Your local URL or production URL
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
    <div className="flex flex-col items-center p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">My Spotify App</h1>
        {!token ? (
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Login with Spotify
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Logout
          </button>
        )}
      </header>
      {token && (
        <main className="w-full max-w-xl">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Top Tracks</h2>
            <ul className="space-y-4">
              {topTracks.map((track) => (
                <li key={track.id} className="flex items-center space-x-4">
                  <img
                    src={track.album.images[0].url}
                    alt={track.name}
                    className="w-16 h-16 rounded"
                  />
                  <span className="flex-1">{track.name}</span>
                  <a
                    href={track.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/spotify-icon.png"
                      alt="Play on Spotify"
                      className="w-8 h-8"
                    />
                  </a>
                </li>
              ))}
            </ul>
            {topTracks.length > 0 && (
              <button
                onClick={fetchRecommendations}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Get Recommendations
              </button>
            )}
          </section>
          {recommendations.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>
              <ul className="space-y-4">
                {recommendations.map((track) => (
                  <li key={track.id} className="flex items-center space-x-4">
                    <span className="flex-1">{track.name}</span>
                    <a
                      href={track.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="/spotify-icon.png"
                        alt="Play on Spotify"
                        className="w-8 h-8"
                      />
                    </a>
                  </li>
                ))}
              </ul>
              <button
                onClick={fetchRecommendations}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Refresh Recommendations
              </button>
            </section>
          )}
        </main>
      )}
      <footer className="mt-8">
        <p className="text-gray-600">Footer content here</p>
      </footer>
    </div>
  );
};

export default MainPage;
