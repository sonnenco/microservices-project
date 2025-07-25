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

function App() {  
  const [shoppingCart, setShoppingCart] = useState({})

  const handleAddToShoppingCart = (product) => {    
    setShoppingCart(prevCart => {
      if (prevCart[product.id]) {
        //console.log(`${product.name} is already in the cart.`)
        //console.log(`This is the current cart: ${JSON.stringify(shoppingCart, null, 2)}`)
        return prevCart
      }
      
      return {
        ...prevCart, [product.id]: product
      }
    })
  }

  const handleDeleteFromShoppingCart = (productId) => {
    const newShoppingCart = { ...shoppingCart }
    delete newShoppingCart[productId]
    setShoppingCart(newShoppingCart)
  }

  return (
    <div className="flex flex-col max-w-screen-xl w-full mx-auto px-4 md:px-10">
      <Router>
        <Navigation />
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
            element={<Cart shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} handleDeleteFromShoppingCart={handleDeleteFromShoppingCart}/>}
          />
          <Route
            path="/products/:productId"
            element={<ProductDetails handleAddToShoppingCart={handleAddToShoppingCart}/>}
          />
        </Routes>
      </Router>

      <footer className="text-center my-4 pt-2 border-t-1 italic">
        <div>Lightly sketched in Figma and built using React + Tailwind CSS</div>
        <div className="mt-2">Colin Sonnenberg 2025</div>
      </footer>
    </div>
  )
}

export default App
