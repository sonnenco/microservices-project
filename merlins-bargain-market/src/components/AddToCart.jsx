import { useState } from "react"

const AddToCart = () => {
    const [productQuantity, setProductQuantity] = useState(1)
  
    const incrementQuantity = () => {
        if (productQuantity < 5) {
            setProductQuantity(prev => prev + 1)
        }
    }

    const decrementQuantity = () => {
        if (productQuantity > 1) {
            setProductQuantity(prev => prev - 1)
        }
    }

    return (
        <div className="flex flex-row items-center text-sm font-bold">
            <div className="flex w-20 py-1 bg-gray-300 place-content-between px-3 text-md" onClick={(e) => { e.stopPropagation() }}>
                <button className="" type="button" onClick={(e) => { e.stopPropagation(); decrementQuantity(); }}>-</button>
                <span className="">{productQuantity}</span>
                <button className="" type="button" onClick={(e) => { e.stopPropagation(); incrementQuantity(); }}>+</button>
            </div>
            <button className="bg-sky-500/90 text-white px-2 py-1" type="button" onClick={(e) => e.stopPropagation()}>Add to cart</button>
        </div>
  )
}

export default AddToCart