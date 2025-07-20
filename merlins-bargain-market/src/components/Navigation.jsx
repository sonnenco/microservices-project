import { useState} from "react"
import { NavLink } from "react-router-dom"

const Navigation = () => {
    const [isActive, setIsActive] = useState(false)
    
    return (
        <div className="relative flex justify-between items-center h-16 mt-2 border-b-1">
        <div className="absolute font-semibold italic text-xs w-25">MERLIN'S BARGAIN MARKET 🪄</div>
        <nav className="mx-auto text-xl">
            <NavLink to="/" className="mx-4 italic font-bold hover:underline">
                HOME
            </NavLink>

            <NavLink to="/products" className="mx-4 italic font-bold hover:underline">
                PRODUCTS
            </NavLink>

            <NavLink to="/cart" className="absolute right-0">
                🛒
            </NavLink>
        </nav>
    </div>
    )
}

export default Navigation