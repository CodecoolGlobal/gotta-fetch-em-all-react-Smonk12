import { useLocation, useNavigate } from 'react-router-dom';
import './Fight.css';
import { useState, useEffect } from 'react';


function Fight() {

  const location = useLocation();
  const navigate = useNavigate();
  const { selectedPokemon, enemyPokemon, usersPokemonUrls, userPokemons } = location.state || {};


  if (!selectedPokemon || !enemyPokemon) {
    return <div>Loading...</div>;
  }


  let enemyPokemonGIF = enemyPokemon.sprites.versions["generation-v"]["black-white"].animated.front_default
  let selectedPokemonGIF = selectedPokemon.sprites.versions["generation-v"]["black-white"].animated.back_default



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
            setIsAttackDisabled(true)
          }
          return newHP;
        });
      } setIsAttackDisabled(false);
    }, 0);
  };

  useEffect(() => {
    if (catchedPokemon === "You lost!" && battleOver === true) {
      setIsAttackDisabled(true)
      setTimeout(() => navigate('/'), 999);
      setIsAttackDisabled(false)
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
      <h1 className='top-text'>The Battle Begins!</h1>
      <div>
        <div className='your-pokemon-img-div'>
          {selectedPokemon.sprites && (
            <img className='your-pokemon-img' src={selectedPokemonGIF} alt={selectedPokemon.name} />
          )}
        </div>

        <div className='your-pokemon-stats-div'>
          <div>
            <h1 className='pokemon-name'>{selectedPokemon.name}</h1>
          </div>
          {selectedPokemon.stats && (
            <>
              <div>
                <p><img className='heart' src="./src/assets/friendly-heart.png" alt="heart-icon" />HP: {playerHP}</p>
                <p><img className='attack' src="./src/assets/attack.png" alt="heart-icon" />Attack: {selectedPokemon.stats[1].base_stat}</p>
                <p><img className='defense' src="./src/assets/defense.png" alt="defense-icon" />Defense: {selectedPokemon.stats[2].base_stat}</p>
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        <div className='enemy-pokemon-img-div'>
          {enemyPokemon.sprites && (
            <img className='enemy-pokemon-img' src={enemyPokemonGIF} alt={enemyPokemon.name} />
          )}
        </div>
        <div className='enemy-pokemon-stats-div'>
          <div>
            <h1 className='pokemon-name'>{enemyPokemon.name}</h1>
          </div>
          {enemyPokemon.stats && (
            <>
              <div>
                <p><img className='heart' src="./src/assets/enemy-heart.png" alt="heart-icon" />HP: {enemyHP}</p>
                <p><img className='attack' src="./src/assets/attack.png" alt="heart-icon" />Attack: {enemyPokemon.stats[1].base_stat}</p>
                <p><img className='defense' src="./src/assets/defense.png" alt="defense-icon" />Defense: {enemyPokemon.stats[2].base_stat}</p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className='fight-btns'>
      <button className='attack-btn btn' onClick={handleAttack} disabled={isAttackDisabled}>Attack</button>
      <button className='select-diff-btn btn'>Select different Pokémon</button>
      <button className='run-btn btn'>Run</button>
      </div>
    </div>
  );
}

export default Fight;
