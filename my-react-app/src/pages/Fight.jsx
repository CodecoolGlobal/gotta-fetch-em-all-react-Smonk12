import { useLocation, useNavigate } from 'react-router-dom';
import './Fight.css';
import { useState, useEffect } from 'react';


function Fight() {

  const location = useLocation();
  const navigate = useNavigate();
  const { selectedPokemon, enemyPokemon, usersPokemonUrls, userPokemons, randomPokemon } = location.state || {};

  if (!selectedPokemon || !enemyPokemon) {
    return <div>Loading...</div>;
  }

  const [playerHP, setPlayerHP] = useState(0);
  const [enemyHP, setEnemyHP] = useState(0);
  const [battleOver, setBattleOver] = useState(false);
  const [catchedPokemon, setCatchedPokemon] = useState("");
  const [isAttackDisabled, setIsAttackDisabled] = useState(false);


  useEffect(() => {
    if (selectedPokemon && enemyPokemon) {
      setPlayerHP(selectedPokemon.stats[0].base_stat);
      setEnemyHP(enemyPokemon.stats[0].base_stat);
    }
  }, [selectedPokemon, enemyPokemon]);


  const calculateDamage = (attacker, defender) => {
    const attack = attacker.stats[1].base_stat;
    const defense = defender.stats[2].base_stat;

    const randomFactor = Math.floor(Math.random() * (255 - 217 + 1)) + 217;
    const baseDamage = ((2 / 5 + 2) * attack * 60) / (defense * 50) + 2;
    const finalDamage = Math.floor(baseDamage * (randomFactor / 255));

    return finalDamage;
  };


  const handleAttack = () => {
    setIsAttackDisabled(true);
    //if (battleOver) return; // Don't allow attacking if the battle is over.

    if (battleOver === true) {
      return;
    };

    const damageToEnemy = calculateDamage(selectedPokemon, enemyPokemon);

    setEnemyHP(prevHP => {
      const newHP = Math.max(prevHP - damageToEnemy, 0);
      if (newHP === 0) {
        setBattleOver(true);
        setCatchedPokemon(enemyPokemon.name);
        console.log(enemyPokemon);

        console.log("won");
      }
      return newHP;
    });

    setTimeout(() => {
      if (enemyHP > 0) {
        const damageToPlayer = calculateDamage(enemyPokemon, selectedPokemon);
        setPlayerHP(prevHP => {
          const newHP = Math.max(prevHP - damageToPlayer, 0);
          if (newHP === 0) {
            setBattleOver(true);
            setCatchedPokemon("You lost!");
            console.log("enemy won");
          }
          return newHP;
        });
      } setIsAttackDisabled(false);
    }, 1000);
  };

  useEffect(() => {
    if (catchedPokemon === "You lost!" && battleOver === true) {
      setTimeout(() => navigate('/'), 999);
    }
  }, []);

  useEffect(() => {
    if (catchedPokemon) {
      console.log("Catched Pokémon:", catchedPokemon);
      if (battleOver === true) {
        setTimeout(() => navigate('/', { state: { newPokemon: catchedPokemon } }), 999);
      }
    }
  }, [catchedPokemon]);


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
              <p>HP: {playerHP}</p>
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
              <p>HP: {enemyHP}</p>
              <p>Attack: {enemyPokemon.stats[1].base_stat}</p>
              <p>Defense: {enemyPokemon.stats[2].base_stat}</p>

            </>
          )}
        </div>
      </div>
      <button onClick={handleAttack} disabled={isAttackDisabled}>Attack</button>
      <button onClick={()=> navigate('/select-pokemon', { state: {usersPokemonUrls, userPokemons, randomPokemon}})}>Select different Pokémon</button>
      <button onClick={()=> navigate('/')}>Run</button>
    </div>
  );
}

export default Fight;
