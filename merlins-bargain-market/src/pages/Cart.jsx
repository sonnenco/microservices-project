import { useState } from "react"

const Cart = (shoppingCart) => {

  return (
    <pre>
      {JSON.stringify(shoppingCart, null, 2)}
    </pre>
  )
}

export default Cart