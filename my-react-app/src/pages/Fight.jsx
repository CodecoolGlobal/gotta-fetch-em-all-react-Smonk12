import { useLocation } from 'react-router-dom';
import './Fight.css';
import { useState, useEffect } from 'react';

function Fight() {
  const location = useLocation();
  const { selectedPokemon, enemyPokemon } = location.state || {};

  if (!selectedPokemon || !enemyPokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fight-background">
      <h1>Battle Begins!</h1>
      <div>
        <div className='your-pokemon-div'>
      {selectedPokemon.sprites && (
          <img className='your-pokemon-img' src={selectedPokemon.sprites.back_default} alt={selectedPokemon.name} />
        )}
        </div>

<div className='your-pokemon-stats'>
        <h2>Your Pokémon</h2>
        <p>Name: {selectedPokemon.name}</p>
        {selectedPokemon.stats && (
          <>
            <p>HP: {selectedPokemon.stats[0].base_stat}</p>
            <p>Attack: {selectedPokemon.stats[1].base_stat}</p>
            <p>Defense: {selectedPokemon.stats[2].base_stat}</p>
          </>
        )}
        </div>
      </div>
      <div>
      <div className='enemy-pokemon-div'>
        {enemyPokemon.sprites && (
          <img className='enemy-pokemon-img' src={enemyPokemon.sprites.front_default} alt={enemyPokemon.name} />
        )}
</div>
<div className='enemy-pokemon-stats'>
        <h2>Enemy Pokémon</h2>
        <p>Name: {enemyPokemon.name}</p>
        {enemyPokemon.stats && (
          <>
            <p>HP: {enemyPokemon.stats[0].base_stat}</p>
            <p>Attack: {enemyPokemon.stats[1].base_stat}</p>
            <p>Defense: {enemyPokemon.stats[2].base_stat}</p>

          </>
        )}
        </div>
      </div>
      <button>Attack</button>
      <button>Run</button>
    </div>
  );
}

export default Fight;