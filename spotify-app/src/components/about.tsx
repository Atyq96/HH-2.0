// Importing necessary libraries and icons
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// Functional component definition for the About page
const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center px-5 py-20">
      {/* Page title */}
      <h1 className="text-3xl text-start font-bold mb-4 sm:text-center">About HarmonyHub</h1>
      
      {/* Description of HarmonyHub */}
      <p className="mb-8 sm:text-center sm:text-[20px] text-[18px]">
        HarmonyHub is a school project designed to provide personalized music
        recommendations to Spotify users. By analyzing users' top tracks, the
        app suggests new songs that match their taste. Users can log in with
        their Spotify credentials to view their top tracks and receive curated
        recommendations, each with album covers and direct links to play on
        Spotify. This project aims to enhance the music discovery experience
        using Spotify's API.
      </p>
      
      {/* Section for the developers' information */}
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-semibold">Made by:</h2>
        
        {/* Developer 1: Amine Atyq */}
        <div className="flex items-center space-x-4">
          <h3>Amine Atyq</h3>
          <a
            href="https://github.com/atyq96"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black"
          >
            <FaGithub className="text-2xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/amine-atyq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black"
          >
            <FaLinkedin className="text-2xl" />
          </a>
        </div>
        
        {/* Developer 2: Ayoub Abouchadi */}
        <div className="flex items-center space-x-4">
          <h3>Ayoub Abouchadi</h3>
          <a
            href="https://github.com/ghifrank"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black"
          >
            <FaGithub className="text-2xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/ayoub-abouchadi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black"
          >
            <FaLinkedin className="text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

// Exporting the About component as the default export
export default About;
