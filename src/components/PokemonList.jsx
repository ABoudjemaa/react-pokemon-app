  
const PokemonList = ({ pokemon }) => {
  return (
    <ul>
      {pokemon && pokemon.map((poke) => (
        <li key={poke.id} className=" m-5 text-center inline-block">
          <img src={poke.sprite} alt={poke.name} className="h-24 w-24" />
          <p>{poke.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default PokemonList;
