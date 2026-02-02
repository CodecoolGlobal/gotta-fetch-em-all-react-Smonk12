function UserPokemon({ pokemon, onClick }) {
  const { name, sprites, stats } = pokemon;
  return (
    <div className="poke-container" onClick={() => onClick(pokemon)}>
        <div className="user-pokemon">{name}</div>
        <img className="sprite" src={sprites.front_default} alt={name} />
        <div className="stats">
          <div className="stat">Hp: {stats[0].base_stat}</div>
          <div className="stat">Attack: {stats[1].base_stat}</div>
          <div className="stat">Defense: {stats[2].base_stat}</div>
      </div>
    </div>
  );
}

export default UserPokemon;