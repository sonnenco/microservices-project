import { useState } from "react"
import { useNavigate } from "react-router-dom"

import ProductCard from "../components/ProductCard"

const Products = ({ handleAddToShoppingCart }) => {
  // Enable navigation to product detail pages
  const navigate = useNavigate()

  const handleCardClick = (product) => {
    navigate(`/products/${product.id}`, {state: { product }})
  }
  
  const products = [
    {
      id: "1",
      name: "Amateur Wand",
      price: "25",
      category: "Wands",
      image: "/amateur-wand.png",
      description: "Everyone has to start somewhere! Capable of casting beginner-level spells.",
      disclaimer: "Casting spells of intermediate difficult or above may result in an explosive blast and complaints from neighbors.  Please consult your spell encyclopedia for more information."
    },
    {
      id: "2",
      name: "Love Potion",
      price: "10",
      category: "Potions",
      image: "/love-potion.png",
      description: "It's difficult to find love in modern times.  Why not make it easier?  Merlin's love potion can help.",
      disclaimer: "Soulmate may not be human.  Known to match-make with dragons and goblins."
    },
    {
      id: "3",
      name: "Infinite Pocket Robes",
      price: "30",
      category: "Robes",
      image: "/infinite-pocket-robes.png",
      description: "Are you out exploring for mystical items, but find your pockets full? No more! Infinite pocket robes guarantee that you will always have more space.",
      disclaimer: "It's up to you to keep track of what you put in which pocket.  You may find items several centuries later."
    },
    {
      id: "4",
      name: "Cooking Spellbook",
      price: "20",
      category: "Books",
      image: "/cooking-spellbook.png",
      description: "Tired of wasting away in the kitchen after a long day? Never fear, Merlin has the solution! This spellbook teaches a variety of incancations so your pots and pans can do all the work themselves.",
      disclaimer: "Spells currently limited to ballpark food.  Merlin is in his hot dog era."
    },
    {
      id: "5",
      name: "Crystal of Luck",
      price: "15",
      category: "Clearance",
      image: "/crystal-of-luck.png",
      description: "If you're feeling a bit unlucky, then this is the product for you! Merlin's powerful luck crystals are guaranteed to improve your quality of life!",
      disclaimer: "Will only improve luck for minor life events, such as finding loose change in your coach or a lost sock."
    },
    {
      id: "6",
      name: "Parking Space Crystal Ball",
      price: "5",
      category: "Clearance",
      image: "/parking-space-crystal-ball.png",
      description: "Sourced from the finest mines, this crystal ball has been enchanted by Merlin himself to glow when an open parking spot is within a 100 foot radius.",
      disclaimer: "Product may induce hunger and interfere with FM radio.  Merlin's Bargain Market is not liable for these effects."
    }
  ]
  
  const productCategories = ["Wands", "Potions", "Robes", "Books", "Clearance"]

  // Enable filtering and searching 
  const [selectedCategories, setSelectedCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const handleFilterChange = (category) => {
    setSelectedCategories((prevSelected) => 
      prevSelected.includes(category) ? prevSelected.filter((c) => c !== category) : [...prevSelected, category]
    )
  }

  const handleSearchChange = (search) => {
    setSearchTerm(search.target.value)
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategories.length == 0 || selectedCategories.includes(product.category)

    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesCategory && matchesSearch
  })

  // Enable filters pane to show on mobile interaction
  const [showFilters, setShowFilters] = useState(false)

  const toggleFilters = () => setShowFilters(!showFilters)

  return (
    <div className="flex flex-col mt-4 lg:flex-row lg:space-x-10">
      {/* Desktop filter */}
      <div className="hidden lg:block lg:w-1/5">
        <div className="text-2xl font-bold mb-4">Categories</div>
        <div className="space-y-2">
          {productCategories.map((category) => (
            <label className="flex items-center space-x-3" key={category}>
              <input
                className="w-5 h-5"
                type="checkbox"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleFilterChange(category)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Main page content */}
      <div className="">
        {/* Mobile filters */}
        <div className="block lg:hidden mb-4">
          <div className="flex flex-col sm:items-start sm:space-x-4 space-y-2 sm:space-y-0">
            <button
              className="border rounded-lg px-4 py-2 bg-sky-500/90 text-white font-semibold w-full"
              onClick={toggleFilters}
            >
            <div>
              {!showFilters ? "FILTERS ↓" : "FILTERS ↑"}
            </div>
            </button>
            {showFilters && (
              <div className="mt-2 space-y-2">
                {productCategories.map((category) => (
                  <label className="flex items-center space-x-3" key={category}>
                    <input
                      className="w-5 h-5"
                      type="checkbox"
                      value={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleFilterChange(category)}
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product catalog and search*/}
        <div>
          <input
            className="border rounded-lg h-10 pl-3 w-full mb-4"
            type="text"
            placeholder="Search products by name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-4">
            {filteredProducts.map((product) => (
              <ProductCard product={product} onClick={() => handleCardClick(product)} handleAddToShoppingCart={handleAddToShoppingCart}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products