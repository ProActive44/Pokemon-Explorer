import Link from 'next/link'
import React from 'react'

const PokemonCard = ({pokemon}) => {

    return (
        <Link href={`/pokemon/${pokemon.details.id}`}>
        <div>
          <h3>{pokemon.name}</h3>
          <img src={pokemon.details.sprites.front_default}/>
        </div>
      </Link>
  )
}

export default PokemonCard
