const express = require("express")
const zmq = require("zeromq")
const cors = require("cors")

const app = express()
app.use(cors())
const port = 40599

app.get("/microservices/product-stock/:productId", async (req, res) => {
    const productId = req.params.productId
    const socket = new zmq.Request()
    
    try {
        await socket.connect("tcp://localhost:40799")
        await socket.send(JSON.stringify({ operation: "read", productId }))
        const [message] = await socket.receive()
        const parsedMessage = JSON.parse(message.toString())
        res.json(parsedMessage)
    }
    catch (error) {
        console.error("Error in product-stock microservice call:", error)
        res.status(500).json({ error: "Failed to retrieve stock" })
    }
    finally {
        await socket.close()
    }
})

app.listen(port, () => {
    console.log("Backend server is listening on port 40599...")
})