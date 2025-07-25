// Import components
import CartItemCard from "../components/CartItemCard"

const Cart = ({ shoppingCart, setShoppingCart, handleDeleteFromShoppingCart }) => {

  const incrementQuantity = (productId) => {
    setShoppingCart((prevCart) => {
      const product = prevCart[productId]
      
      if (product.quantity === 5) return prevCart
      
      return {...prevCart, [productId]: {
        ...product, quantity: product.quantity + 1
  }}})}

  const decrementQuantity = (productId) => {
    setShoppingCart((prevCart) => {
      const product = prevCart[productId]
      
      if (product.quantity === 1) return prevCart

      return {...prevCart, [productId]: {
        ...product, quantity: product.quantity - 1
  }}})}

  return (
    <div>
      <div className="my-10">
        {Object.entries(shoppingCart).map(([productId, product]) => (
          <CartItemCard key={productId} product={product} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} handleDeleteFromShoppingCart={handleDeleteFromShoppingCart}/>
        ))}
      </div>
    </div>
  )
}

export default Cart