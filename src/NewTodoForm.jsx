import React, { useState, useEffect } from "react";
import API_KEY from "../config";

const NewTodoForm = () => {
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const fetchPlatforms = () => {
    const platformsUrl = "https://api.rawg.io/api/platforms";
    const platformsParams = {
      key: API_KEY, // Replace with your RAWG API key
      page_size: 50, // Number of platforms to retrieve
    };

    fetch(`${platformsUrl}?${new URLSearchParams(platformsParams)}`)
      .then((response) => response.json())
      .then((data) => {
        setPlatforms(data.results);
      })
      .catch((error) => {
        console.error("Failed to retrieve platforms:", error);
      });
  };

  const fetchGames = () => {
    const gamesUrl = "https://api.rawg.io/api/games";
    const gamesParams = {
      key: API_KEY, // Replace with your RAWG API key
      platforms: selectedPlatform,
      page_size: 20, // Number of games to retrieve
    };

    fetch(`${gamesUrl}?${new URLSearchParams(gamesParams)}`)
      .then((response) => response.json())
      .then((data) => {
        setGames(data.results);
      })
      .catch((error) => {
        console.error("Failed to retrieve games:", error);
      });
  };

  const handlePlatformChange = (event) => {
    setSelectedPlatform(event.target.value);
  };

  useEffect(() => {
    if (selectedPlatform) {
      fetchGames();
    }
  }, [selectedPlatform]);

  return (
    <div>
      <h1>Select a Console:</h1>
      <select value={selectedPlatform} onChange={handlePlatformChange}>
        <option value="">Select Platform</option>
        {platforms.map((platform) => (
          <option key={platform.id} value={platform.id}>
            {platform.name}
          </option>
        ))}
      </select>

      <h2>Games:</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default NewTodoForm;
