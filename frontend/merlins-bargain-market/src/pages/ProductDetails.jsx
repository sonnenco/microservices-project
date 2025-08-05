import { Link, useLocation } from 'react-router-dom'
import AddToCart from '../components/AddToCart'
import { useState, useEffect } from 'react'
import axios from 'axios'

const ProductDetails = ({ handleAddToShoppingCart }) => {
    // Receive product data from Product.jsx
    const location = useLocation()
    const { product } = location.state

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
        <div className="flex flex-col my-10 items-center md:flex-row">
            <div className="w-auto space-y-6 md:w-1/2">
                <Link className="flex items-center justify-center w-12 rounded-full object-center px-4 py-2 bg-sky-500/90 text-white font-semibold hover:bg-sky-100/90 hover:text-sky-500/90 transition shadow" to="/products">
                    <span className="text-2xl">←</span>
                </Link>
                <img src={product.image} className="h-130 w-130 object-cover rounded"/>
            </div>
            <div className="w-auto md:ml-8 mt-8 px-4 md:mt-0 space-y-6 md:w-1/2">
                <div className="text-4xl font-semibold">{product.name}</div>
                <div className="text-2xl">${product.price}</div>
                <div className="text-xl">{product.category}</div>
                <div className="text-xl">Stock: {stock === null ? "Loading..." : stock}</div>
                <div className="text-lg space-y-4">
                    <div>{product.description}</div>
                    <div className="italic">Disclaimer: {product.disclaimer}</div>
                </div>
                <AddToCart product={product} handleAddToShoppingCart={handleAddToShoppingCart} stock={stock}/>
            </div>
        </div>
    )
}

export default ProductDetails