import { useState } from "react"

const AddToCart = ({product, handleAddToShoppingCart, stock}) => {
    const [productQuantity, setProductQuantity] = useState(1)
  
    const incrementQuantity = () => {
        console.log("Increasing item quantity.")
        if (productQuantity < stock) {
            setProductQuantity(prev => prev + 1)
        }
    }

    const decrementQuantity = () => {
        console.log("Decreasing item quantity.")
        if (productQuantity > 1) {
            setProductQuantity(prev => prev - 1)
        }
    }

    return (
        <div>
            { stock === "N/A" ? "Out of stock!" :
            <div className="flex flex-row items-center text-sm font-bold">
                <div className="flex w-20 py-1 bg-gray-300 place-content-between px-3 text-md" onClick={(e) => { e.stopPropagation() }}>
                    <button className="" type="button" onClick={(e) => { e.stopPropagation(); decrementQuantity(); }}>-</button>
                    <span className="">{productQuantity}</span>
                    <button className="" type="button" onClick={(e) => { e.stopPropagation(); incrementQuantity(); }}>+</button>
                </div>
                <button
                    className="bg-sky-500/90 text-white px-2 py-1 hover:bg-sky-100/90 hover:text-sky-500/90 transition"
                    type="button"
                    onClick={ (e) => {e.stopPropagation()
                        handleAddToShoppingCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            quantity: productQuantity
                        })
                    }}
                >
                    Add to cart
                </button>
            </div>
            }
        </div>
  )
}

export default AddToCart