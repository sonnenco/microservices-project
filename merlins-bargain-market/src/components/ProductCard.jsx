import AddToCart from './AddToCart'

const ProductCard = ({ product, onClick, handleAddToShoppingCart }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4" onClick={onClick}>
      <div className="block">
        <img src={product.image} className="w-full h-60 object-cover rounded"/>
        <div className="mt-2">
          <h3 className="font-semibold text-gray-800">{product.name}</h3>
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