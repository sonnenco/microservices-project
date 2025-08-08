const express = require("express")
const zmq = require("zeromq")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())
const port = 40599

app.post("/microservices/discount-code", async (req, res) => {
    const discountCode = req.body.discountCode
    const socket = new zmq.Request()
    console.log("discountCode from body:", discountCode)
    
    try {
        await socket.connect("tcp://localhost:40899")
        await socket.send(JSON.stringify({ discountCode }))
        const [message] = await socket.receive()
        console.log("ZMQ response:", message.toString())
        const parsedMessage = JSON.parse(message.toString())
        res.status(200).json(parsedMessage)
    }
    catch (error) {
        console.error("Error in discount-code microservice call:", error)
        res.status(500).json({ error })
    }
    finally {
        await socket.close()
    }
})

app.get("/microservices/product-stock/:productId", async (req, res) => {
    const productId = req.params.productId
    const socket = new zmq.Request()
    
    try {
        await socket.connect("tcp://localhost:40799")
        await socket.send(JSON.stringify({ operation: "read", productId }))
        const [message] = await socket.receive()
        const parsedMessage = JSON.parse(message.toString())
        res.status(200).json(parsedMessage)
    }
    catch (error) {
        console.error("Error in product-stock microservice call:", error)
        res.status(500).json({ error })
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
        res.status(200).json(parsedMessage)
    }
    catch (error) {
        console.error("Error in product-stock-update microservice call:", error)
        res.status(500).json({ error })
    }
    finally {
        await socket.close()
    }
})

app.listen(port, () => {
    console.log("Backend server is listening on port 40599...")
})