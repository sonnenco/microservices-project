import { useState } from "react"

const CartItemCard = ({ product, incrementQuantity, decrementQuantity, handleDeleteFromShoppingCart }) => {

    return (
        <div className="flex flex-row items-center w-7/10 border-gray-100 bg-gray-100 rounded-xl my-8">
            <div className="flex flex-1 items-center justify-between space-x-4">
                <img src={product.image} className="w-30 h-30 object-cover rounded-lg"/>
                <div className="flex flex-1 items-center justify-center px-4">{product.name}</div>
                <div className="flex flex-1 items-center justify-center px-4">${product.price}</div>
                <div className="flex py-1 bg-gray-300 place-content-between text-md space-x-4 px-3" onClick={(e) => { e.stopPropagation() }}>
                    <button className="" type="button" onClick={(e) => { e.stopPropagation(); decrementQuantity(product.id); }}>-</button>
                    <span className="">{product.quantity}</span>
                    <button className="" type="button" onClick={(e) => { e.stopPropagation(); incrementQuantity(product.id); }}>+</button>
                </div>
                <div className="flex flex-1 items-center justify-center px-4" onClick={(e) => { e.stopPropagation(); handleDeleteFromShoppingCart(product.id); }}>🗑</div>
            </div>
        </div>
  )
}

export default CartItemCard