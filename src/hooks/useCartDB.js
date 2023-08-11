import { useContext } from 'react'
import { CartDBContext } from '../contexts/CartDB.jsx'

export const useCartDB = () => {
  const context = useContext(CartDBContext)

  if (context === undefined) {
    throw new Error('useCartDB must be used within a CartProvider')
  }

  return context
}