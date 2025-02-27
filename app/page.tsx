'use client'
import React, { useEffect, useState } from 'react'

type Pokemon = {
  name: string,
  url: string,
  image: string
}

const fetchData = async() : Promise<Pokemon[]> => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    const data = await res.json();
    return data.results;
}

const fetchPokemonDetails = async(url:string) : Promise<string> => {
    const res = await fetch(url);
    const data = await res.json();
    return data.sprites.front_default;
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
                const image = await fetchPokemonDetails(pokemon.url);
                return {...pokemon, image};
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
      <h1>Pokemon List</h1>
      <ul>
        {data?.map((pokemon, index)=>{
          return <li key={index}>
              <div>
                <h3>{pokemon.name}</h3>
                <img src={pokemon.image}/>
              </div>
            </li>
        })}
      </ul>
    </div>
  )
}

export default Home;
