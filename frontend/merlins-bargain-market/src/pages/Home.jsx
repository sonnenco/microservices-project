const Home = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row my-10 space-y-10 lg:my-30 md:mx-10 lg:mx-20">
        {/* Left side */}
        <div className="lg:w-1/2 px-4">
          <div className="underline font-bold">Overview</div>
          <div>Merlin's Bargain Market is a tongue-in-cheeck project developed by Colin Sonnenberg for CS 361 at Oregon State University.</div>
          <br />
          <div className="underline font-bold">How to use</div>
          <ol>
            <li>1. Browse the product catalog</li>
            <li>2. View product details</li>
            <li>3. Add product(s) to cart</li>
            <li>4. View shopping cart summary</li>
            <li>5. Checkout</li>
            <li>6. Receive order confirmation</li>
          </ol>
        </div>

        {/* Right side */}
        <div className="lg:w-1/2 px-4">
          <div className="underline font-bold">Citations</div>
          <div>Icons used in this project are unicode hex characters and therefore do not require attribution.</div>
          <br />
          <div>Images used:</div>
          <div>
            <ul className="list-disc pl-5">
              <li className="hover:underline">
                <a href="https://unsplash.com/photos/wand-and-dried-rose-flowers-on-white-textile-nYaGH9t4wak" target="_blank">Amateur Wand</a>
              </li>
              <li className="hover:underline">
                <a href="https://unsplash.com/photos/man-in-black-hoodie-standing-on-snow-covered-ground-during-daytime-UScFXZ0CeR0" target="_blank">Infinite Pocket Robes</a>
              </li>
              <li className="hover:underline">
                <a href="https://unsplash.com/photos/a-glass-vase-with-a-red-liquid-inside-of-it-MqZ-46_4I4Q" target="_blank">Love Potion</a>
              </li>
              <li className="hover:underline">
                <a href="https://unsplash.com/photos/a-drawing-of-an-open-book-on-a-table-LS8FaYadYXw" target="_blank">Cooking Spellbook</a>
              </li>
              <li className="hover:underline">
                <a href="https://unsplash.com/photos/clear-glass-diamond-on-white-background-H4RMEqnl-lM" target="_blank">Crystal of Luck</a>
              </li>
              <li className="hover:underline">
                <a href="https://unsplash.com/photos/a-blue-and-white-glass-object-on-a-white-surface-9P2L_HJaWTY" target="_blank">Parking Space Crystal Ball</a>
              </li>
            </ul>
            <br />
            <div>All images are free to use under the <a className="hover:underline" href="https://unsplash.com/license" target="_blank">Unsplash License</a>.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home