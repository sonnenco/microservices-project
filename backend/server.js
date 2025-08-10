const express = require("express")
const zmq = require("zeromq")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())
const port = 40599

// Microservice A
app.post("/microservices/calculate-tax", async (req, res) => {
    const { state, subtotal } = req.body
    
    try {
        const response = await fetch("http://localhost:40699/calculatetax", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ state, subtotal })
        })

        if (!response.ok) {
            throw new Error(`Tax service responded with status ${response.status}`)
        }

        const data = await response.json()
        res.status(200).json(data)
    } catch (error) {
        console.error("Error calling tax service:", error)
        res.status(500).json({ error: "Failed to calculate tax" })
    }
})

// Microservice B
app.get("/microservices/product-returns/:productId", async (req, res) => {
    const productId = req.params.productId
    const socket = new zmq.Request()
    
    try {
        await socket.connect("tcp://localhost:40999")
        await socket.send(JSON.stringify({ "productId": productId }))
        const [message] = await socket.receive()
        const parsedMessage = JSON.parse(message.toString())
        res.status(200).json(parsedMessage)
    }
    catch (error) {
        console.error("Error in product-returns microservice call:", error)
        res.status(500).json({ error })
    }
    finally {
        await socket.close()
    }
})

// Microservice C
app.post("/microservices/discount-code", async (req, res) => {
    const discountCode = req.body.discountCode
    const socket = new zmq.Request()
    console.log(discountCode)
    
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

// Microservice D
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

// Listening for requests
app.listen(port, () => {
    console.log("Backend server is listening on port 40599...")
})