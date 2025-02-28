'use client'
import LoadingSpinner from '@/app/Components/LoadingSpinner';
import StatBar from '@/app/Components/StateBar';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type PokemonDetail = {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
      home: {
        front_default: string;
      };
      dream_world: {
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  species: {
    name: string;
    url: string;
  };
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
}


type PokemonSpecies = {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version: {
      name: string;
      url: string;
    };
  }[];
  genera: {
    genus: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  color: {
    name: string;
    url: string;
  };
  evolution_chain: {
    url: string;
  };
}

const fetchPokemonSpecies = async (
  idOrName: string | number
): Promise<PokemonSpecies> => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${idOrName}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching Pokemon species for ${idOrName}:`, error);
    throw error;
  }
};

const fetchPokemonDetails = async (id:string) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const data = await res.json();
  return data;
}


const DetailsPage = () => {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("stats");
  const params = useParams();
  const id = params?.id as string

  const artworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;


  const getEnglishFlavorText = () => {
    if (!species?.flavor_text_entries) return "";
    
    const englishEntry = species.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    
    return englishEntry ? englishEntry.flavor_text.replace(/\\f|\\n/g, " ") : "";
  };
  const flavorText = getEnglishFlavorText();

  useEffect(()=>{
    const loadPokemonData = async()=>{

      try{
        setLoading(true);
        
        const [pokemonData, speciesData] = await Promise.all([
          fetchPokemonDetails(id),
          fetchPokemonSpecies(id)
        ]);

        setPokemon(pokemonData);
        setSpecies(speciesData);
      }
      catch(error){
        console.log("Error loading details: ", error)
      }
      finally{
        setLoading(false);
      }
    }

    loadPokemonData();
  }, [id])


  // If Pokemon not found
  if (!pokemon) {
    return (
      <>
        {
          loading? <></> : 
          <div className="min-h-screen flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold mb-4">Pokémon Not Found</h1>
              <Link
                href="/"
                className="px-6 py-3 bg-gray-800 text-white font-medium rounded-full transition-all duration-300 hover:bg-gray-700"
                >
                Return to Home
              </Link>
            </div>
          </div>
            }
        </>
    );
  }

  return (
    <div className='w-[80%] m-auto py-4 cursor-pointer opacity-0 animate-fade-in'>

      {/* Back Arrow SVG (Breadcrumb)*/}
      <div className='my-4 text-gray-600 text-sm flex'>
        <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
              </svg>
        <Link href={'/'}>Back to all Pokémon</Link>
      </div>
      
      {
          loading? <LoadingSpinner/> : 
          <div className='bg-gray-100 min-h-[100vh] my-2 rounded rounded-t-3xl'>
            
            {/* Header Section */}
            <div className='bg-gray-300 h-[200px] flex items-center justify-between px-4 rounded rounded-t-3xl'>
                <div className='text-white'>
                  <p >#{pokemon?.id}</p>
                  <h1 className='text-4xl'>{pokemon?.name}</h1>
                  <div className='flex gap-1 text-xs my-1'>
                    {pokemon?.types.map((typeInfo, idx)=>{
                      return <p key={idx} className='rounded-2xl bg-green-500 px-2'>{typeInfo.type.name}</p>
                    })}
                  </div>
                  <div>
                    {species?.genera && (
                      <p className="text-white/90 text-lg mt-2">
                        {species.genera.find((g) => g.language.name === "en")?.genus || ""}
                      </p>
                    )}
                  </div>
                </div>
                <div className='h-full'>
                  <Image src={artworkUrl} alt={pokemon?.name} className='h-full object-contain transition-transform duration-300 hover:scale-110'
                  width={200} height={200}/>
                </div>
            </div>


            
            <div className='p-6'>
              <div className='w-[80%] m-auto bg-gray-50 my-2 rounded-lg p-4 mb-8 italic'>
               {flavorText}
              </div>
              


              <div className="mb-6">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8">
                    <button
                      onClick={() => setActiveTab("stats")}
                      className={`py-3 px-1 text-center border-b-2 font-medium text-sm ${
                        activeTab === "stats"
                          ? "border-gray-900 text-gray-900"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Stats
                    </button>
                    <button
                      onClick={() => setActiveTab("about")}
                      className={`py-3 px-1 text-center border-b-2 font-medium text-sm ${
                        activeTab === "about"
                          ? "border-gray-900 text-gray-900"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      About
                    </button>
                    <button
                      onClick={() => setActiveTab("moves")}
                      className={`py-3 px-1 text-center border-b-2 font-medium text-sm ${
                        activeTab === "moves"
                          ? "border-gray-900 text-gray-900"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Moves
                    </button>
                  </nav>
                </div>
              </div>

              <div className="py-6">
                  {activeTab === "stats" && (
                    <div className="animate-fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          {pokemon.stats.slice(0, 3).map((stat) => (
                            <StatBar
                              key={stat.stat.name}
                              statName={stat.stat.name}
                              value={stat.base_stat}
                            />
                          ))}
                        </div>
                        <div>
                          {pokemon.stats.slice(3).map((stat) => (
                            <StatBar
                              key={stat.stat.name}
                              statName={stat.stat.name}
                              value={stat.base_stat}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}


                  
                  {activeTab === "about" && (
                    <div className="animate-fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Characteristics</h3>
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="text-gray-600">Height</div>
                              <div>{(pokemon.height / 10).toFixed(1)}m</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="text-gray-600">Weight</div>
                              <div>{(pokemon.weight / 10).toFixed(1)}kg</div>
                            </div>
                            {species?.color && (
                              <div className="grid grid-cols-2 gap-4">
                                <div className="text-gray-600">Color</div>
                                <div className="capitalize">{species.color.name}</div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Abilities</h3>
                          <ul className="space-y-2">
                            {pokemon.abilities.map((ability) => (
                              <li key={ability.ability.name} className="flex items-start">
                                <span className="h-5 w-5 text-gray-400 mr-2">
                                  {ability.is_hidden ? "🔍" : "✓"}
                                </span>
                                <div>
                                  <span className="font-medium capitalize">
                                    {(ability.ability.name)}
                                  </span>
                                  {ability.is_hidden && (
                                    <span className="text-xs text-gray-500 ml-2">(Hidden)</span>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                </div>


                {activeTab === "moves" && (
                    <div className="animate-fade-in">
                      <h3 className="text-lg font-semibold mb-4">Moves</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {pokemon.moves.slice(0, 20).map((moveInfo) => (
                          <div
                            key={moveInfo.move.name}
                            className="px-3 py-2 bg-gray-300 rounded-lg text-center"
                          >
                            <span className="text-sm capitalize">
                              {(moveInfo.move.name)}
                            </span>
                          </div>
                        ))}
                      </div>
                      {pokemon.moves.length > 20 && (
                        <p className="text-center text-gray-500 mt-4 text-sm">
                          {pokemon.moves.length - 20} more moves not shown
                        </p>
                      )}
                    </div>
                  )}


            </div>
          </div>
        }
    </div>
  )
}

export default DetailsPage
