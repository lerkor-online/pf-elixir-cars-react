import { useReducer, createContext } from 'react'
import { cartReducer, cartInitialState } from '../reducers/cart.js'

export const CartDBContext = createContext()

function useCartDBReducer () {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCartDB = product => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })

  const removeFromCartDB = product => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })

  const clearCartDB = () => dispatch({ type: 'CLEAR_CART' })

  return { state, addToCartDB, removeFromCartDB, clearCartDB }
}

// la dependencia de usar React Context
// es MÍNIMA
export function CartDBProvider ({ children }) {
  const { state, addToCartDB, removeFromCartDB, clearCartDB } = useCartDBReducer()

  return (
    <CartDBContext.Provider value={{
      cart: state,
      addToCartDB,
      removeFromCartDB,
      clearCartDB
    }}
    >
      {children}
    </CartDBContext.Provider>
  )
}