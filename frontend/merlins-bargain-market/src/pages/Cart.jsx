import { Link } from "react-router-dom"

// Import components
import CartItemCard from "../components/CartItemCard"

const Cart = ({ shoppingCart, setShoppingCart, handleDeleteFromShoppingCart, handleDeleteAllFromShoppingCart, cartTotal, setCartTotal, hideCheckoutButton }) => {

  const incrementQuantity = (product) => {   
    setShoppingCart((prevCart) => {
      const productObj = prevCart[product.id]

      return {...prevCart, [product.id]: {
        ...product, quantity: product.quantity + 1}
      }}
    )
    setCartTotal(prevCartTotal => {
      console.log("Prev cart total:", prevCartTotal)
      return prevCartTotal + product.price
    })
  }

  const decrementQuantity = (product) => {    
    setShoppingCart((prevCart) => {
      const productObj = prevCart[product.id]
      
      if (productObj.quantity === 1) return prevCart

      return {...prevCart, [product.id]: {
        ...product, quantity: product.quantity - 1}
      }}
    )
    setCartTotal(prevCartTotal => {
      console.log("Prev cart total:", prevCartTotal)
      return prevCartTotal - product.price
    })
  }

  return (
      <div className="flex flex-col lg:flex-row my-10 mx-4 lg:mx-0">
        <div className="w-auto lg:w-7/10 flex flex-col">
          <button className="bg-sky-500/90 text-white font-semibold px-2 py-2 rounded-md shadow hover:bg-sky-100/90 hover:text-sky-500/90 transition" type="button" onClick={(e) => { e.stopPropagation(); handleDeleteAllFromShoppingCart(); }}>🗑 Remove all items from cart</button>
          <div className="text-center my-2 italic font-semibold">Warning: The above action is irreversible.</div>
          {Object.entries(shoppingCart).map(([productId, product]) => (
            <CartItemCard key={productId} product={product} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} handleDeleteFromShoppingCart={handleDeleteFromShoppingCart}/>
          ))}
        </div>
        <div className="flex flex-col w-auto lg:w-3/10 bg-gray-100 rounded-lg items-center lg:ml-10 px-6 py-10 space-y-10 max-h-150 shadow-lg">
          <div className="text-xl font-bold">Order Total: ${cartTotal.toFixed(2)}</div>
          <div className="border w-full"/>
          <div>"Shipping is free - my enchanted parcels will fly straight to your delivery address!" - Merlin</div>
          <div className="italic">Disclaimer: Merlin's Bargain Market does not offer refunds based on the shipment's arrived condition.  Enchanted shipments are known to fly through storms and tears in the space-time-continuum.</div>
          {!hideCheckoutButton && (
            <Link 
              className="bg-sky-500/90 text-white font-semibold px-2 py-1 rounded-md hover:bg-sky-100/90 hover:text-sky-500/90 transition shadow"
              to="/checkout"
            >
              Proceed to checkout
            </Link>
          )}
        </div>
      </div>
  )
}

export default Cart