// Importing necessary hooks from React and the Spotify Web API library
import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

// Creating an instance of the Spotify Web API
const spotifyApi = new SpotifyWebApi();

const MainPage: React.FC = () => {
  // State to store top tracks fetched from Spotify API
  const [topTracks, setTopTracks] = useState<SpotifyApi.TrackObjectFull[]>([]);
  
  // State to store recommended tracks fetched from Spotify API
  const [recommendations, setRecommendations] = useState<SpotifyApi.TrackObjectFull[]>([]);
  
  // State to store the Spotify access token, initialized from localStorage if available
  const [token, setToken] = useState<string | null>(localStorage.getItem("spotifyAccessToken"));

  useEffect(() => {
    // Extracting the access token from the URL hash if available
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
      // Function to fetch the user's top tracks
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

  // Function to fetch track recommendations based on top tracks
  const fetchRecommendations = async () => {
    try {
      const seedTracks = topTracks.map((track) => track.id).slice(0, 5);
      const response = await spotifyApi.getRecommendations({
        seed_tracks: seedTracks,
        limit: 5,
      });

      // Fetch detailed track information
      const detailedTracks = await Promise.all(
        response.tracks.map((track) => spotifyApi.getTrack(track.id))
      );

      setRecommendations(detailedTracks);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  // Function to handle Spotify login
  const handleLogin = () => {
    const clientId = "f697bc8bf37d4b62aa9c1c2245a97e42"; // Your actual Client ID
    const redirectUri = "https://hh-2-0-fth8.vercel.app/"; // Your local URL or production URL
    const scopes = ["user-top-read", "user-read-recently-played"];

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(
      scopes.join(" ")
    )}&response_type=token&show_dialog=true`;
    window.location.href = authUrl;
  };

  // Function to handle Spotify logout
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("spotifyAccessToken");
    setTopTracks([]);
    setRecommendations([]);
  };

  return (
    <div className="flex flex-col items-center sm:p-32 px-10 py-32 justify-center">
      <div className="flex flex-col gap-5 rounded-lg justify-center items-center">
        <h1 className="font-bold text-[18px] sm:text-[50px] text-center">
          Welcome to Harmony Hub
        </h1>
        <p className="text-[18px] text-center w-full sm:text-md ml-2 mr-2">
          {!token
            ? "Your Personalized Soundtrack Awaits! Dive into a world of music perfectly curated from your Spotify favorites."
            : "Explore your top tracks and discover new music tailored just for you!"}
        </p>
        {/* Show login button if no token is present, otherwise show logout button */}
        {!token ? (
          <button
            onClick={handleLogin}
            className="bg-green-500 text-white rounded-lg p-2 w-32"
          >
            Get Started
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white rounded-lg p-2 w-32"
          >
            Logout
          </button>
        )}
      </div>
      {token && (
        <main className="w-full flex flex-col sm:flex-row gap-10 p-5 justify-center">
          <section className="w-full sm:w-1/2 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Top Tracks</h2>
            <ul className="space-y-4">
              {/* Display user's top tracks */}
              {topTracks.map((track) => (
                <li key={track.id} className="flex items-center space-x-4">
                  {track.album && track.album.images[0] && (
                    <img
                      src={track.album.images[0].url}
                      alt={track.name}
                      className="w-16 h-16 rounded"
                    />
                  )}
                  <div className="flex-1">
                    <span className="block">{track.name}</span>
                    <span className="text-gray-400 text-sm">
                      {track.artists.map((artist) => artist.name).join(", ")}
                    </span>
                  </div>
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
            <section className="w-full sm:w-1/2">
              <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>
              <ul className="space-y-4">
                {/* Display recommended tracks */}
                {recommendations.map((track) => (
                  <li key={track.id} className="flex items-center space-x-4">
                    {track.album && track.album.images[0] && (
                      <img
                        src={track.album.images[0].url}
                        alt={track.name}
                        className="w-16 h-16 rounded"
                      />
                    )}
                    <div className="flex-1">
                      <span className="block">{track.name}</span>
                      <span className="text-gray-400 text-sm">
                        {track.artists.map((artist) => artist.name).join(", ")}
                      </span>
                    </div>
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
    </div>
  );
};

export default MainPage;
