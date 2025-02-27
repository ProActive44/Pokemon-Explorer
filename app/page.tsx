'use client'
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

type Pokemon = {
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

    console.log(data);
  return (
    <div>
      <h1>Explore Pokemon</h1>
      <ul>
        {data?.map((pokemon, index)=>{
          return <li key={index}>
              <div>
                <h3>{pokemon.name}</h3>
                <img src={pokemon.details.sprites.front_default}/>
              </div>
            </li>
        })}
      </ul>
    </div>
  )
}

export default Home;
