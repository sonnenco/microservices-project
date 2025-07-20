import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import components
import Navigation from './components/Navigation'

// Import pages
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'

function App() {
  return (
    <div className="flex flex-col max-w-screen-xl w-full mx-auto px-4 md:px-10">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/cart" element={<Cart/>}/>
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
