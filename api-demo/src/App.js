import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [allCharacters, setAllCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const characterRequest = await fetch(
          "https://hp-api.onrender.com/api/character"
        );
        const characterData = await characterRequest.json();

        if (characterRequest.ok) {
          setAllCharacters(characterData);
        } else if (!characterData.ok) {
          throw new Error("Something went wrong...Oops");
        }
      } catch (error) {
        console.log(error);
      }
      const characterRequest = await fetch(
        "https://hp-api.onrender.com/api/characters"
      );
      const characterData = await characterRequest.json();
      setAllCharacters(characterData);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Fetch API data</h1>

      {allCharacters.map((currentCharacter, index) => {
        return (
          <div key={index}>
            <h3>{currentCharacter.name}</h3>
            <img src={currentCharacter.image} alt={currentCharacter.name} />
          </div>
        );
      })}
    </div>
  );
}

export default App;
