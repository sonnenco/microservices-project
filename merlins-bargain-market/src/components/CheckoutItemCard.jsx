import React from 'react'

const CheckoutItemCard = ({ product }) => {
  return (
    <div className="flex flex-row items-center border-gray-100 bg-white rounded-xl my-4">
        <div className="flex flex-1 items-center justify-between space-x-4">
            <img src={product.image} className="w-20 h-20 object-cover rounded-lg"/>
            <div className="flex flex-1 mx-4">
                <div className="flex flex-1 justify-start items-center">{product.name}</div>
                <div className="flex flex-1 justify-end items-center">${product.price}</div>
                <div className="flex flex-1 justify-center items-center">x{product.quantity}</div>
            </div>
        </div>
    </div>
  )
}

export default CheckoutItemCard