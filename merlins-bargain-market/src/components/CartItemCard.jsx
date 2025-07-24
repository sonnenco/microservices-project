

const CartItemCard = ({ product }) => {

    return (
        <div className="flex flex-row items-center w-7/10 border rounded-lg px-10 py-4 my-8">
            <img src={product.image} className="h-30 rounded-lg"/>
            <div className="flex flex-row ml-10 space-x-10">
                <div className="font-bold">{product.name}</div>
                <div className="">${product.price}</div>
                <div>{product.quantity}</div>
            </div>
        </div>
  )
}

export default CartItemCard