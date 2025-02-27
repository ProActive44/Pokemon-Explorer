'use client'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

const detailsPage = () => {
  const params = useParams();
  const id = params?.id as string | undefined

  return (
    <div>
      <h1>{id}</h1>
      Hey Pookie!!
    </div>
  )
}

export default detailsPage
