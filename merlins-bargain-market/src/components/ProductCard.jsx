import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
      <Link className="block">
        <img src={product.image} className="w-full h-60 object-cover rounded"/>
        <div className="mt-2">
          <h3 className="font-semibold text-gray-800">{product.name}</h3>
          <p className="text-sm font-bold mt-1">${product.price}</p>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard