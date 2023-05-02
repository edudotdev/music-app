import { getFavorites } from '@/services/likes'
import { TRACK } from '@/types'
import { useEffect, useState } from 'react'

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<TRACK[]>()

  useEffect(() => {
    handleFavorites()
  }, [])

  const handleFavorites = async () => {
    const data = await getFavorites()
    setFavorites(data)
  }

  return { favorites }
}
