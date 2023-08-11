import './Cart.css'

import { useId } from 'react'
import { CartIcon, ClearCartIcon } from './Icons.jsx'
import { useCart } from '../../hooks/useCart.js'

function CartItem ({ brand, precio, imageUrl, presentation, title, quantity, addToCart, removeFromCart }) {
  return (
    <div>
      <div className='flex gap-3 justify-center items-center'>
        <img
          src={imageUrl}
          alt={title}
        />

          <strong>{brand.name}</strong>
          <strong>{presentation}</strong>

          <strong>{precio}</strong> - USD{precio}
      </div>

      {/* <footer>
        <small>
          Qty: {quantity}
        </small>
        <button onClick={addToCart}>+</button>
        <button onClick={removeFromCart}>-</button>
      </footer> */}
    </div>
  )
}

export default function Cart () {
  const cartCheckboxId = useId()
  const { cart, clearCart, addToCart } = useCart()

  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />

      <aside className='cart'>
        <ul>
          {cart.map(product => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              {...product}
            />
          ))}
        </ul>

        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  )
}