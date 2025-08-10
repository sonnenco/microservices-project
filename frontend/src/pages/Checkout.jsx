import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

// Import components
import CheckoutItemCard from "../components/CheckoutItemCard"

const Checkout = ({ shoppingCart, cartTotal, setCartTotal, setOnConfirmationScreen }) => {
    
    // Establish state to be used throughout application components
    const [state, setState] = useState("")
    const [taxAmount, setTaxAmount] = useState(0.00)
    const [hideShipping, setHideShipping] = useState(false)
    const [discountCode, setDiscountCode] = useState("")
    const [usedDiscountCode, setUsedDiscountCode] = useState(false)
    const [cartTotalBeforeDiscount, setCartTotalBeforeDiscount] = useState(0)

    // Establish US states data to be used in billing and shipping areas
    const statesData = [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
        'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
        'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
        'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
        'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

    // Establish handler functions for events
    const handleDiscountCodeChange = (event) => {
        setDiscountCode(event.target.value)
    }

    const handleDiscountCodeSubmit = async () => {
        try {
            console.log(discountCode)
            const response = await axios.post("http://localhost:40599/microservices/discount-code", {
                discountCode: discountCode
            })
            
            const result = response.data

            if (typeof result === "number") {
                const newCartTotal = cartTotal * result
                setCartTotalBeforeDiscount(cartTotal)
                setUsedDiscountCode(true)
                setCartTotal(newCartTotal)

                alert("Valid discount code used. Order subtotal has been updated.")
            }
            else {
                alert("Invalid discount code used.  Please try again.")
            }
            
        }
        catch (error) {
            console.error(error)
        }
    }

    const handleDiscountCodeRemove = async () => {
        setCartTotal(cartTotalBeforeDiscount)
        setUsedDiscountCode(false)
        setDiscountCode("")
        alert("Removed discount code from order.")
    }

    const handleStateChange = async (event) => {
        const newState = event.target.value
        setState(newState)
        getTaxAmount(newState)
    }

    const getTaxAmount = async (state) => {
        try {
            const subtotal = Number(parseFloat(cartTotal).toFixed(2))
            const response = await fetch("http://localhost:40599/microservices/calculate-tax", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ state, subtotal })
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }

            const result = await response.json()
            const value = result.tax_amount

            if (value !== undefined) {
                setTaxAmount(value)
                console.log("Successfully set value:", value)
            } else {
                console.log("Did not find 'tax_amount' in response")
            }

        }
        catch (error) {
            console.error("Failed to get tax amount:", error)
        }
    }
    
    const handleStockUpdate = async () => {
        for (const [productId, details] of Object.entries(shoppingCart)) {
            const quantity = details.quantity;

            await axios.post("http://localhost:40599/microservices/product-stock-update", {
                operation: "update",
                productId: Number(productId),
                amountPurchased: Number(quantity)
            });
            console.log(`Updated stock for productId #${productId}`);
        }

        console.log("Stock updated for all products!");
    }
    
    const handleCheckboxChange = (e) => {
        setHideShipping(e.target.checked)
    }

    return (
        <div className="flex flex-col space-y-6 my-10 lg:flex-row">
            
            {/* Back button */}
            <Link
                className="order-1 flex items-center justify-center h-10 w-10 rounded-full object-center mx-4 lg:mx-0 px-4 py-2 bg-sky-500/90 text-white font-semibold hover:bg-sky-100/90 hover:text-sky-500/90 transition shadow"
                to="/cart"
            >
                <span className="text-2xl">←</span>
            </Link>
            
            {/* Billing and shipping details */}
            <div className="order-3 lg:order-2 mt-8 lg:mt-0 flex flex-col w-auto lg:w-1/2 bg-gray-100 shadow-lg mx-4 p-8 rounded-lg">
                <div className="mb-4 italic">
                    Disclaimer: Payment details are not retained, validated or charged as this is a project for a university course.  It is not a requirement to input payment, billing or shipping details on this page to proceed.
                </div>
                <div className="font-bold">Billing</div>
                
                {/* Billing details */}
                <form>
                    
                    {/* Card number */}
                    <input
                        className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2"
                        type="text"
                        placeholder="Card number"
                    />
                    
                    {/* Expiration and security code */}
                    <div className="flex flex-row">
                        <input
                            className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2 w-1/2 mr-2"
                            type="text"
                            placeholder="Exp"
                        />
                        <input
                            className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2 w-1/2 ml-2"
                            type="text"
                            placeholder="Security code"
                        />
                    </div>
                    
                    {/* Name */}
                    <input
                        className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2"
                        type="text"
                        placeholder="Name"
                    />
                    
                    {/* Street */}
                    <input
                        className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2"
                        type="text"
                        placeholder="Street"
                    />
                    
                    {/* Apartment number */}
                    <input
                        className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2"
                        type="text"
                        placeholder="Apartment #"
                    />
                    
                    {/* City, state and zip */}
                    <div className="flex flex-row">
                        <input
                            className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2 w-1/3 mr-2"
                            type="text"
                            placeholder="City"
                        />

                        <select
                            className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2 w-1/2 mr-2"
                            onChange={handleStateChange}
                            value={state}
                            defaultValue=""
                        >
                            <option value="" disabled hidden>
                                State
                            </option>
                            {statesData.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                        <input
                            className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2 w-1/3 ml-2"
                            type="text"
                            placeholder="Zip code"
                        />
                    </div>
                    
                    {/* Checkbox to handle same shipping and billing address */}
                    <div className="flex flex-row items-center space-x-2 mb-6">
                        <input className="scale-120" type="checkbox" checked={hideShipping} onChange={handleCheckboxChange}/>
                        <label className="text-md">Shipping address same as billing</label>
                    </div>
                    
                    {/* Shipping details */}
                    {!hideShipping && (
                        <div>
                            <div className="font-bold">Shipping</div>
                            
                            {/* Name */}
                            <input
                                className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2"
                                type="text"
                                placeholder="Name"
                            />
                            
                            {/* Street */}
                            <input
                                className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2"
                                type="text"
                                placeholder="Street"
                            />
                            
                            {/* Apartment number */}
                            <input
                                className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2"
                                type="text"
                                placeholder="Apartment #"
                            />
                            
                            {/* City, state and zip */}
                            <div className="flex flex-row">
                                <input
                                    className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2 w-1/3 mr-2"
                                    type="text"
                                    placeholder="City"
                                />
                                
                                <select
                                    className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2 w-1/2 mr-2"
                                    defaultValue=""
                                >
                                    <option value="" disabled hidden>
                                        State
                                    </option>
                                    {statesData.map((state) => (
                                        <option key={state} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                                
                                <input
                                    className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2 w-1/3 ml-2"
                                    type="text"
                                    placeholder="Zip code"
                                />
                            </div>
                        </div>
                    )}
                </form>
                
                {/* Place order button */}
                <Link 
                    className="bg-sky-500/90 h-10 text-white font-semibold px-4 py-2 rounded-md mt-4 text-center hover:bg-sky-100/90 hover:text-sky-500/90 transition shadow"
                    to="/checkout/confirmation"
                    onClick={() => {setOnConfirmationScreen(true); handleStockUpdate();}}
                >
                    Place order
                </Link>
            </div>
            
            {/* Order summary and discount codes functionality */}
            <div className="order-2 lg:order-3 w-auto lg:w-1/2 bg-gray-100 shadow-lg mx-4 p-8 rounded-lg h-1/2">
                
                {/* Shopping cart items */}
                {Object.entries(shoppingCart).map(([productId, product]) => (
                    <CheckoutItemCard key={productId} product={product}/>
                ))}
                
                <div className="border w-full"/>
                
                <div className="flex flex-col space-y-6 mt-10">
                    
                    {/* Discounting code functionality */}
                    { !usedDiscountCode && (
                        <div className="flex justify-between">
                            <input
                                className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 mr-2"
                                type="text"
                                placeholder="Enter discount code..."
                                value={discountCode}
                                onChange={handleDiscountCodeChange}
                            />
                            <button
                                className="bg-sky-500/90 h-10 text-white font-semibold px-4 rounded-md text-center hover:bg-sky-100/90 hover:text-sky-500/90 transition shadow"
                                onClick={handleDiscountCodeSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    )}
                    { usedDiscountCode && (
                        <div className="flex justify-between items-center">
                            <div className="font-bold text-lg">Discount code applied:<br/>{discountCode}</div>
                            <button
                                className="bg-sky-500/90 h-10 text-white font-semibold px-4 rounded-md text-center hover:bg-sky-100/90 hover:text-sky-500/90 transition shadow"
                                onClick={handleDiscountCodeRemove}
                            >
                                Remove discount
                            </button>
                        </div>
                    )}
                    
                    <div className="border w-full"/>
                    
                    {/* Order subtotal, tax and total */}
                    <div className="flex flex-row justify-between">
                        <div className="text-xl font-bold text-left">Order Subtotal:</div>
                        <div className="text-xl text-left">${cartTotal.toFixed(2)}</div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div className="text-xl font-bold text-left">Order Tax:</div>
                        <div className="text-xl text-left">${taxAmount.toFixed(2)}</div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div className="text-xl font-bold text-left">Order Total:</div>
                        <div className="text-xl text-left">${(cartTotal + taxAmount).toFixed(2)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout