import { useState, useEffect } from 'react'
import AddToCart from './AddToCart'
import axios from "axios"

const ProductCard = ({ product, onClick, handleAddToShoppingCart }) => {
  // Load product stock data from microservice
  const [stock, setStock] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const readStock = async () => {
      try {
        const response = await axios.get(`http://localhost:40599/microservices/product-stock/${product.id}`)
        console.log("response: ", response)
        setStock(response.data)
      }
      catch (error) {
        console.error("Failed to retrieve product stock:", error)
        setStock("N/A")
      }
      finally {
        setLoading(false)
      }
    }
    readStock()
  }, [product.id])
  
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4" onClick={onClick}>
      <div className="block">
        <img src={product.image} className="w-full h-60 object-cover rounded"/>
        <div className="mt-2">
          <h3 className="font-semibold text-gray-800">{product.name}</h3>
          <p>Stock: {stock === null ? "Loading..." : stock}</p>
          <div className="flex flex-row justify-between mt-2 items-center">
            <p className="text-sm font-bold">${product.price}</p>
            <AddToCart product={product} onClick={((e) => e.stopPropagation())} handleAddToShoppingCart={handleAddToShoppingCart}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard