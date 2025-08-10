import zmq
import json

context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:40799")
print("Starting server on port 40799...")

def readAllStock():
    """
    Open text file, read contents, and send back over socket to requestor.

    :return: N/A
    """

    print("Running def readAllStock()...")

    # Attempt to read from text file
    try:
        with open ("product-inventory.txt", "r") as file:
            productInventory = json.load(file)
    except IOError as error:
        socket.send_string(f"def readAllStock(): Error reading the text file: {error}")
        print(f"def readAllStock(): Error reading the text file: {error}")
    
    socket.send_string(json.dumps(productInventory))
    print("def readAllStock(): Request was executed successfully!")

def readSpecificStock(productId):
    """
    Open text file, read contents for specific product identifier, and send back stock for that product.
    If the product does not exist in the inventory, send reply confirming this.

    :productId: integer value representing a unique product in the inventory
    :return: N/A
    """
    
    print("Running def readSpecificStock()...")

    # Attempt to read from text file
    try:
        with open ("product-inventory.txt", "r") as file:
            productInventory = json.load(file)
    except IOError as error:
        socket.send_string(f"def readSpecificStock(): Error reading the text file: {error}")
        print(f"def readSpecificStock(): Error reading the text file: {error}")

    # Determine if that productId exists in the inventory
    productStock = None
    for product in productInventory:
        productId = int(productId)
        if product["productId"] == productId:
            print("found a match!")
            productStock = product["productStock"]

    if productStock:
        socket.send_string(str(productStock))
        print("def readSpecificStock(): Request was executed successfully!")
    else:
        socket.send_string("def readSpecificStock(): Requested product is not currently in the inventory.")
        print("def readSpecificStock(): Requested product is not currently in the inventory.")

def updateStock(productId, amountPurchased):
    """
    Open text file, read contents for specific product stock, and update that stock from recent order.

    :productId: integer value representing a unique product in the inventory
    :amountPurchased: integer value of how much product was purchased
    :return: N/A
    """

    print("Running def updateStock()...")
    print("productId:", productId)
    print("amountPurchased:", amountPurchased)

    # Attempt to read from text file
    try:
        with open ("product-inventory.txt", "r") as file:
            productInventory = json.load(file)
    except IOError as error:
        socket.send_string(f"def readSpecificStock(): Error reading the text file: {error}")
        print(f"def readSpecificStock(): Error reading the text file: {error}")

    foundProduct, validUpdate = False, False

    # Determine if that productId exists in the inventory, and perform updates
    for product in productInventory:
        if product["productId"] == productId:
            foundProduct = True
            productStock = product["productStock"]
            newProductStock = int(productStock) - int(amountPurchased)

            if newProductStock >= 0:
                validUpdate = True
                product["productStock"] = newProductStock

    if foundProduct and validUpdate:
        with open("product-inventory.txt", "w") as file:
            json.dump(productInventory, file, indent=2)
        
        socket.send_string("def readSpecificStock(): Request was executed successfully!")
        print("def readSpecificStock(): Request was executed successfully!")
    else:
        socket.send_string("def updateStock(): Did not find the productId or the stock would go negative.")
        print("def updateStock(): Did not find the productId or the stock would go negative.")

def processRequest(data):
    """
    Determine incoming request type, ensure required keys are included and route to supporting functiont to execute request

    :return: List specifying errors encountered during data processing (can be empty)
    """
    
    print("Running def processRequest()...")
    errors = []
    requestType = data.get("operation")

    # Handle read requests
    if requestType == "read":
        productId = data.get("productId")

        # Determine whether read-all or read-specific request
        if productId:
            readSpecificStock(productId)
        else:
            readAllStock()
    
    # Handle update requests
    elif requestType == "update":
        productId = data.get("productId")
        amountPurchased = data.get("amountPurchased")

        # Check that required keys and values were provided in the request payload
        if not productId:
            errors.append("def processRequest(): Must include 'productId' key and value to perform product inventory update.")
            print("def processRequest(): Must include 'productId' key and value to perform product inventory update.")

        if not amountPurchased or not amountPurchased:
            errors.append("def processRequest(): Must include 'amountPurchased' key and value to perform product inventory update.")
            print("def processRequest(): Must include 'amountPurchased' key and value to perform product inventory update.")

        if productId and amountPurchased:
            updateStock(productId, amountPurchased)
    
    else:
        errors.append("def processRequest(): Non-supported 'operation' type.  Allowed values are 'read' and 'update' in the request payload.")
        print("def processRequest(): Non-supported 'operation' type.  Allowed values are 'read' and 'update' in the request payload.")
    
    if errors:
        socket.send_string(errors)

def runServer():
    """
    Main function which handles incoming requests via ZeroMQ.

    :return: List specifying error messages encountered in supporting functions (if any)
    """
    
    print("Running def runServer()...")

    while True:
        try:
            # Receive incoming message via ZeroMQ
            message = socket.recv()
            print(f"\nReceived incoming message: {message}")
            
            # Attempt to convert message into Python dictionary
            try:
                data = json.loads(message)
            except json.JSONDecodeError as error:
                print(f"def runServer(): Invalid JSON object format: {error}")

            processRequest(data)
            
        except KeyboardInterrupt:
            print("Server stopped!")
            break

if __name__ == "__main__":
    runServer()