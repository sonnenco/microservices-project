import zmq
import json

context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:40899")
print("Starting server on port 40899...")

def processRequest(data):
    """
    Determine whether valid coupon was provided, and if so, send back the decimal multiplier for the order subtotal.
    
    :data: Request payload which should contain "code" key with value representing the input discount code 
    :return: N/A
    """

    print("Running def processRequest()...")
    currentDiscounts = {
        "15-PERCENT-OFF": 0.85,
        "10-PERCENT-OFF": 0.90
    }
    discountCode = data.get("discountCode")
    validCode = currentDiscounts.get(discountCode)

    if validCode: socket.send_string(json.dumps(validCode))
    else: socket.send_string(json.dumps("Invalid discount code!"))


def runServer():
    """
    Main function which handles incoming requests via ZeroMQ.
    
    :return: N/A
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