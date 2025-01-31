import "./App.css";



function App() {

  const pokemons = [
    { id: 4, name: "Charmander", type: "fire", base_experience: 62 },
    { id: 7, name: "Squirtle", type: "water", base_experience: 63 },
    { id: 11, name: "Metapod", type: "bug", base_experience: 72 },
    { id: 12, name: "Butterfree", type: "flying", base_experience: 178 },
    { id: 25, name: "Pikachu", type: "electric", base_experience: 112 },
    { id: 39, name: "Jigglypuff", type: "normal", base_experience: 95 },
    { id: 94, name: "Gengar", type: "poison", base_experience: 225 },
    { id: 133, name: "Eevee", type: "normal", base_experience: 65 },
  ];

  return (
    <div className="App">
      <Pokegame pokemons={pokemons} />
    </div>
  );
}


type PokemonProps = { 
  id: number; 
  name: string; 
  type: string; 
  base_experience: number; 
}

function Pokegame({  pokemons }: { pokemons: PokemonProps[] }) {

  let hand1 = [];
  let hand2 = [...pokemons];

  while (hand1.length < hand2.length) {
    let randIdx = Math.floor(Math.random() * hand2.length);
    let randPokemon = hand2.splice(randIdx, 1)[0];
    hand1.push(randPokemon);
  }

  let exp1 = hand1.reduce((exp, pokemon) => exp + pokemon.base_experience, 0);
  let exp2 = hand2.reduce((exp, pokemon) => exp + pokemon.base_experience, 0);

  return (
    <div>
      <Pokedex pokemon={hand1} exp={exp1} isWinner={exp1 > exp2} />
      <Pokedex pokemon={hand2} exp={exp2} isWinner={exp2 > exp1} />
    </div>
  );
}



type PokedexProps = {
  pokemon: PokemonProps[];
  exp: number;
  isWinner: boolean;
}

function Pokedex({pokemon, exp, isWinner}: PokedexProps) {



  return (
    <div>
      <h4>Total Experience: {exp}</h4>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {pokemon.map((p) => (
          <Pokecard
            key={p.id}
            id={p.id}
            name={p.name}
            type={p.type}
            exp={p.base_experience}
          />
        ))}
      </div>
      <p style={{ color: isWinner ? "green" : "red" }}>{isWinner ? "Winning hand" : "Losing hand"}</p>
    </div>
  );
}

type PokecardProps = {
  id: number;
  name: string;
  type: string;
  exp: number;
}

function Pokecard({id, name, type, exp}: PokecardProps) {
  return (
    <article>
      <h2>{name}</h2>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={name}
      />
      <h3>{type}</h3>
    </article>
  );
}

export default App;
