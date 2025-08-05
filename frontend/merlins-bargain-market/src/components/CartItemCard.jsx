import { useState, useEffect } from "react"
import axios from "axios"

const CartItemCard = ({ product, incrementQuantity, decrementQuantity, handleDeleteFromShoppingCart }) => {
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
        <div className="flex flex-row items-center border-gray-100 bg-gray-100 rounded-xl my-4 shadow-lg">
            <div className="flex flex-1 items-center justify-between space-x-4">
                <img src={product.image} className="w-30 h-30 object-cover rounded-lg"/>
                <div className="flex flex-1 items-center justify-center px-3">{product.name}</div>
                <div className="flex flex-1 items-center justify-center px-3">${product.price}</div>
                <div className="flex flex-1 items-center justify-center px-3">Stock: {stock === null ? "Loading..." : stock}</div>
                <div className="flex py-1 bg-gray-300 place-content-between text-md space-x-4 px-3" onClick={(e) => { e.stopPropagation() }}>
                    <button className="" type="button" onClick={(e) => { e.stopPropagation(); if (product.quantity > 1) {decrementQuantity(product)}; }}>-</button>
                    <span className="">{product.quantity}</span>
                    <button className="" type="button" onClick={(e) => { e.stopPropagation(); if (product.quantity < stock) {incrementQuantity(product)}; }}>+</button>
                </div>
                <div className="flex flex-1 items-center justify-center px-3" onClick={(e) => { e.stopPropagation(); handleDeleteFromShoppingCart(product); }}>🗑</div>
            </div>
        </div>
    )
}

export default CartItemCard