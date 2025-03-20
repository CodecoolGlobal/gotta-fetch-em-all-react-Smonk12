import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './SelectPokemon.css';
import UserPokemon from '../components/UserPokemon';

function SelectPokemonApp() {
  const [userPokemons, setUserPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [randomPokemonGIF, setRandomPokemonGIF] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { randomPokemon } = location.state || {}; // Get selected Pokémon from previous page
  const [randomPokemonStats, setRandomPokemonStats] = useState([]);
  const { usersPokemonUrls } = location.state || {};

  useEffect(() => {
    const fetchPokemonStats = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`);
        const data = await response.json();
        setRandomPokemonStats(data);
        const gifUrl = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
        setRandomPokemonGIF(gifUrl);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    if (randomPokemon) {
      fetchPokemonStats();
    }
  }, [randomPokemon]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonsData = [];

      for (const pokemonUrl of usersPokemonUrls) {
        let response = await fetch(`${pokemonUrl}`);
        let data = await response.json();
        pokemonsData.push(data);
      }
      setUserPokemons(pokemonsData);
    };

    fetchPokemon();
  }, []);

  function handleSelectPokemon(pokemon) {
    setSelectedPokemon(pokemon);
    navigate('/fight', { state: { selectedPokemon: pokemon, enemyPokemon: randomPokemonStats, usersPokemonUrls, userPokemons} });
  }

  return (
    <>
      <div>
        <h2>Your pokemons:</h2>
        {userPokemons.map(userpokemon => (
          <UserPokemon
            key={userpokemon.name}
            pokemon={userpokemon}
            onClick={() => handleSelectPokemon(userpokemon)}
          />
        ))}
            
        <div><img className='random-pokemon-img' src={randomPokemonGIF} alt={randomPokemon} />Enemy Pokémon: {randomPokemon}</div>
      </div>
    </>
  );
}

export default SelectPokemonApp;