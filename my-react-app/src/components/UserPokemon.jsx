function UserPokemon({pokemon, onClick}) {
    const {name, sprites, stats} = pokemon;
    return (
      <div onClick={() => onClick(pokemon)}>
        <div className="user-pokemon">{name}</div>
        <img src={sprites.front_default} alt={name} />
        <div>Hp: {stats[0].base_stat}</div>
        <div>Attack: {stats[1].base_stat}</div>
        <div>Defense: {stats[2].base_stat}</div>
      </div>
    );
  }
  
  export default UserPokemon;