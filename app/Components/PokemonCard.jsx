import Link from 'next/link'
import React from 'react'

const PokemonCard = ({pokemon}) => {

    return (
        <Link href={`/pokemon/${pokemon.details.id}`} >
        <div className='border border-gray-950 p-1 bg-blue-400 rounded flex flex-col m-auto'>

          {/* Pokemon Image */}
          <div>
            <img src={pokemon.details.sprites.front_default} className='w-full'/>
          </div>
          
          {/* Pokemon Name*/}
          <div className='m-auto'>
            <h3 >{pokemon.name}</h3>
          </div>
        </div>
      </Link>
  )
}

export default PokemonCard
