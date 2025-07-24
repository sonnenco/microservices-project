import { useState } from "react"

// Import components
import CartItemCard from "../components/CartItemCard"

const Cart = (shoppingCart) => {
  return (
    <div>
      <div className="my-10">
        {Object.entries(shoppingCart).map(([outerId, outer]) => 
          Object.entries(outer).map(([productId, product]) => {
            console.log("Cart.jsx:", product)
            return <CartItemCard key={productId} product={product}/>
          }) 
        )}
      </div>
    </div>
  )
}

export default Cart