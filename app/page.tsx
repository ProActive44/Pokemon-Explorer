'use client'
import React, { useEffect, useState } from 'react'
import PokemonCard from "./Components/PokemonCard"
import LoadingSpinner from './Components/LoadingSpinner';
import SearchBar from './Components/SearchBar';

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

export type Pokemon = {
  name: string,
  url: string,
  details: PokemonDetail
}

const fetchData = async() : Promise<Pokemon[]> => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    const data = await res.json();
    return data.results;
}

const fetchPokemonDetails = async(url:string) : Promise<PokemonDetail> => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}


function Home() {
    const[data, setData] = useState<Pokemon[]>([]);
    const[loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("")


    useEffect(()=>{
      const getPokemonData = async()=>{
          try{
            setLoading(true);
            const pokemonData = await fetchData();

            const pokemonWithImagesPromises = pokemonData.map(async(pokemon)=>{
                const details = await fetchPokemonDetails(pokemon.url);
                return {...pokemon, details};
            })

            const pokemonWithImages = await Promise.all(pokemonWithImagesPromises);

            setData(pokemonWithImages)
          }
          catch(error){
            console.log("Error Fetching Pokemon Data: ", error)
          }
          finally{
            setLoading(false);
          }
      }

      getPokemonData();
    }, [])

    const handleSearchChange = (value: string)=>{
      if(value != " ")
        setSearchTerm(value)
    }

    console.log(data);
  return (
    <div className='bg-gray-200 p-2 px-4'>
      
      <div className='w-full md:w-1/2 m-auto flex justify-center h-10 mt-10'>
        <h1>Explore Pokemon</h1>
      </div>
      
      {/* Searchbox */}
      <div className=''>
          <div className="mb-8">
              <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          </div>
      </div>

      {/* All Pokemons */}
        {
          loading? <LoadingSpinner/> : 
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-6 opacity-0 animate-fade-in">
            {data
            ?.filter((pokemon) =>
              pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((pokemon) => (
              <div key={pokemon.details?.id}>
                <PokemonCard pokemon={pokemon} />
              </div>
            ))}
          </div>
        }
    </div>
  )
}

export default Home;
