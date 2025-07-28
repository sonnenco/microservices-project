import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import components
import Navigation from './components/Navigation'

// Import pages
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'

function App() {  
  const [shoppingCart, setShoppingCart] = useState({})
  const [cartTotal, setCartTotal] = useState(0.00)
  const [onConfirmationScreen, setOnConfirmationScreen] = useState(false)
  const [hideCheckoutButton, setHideCheckoutButton] = useState(true)

  const handleAddToShoppingCart = (product) => {    
    setShoppingCart(prevCart => {
      if (prevCart[product.id]) {
        return prevCart
      }
      return {
        ...prevCart, [product.id]: product
    }})
    setCartTotal(prevCartTotal => {
      return prevCartTotal + (product.price * product.quantity)
    })
    setHideCheckoutButton(false)
  }

  const handleDeleteFromShoppingCart = (product) => {
    const newShoppingCart = { ...shoppingCart }
    delete newShoppingCart[product.id]
    setShoppingCart(newShoppingCart)
    setCartTotal(prevCartTotal => {
      return prevCartTotal - (product.price * product.quantity)
    })
  }

  const handleDeleteAllFromShoppingCart = () => {
    setShoppingCart({})
    setCartTotal(0)
    setHideCheckoutButton(true)
  }

  return (
    <div className="flex flex-col max-w-screen-xl w-full mx-auto px-4 md:px-10">
      <Router>
        {!onConfirmationScreen && (<Navigation />)}
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/products"
            element={<Products handleAddToShoppingCart={handleAddToShoppingCart}/>}
          />
          <Route
            path="/cart"
            element={<Cart shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} handleDeleteFromShoppingCart={handleDeleteFromShoppingCart} handleDeleteAllFromShoppingCart={handleDeleteAllFromShoppingCart} cartTotal={cartTotal} setCartTotal={setCartTotal} hideCheckoutButton={hideCheckoutButton}/>}
          />
          <Route
            path="/products/:productId"
            element={<ProductDetails handleAddToShoppingCart={handleAddToShoppingCart}/>}
          />
          <Route
            path="/checkout"
            element={<Checkout shoppingCart={shoppingCart} cartTotal={cartTotal} setOnConfirmationScreen={setOnConfirmationScreen}/>}
          />
          <Route
            path="/checkout/confirmation"
            element={<OrderConfirmation cartTotal={cartTotal} handleDeleteAllFromShoppingCart={handleDeleteAllFromShoppingCart} setOnConfirmationScreen={setOnConfirmationScreen}/>}
          />
        </Routes>
      </Router>
      {!onConfirmationScreen && (
        <footer className="text-center my-4 pt-2 border-t-1 italic">
          <div>Mocked in Figma and built using React + Tailwind CSS</div>
          <div className="mt-2">Colin Sonnenberg 2025</div>
        </footer>
      )}
    </div>
  )
}

export default App
