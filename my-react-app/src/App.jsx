import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import LocationButtons from './components/LocationButtons';
import AreaButtons from './components/AreaButtons';
import SelectPokemon from './pages/SelectPokemon';
import Fight from './pages/Fight';


function App() {
  const [locations, setLocations] = useState([]);
  const [zoomedLocation, setZoomedLocation] = useState("");
  const [areas, setAreas] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [randomPokemon, setRandomPokemon] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/location');
        const data = await response.json();
        setLocations(data.results);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  async function areaClick(area) {

    try {
      const response = await fetch(area.url);
      const data = await response.json();
      setPokemons(data.pokemon_encounters);
      console.log(data.pokemon_encounters);

      if (data.pokemon_encounters.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.pokemon_encounters.length);
        const caughtPokemon = data.pokemon_encounters[randomIndex].pokemon.name;
        setRandomPokemon(caughtPokemon);
        console.log(caughtPokemon);


        navigate('/select-pokemon', { state: { randomPokemon: caughtPokemon } });


      } else {
        setRandomPokemon("This location doesn't seem to have any pokémon!");
      }


    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };


  async function checkClick(locationName, location) {
    if (zoomedLocation === locationName) {
      setZoomedLocation("");
      setAreas([]);
    } else {
      setZoomedLocation(locationName);
    }

    let locationURL = location.url;

    try {
      const response = await fetch(locationURL);
      const data = await response.json();
      console.log("Areas data:", data.areas);
      setAreas(data.areas);
    } catch (error) {
      console.error('Error fetching areas:', error);
    }
  }

  return (
    <div>
      {location.pathname === '/' && (
        <img src="./src/assets/k5ocr0kntvm21.jpg" className="background-img" alt="Background Image" />
      )}
      <Routes>
        {/* Home Page: Select Area */}
        <Route path="/" element={
          <>
            {locations
              .filter(location => zoomedLocation === "" || zoomedLocation === location.name)
              .map(location => (
                <LocationButtons
                  key={location.name}
                  locationProp={location}
                  checkClick={checkClick}
                />
              ))}

            {zoomedLocation && areas.length > 0 && (
              <div>
                <ul className="area-buttons">
                  {areas.map((area) => (
                    <AreaButtons
                      key={area.name}
                      areaProp={area}
                      areaClick={areaClick} />
                  ))}
                </ul>
              </div>
            )}
          </>
        } />

        {/* Pokémon Selection Page */}
        <Route path="/select-pokemon" element={<SelectPokemon />} />

        {/* Fight Page */}
        <Route path="/fight" element={<Fight />} />
      </Routes>
    </div>
  );
}

export default App;
