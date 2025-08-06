const express = require("express")
const zmq = require("zeromq")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())
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

app.post("/microservices/product-stock-update", async (req, res) => {
    const { operation, productId, amountPurchased } = req.body
    const socket = new zmq.Request()
    
    try {
        await socket.connect("tcp://localhost:40799")
        await socket.send(JSON.stringify({ operation, productId, amountPurchased }))
        const [message] = await socket.receive()
        const parsedMessage = JSON.parse(message.toString())
        res.json(parsedMessage)
    }
    catch (error) {
        console.error("Error in product-stock-update microservice call:", error)
        res.status(500).json({ error: "Failed to update stock" })
    }
    finally {
        await socket.close()
    }
})

app.listen(port, () => {
    console.log("Backend server is listening on port 40599...")
})