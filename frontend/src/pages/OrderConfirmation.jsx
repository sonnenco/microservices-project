import { Link } from 'react-router-dom'

const OrderConfirmation = ({ cartTotal, handleDeleteAllFromShoppingCart, setOnConfirmationScreen }) => {
    
    // Generate pseudo-random number to server as order number
    const orderId = Math.floor(Math.random() * (19999 - 10000 + 1) + 10000)

    return (
        <div className="mx-auto flex flex-col items-center space-y-4 bg-gray-100 rounded-lg shadow p-10 my-50">
            <div className="text-2xl font-bold">Thanks for your order!</div>
            <div className="border w-full mx-20"></div>
            <div>Order #: E{orderId}</div>
            <div>Order Total: ${cartTotal.toFixed(2)}</div>
            <Link className="bg-sky-500/90 text-white font-semibold px-2 py-1 rounded-md hover:bg-sky-100/90 hover:text-sky-500/90 transition shadow" to="/" onClick={() => { handleDeleteAllFromShoppingCart(); setOnConfirmationScreen(false); }}>Home page</Link>
        </div>
    )
}

export default OrderConfirmation