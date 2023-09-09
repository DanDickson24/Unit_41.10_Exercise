import { v4 as uuidv4 } from "uuid";
import PokemonSelect from "./PokemonSelect";
import PokemonCard from "./PokemonCard";
import "./PokeDex.css";
import { useAxios } from "./hooks";

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
// function PokeDex() {
//   const [pokemon, setPokemon] = useState([]);
//   const addPokemon = async name => {
//     const response = await axios.get(
//       `https://pokeapi.co/api/v2/pokemon/${name}/`
//     );
//     setPokemon(pokemon => [...pokemon, { ...response.data, id: uuidv4 }]);
//   };
//   return (
//     <div className="PokeDex">
//       <div className="PokeDex-buttons">
//         <h3>Please select your pokemon:</h3>
//         <PokemonSelect add={addPokemon} />
//       </div>
//       <div className="PokeDex-card-area">
//         {pokemon.map(cardData => (
//           <PokemonCard
//             key={cardData.id}
//             front={cardData.sprites.front_default}
//             back={cardData.sprites.back_default}
//             name={cardData.name}
//             stats={cardData.stats.map(stat => ({
//               value: stat.base_stat,
//               name: stat.stat.name
//             }))}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PokeDex;


// function PokeDex() {
//   const [pokemon, addPokemon, clearPokemon] = useAxios(
//     "https://pokeapi.co/api/v2/pokemon"
//   );

//   const fetchPokemonData = async (name) => {
//     await addPokemon(`/${name}/`);
//   };

//   const handleClearPokemon = () => {
//     clearPokemon();
//   };

//   return (
//     <div className="PokeDex">
//       <div className="PokeDex-buttons">
//         <h3>Please select your pokemon:</h3>
//         <PokemonSelect add={fetchPokemonData} />
//         <button onClick={handleClearPokemon}>Clear all Pokemon cards</button>
//       </div>
//       <div className="PokeDex-card-area">
//         {pokemon.map((cardData) => (
//           <PokemonCard
//             key={uuidv4()}
//             front={cardData.sprites.front_default}
//             back={cardData.sprites.back_default}
//             name={cardData.name}
//             stats={cardData.stats.map((stat) => ({
//               value: stat.base_stat,
//               name: stat.stat.name,
//             }))}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PokeDex;

function formatPokemon(data) {
  // Extract only the information needed for Pokemon cards
  const { id, sprites, name, stats } = data;
  const front = sprites.front_default;
  const back = sprites.back_default;

  // Extract stats data with name and value
  const formattedStats = stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));

  return { id, front, back, name, stats: formattedStats };
}

function PokeDex() {
  const [pokemon, addPokemon, clearPokemon] = useAxios(
    "https://pokeapi.co/api/v2/pokemon",
    formatPokemon
  );

  const fetchPokemonData = async (name) => {
    await addPokemon(`/${name}/`);
  };

  const handleClearPokemon = () => {
    clearPokemon();
  };

  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your Pokemon:</h3>
        <PokemonSelect add={fetchPokemonData} />
        <button onClick={handleClearPokemon}>Clear all Pokemon cards</button>
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map((cardData) => (
          <PokemonCard
            key={uuidv4()}
            front={cardData.front}
            back={cardData.back}
            name={cardData.name}
            stats={cardData.stats}
          />
        ))}
      </div>
    </div>
  );
}

export default PokeDex;