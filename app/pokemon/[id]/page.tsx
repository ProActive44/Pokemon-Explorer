'use client'
import { useParams, useRouter } from 'next/navigation'
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

const detailsPage = () => {
  const [data, setData] = useState<PokemonDetail>()
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params?.id as string

  useEffect(()=>{
    try{
      setLoading(true);
      const fetchPokemonDetails = async (id:string) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await res.json();
        setData(data);
      }
      fetchPokemonDetails(id);
    }
    catch(error){
      console.log("Error loading details: ", error)
    }
    finally{
      setLoading(false);
    }
  }, [])

  return (
    <div>
      <h1>{id}</h1>
      <h1>{data?.height}</h1>
      Hey Pookie!!
    </div>
  )
}

export default detailsPage
