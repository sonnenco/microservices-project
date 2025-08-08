import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

// Import components
import CheckoutItemCard from "../components/CheckoutItemCard"

const Checkout = ({ shoppingCart, cartTotal, setCartTotal, setOnConfirmationScreen }) => {
    const [state, setState] = useState(null)
    const [taxAmount, setTaxAmount] = useState(0.00)
    const [hideShipping, setHideShipping] = useState(false)
    const [discountCode, setDiscountCode] = useState("")
    const [usedDiscountCode, setUsedDiscountCode] = useState(false)
    const [cartTotalBeforeDiscount, setCartTotalBeforeDiscount] = useState(0)

    const handleDiscountCodeChange = (event) => {
        setDiscountCode(event.target.value)
    }

    const handleDiscountCodeSubmit = async () => {
        try {
            const response = await fetch("http://localhost:40599/microservices/discount-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ discountCode: discountCode })
            })

            if (!response.ok) {
                throw new Error (`Error: ${response.status}`)
            }
            
            const result = await response.json()

            if (typeof result === "number") {
                setCartTotalBeforeDiscount(cartTotal)
                setUsedDiscountCode(true)

                const newCartTotal = cartTotal * result
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
            const response = await fetch("http://localhost:40699/calculatetax", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "state": state, "subtotal": subtotal })
            })

            if (!response.ok) {
                throw new Error (`Error: ${response.status}`)
            }
            
            const result = await response.json()
            const value = result.tax_amount

            if (value !== undefined) {
                setTaxAmount(value)
                console.log("Successfully set value:", value)
            }
            else {
                console.log("Did not find 'tax_amount' in response")
            }
            
        }
        catch (error) {
            console.error(error)
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
        <Link
            className="order-1 flex items-center justify-center h-10 w-10 rounded-full object-center mx-4 lg:mx-0 px-4 py-2 bg-sky-500/90 text-white font-semibold hover:bg-sky-100/90 hover:text-sky-500/90 transition shadow"
            to="/cart"
        >
            <span className="text-2xl">←</span>
        </Link>
        <div className="order-3 lg:order-2 mt-8 lg:mt-0 flex flex-col w-auto lg:w-1/2 bg-gray-100 shadow-lg mx-4 p-8 rounded-lg">
            <div className="mb-4 italic">
                Disclaimer: Payment details are not retained, validated or charged as this is a project for a university course.  It is not a requirement to input payment, billing or shipping details on this page to proceed.
            </div>
            <div className="font-bold">Billing</div>
            <form>
                <input
                    className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2"
                    type="text"
                    placeholder="Card number"
                />
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
                <input
                    className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2"
                    type="text"
                    placeholder="Name"
                />
                <input
                    className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2"
                    type="text"
                    placeholder="Street"
                />
                <input
                    className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2"
                    type="text"
                    placeholder="Apartment #"
                />
                <div className="flex flex-row">
                    <input
                        className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2 w-1/3 mr-2"
                        type="text"
                        placeholder="City"
                    />
                    <select className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2 w-1/2 mr-2" value={state} onChange={handleStateChange}>
                        <option value="" disabled selected>State</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                    <input
                        className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2 w-1/3 ml-2"
                        type="text"
                        placeholder="Zip code"
                    />
                </div>
                <div className="flex flex-row items-center space-x-2 mb-6">
                    <input type="checkbox" checked={hideShipping} onChange={handleCheckboxChange}/>
                    <label className="text-sm">Shipping address is same as billing (no need to enter twice!)</label>
                </div>
                {!hideShipping && (
                    <div>
                        <div className="font-bold">Shipping</div>
                    <input
                        className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2"
                        type="text"
                        placeholder="Name"
                    />
                    <input
                        className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2"
                        type="text"
                        placeholder="Street"
                    />
                    <input
                        className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2"
                        type="text"
                        placeholder="Apartment #"
                    />
                    <div className="flex flex-row">
                        <input
                            className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2 w-1/3 mr-2"
                            type="text"
                            placeholder="City"
                        />
                        <select className="bg-white border rounded-lg h-10 pl-3 w-full mb-4 my-2 w-1/2 mr-2">
                            <option value="" disabled selected>State</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
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
            <Link 
                className="bg-sky-500/90 h-10 text-white font-semibold px-4 py-2 rounded-md mt-4 text-center hover:bg-sky-100/90 hover:text-sky-500/90 transition shadow"
                to="/checkout/confirmation"
                onClick={() => {setOnConfirmationScreen(true); handleStockUpdate();}}
            >
                Place order
            </Link>
        </div>
        <div className="order-2 lg:order-3 w-auto lg:w-1/2 bg-gray-100 shadow-lg mx-4 p-8 rounded-lg h-1/2">
            {Object.entries(shoppingCart).map(([productId, product]) => (
                <CheckoutItemCard key={productId} product={product}/>
            ))}
            <div className="border w-full"/>
            <div className="flex flex-col space-y-6 mt-10">
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