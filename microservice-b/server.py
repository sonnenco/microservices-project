import zmq
import json

context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:40999")
print("Starting server on port 40999...")

def processRequest(data):
    """
    Retrieve the return policy for the productId.

    :return: Return policy for product, or string specifying errors encountered during data processing (can be empty)
    """

    print("Running def processRequest()...")
    returnPolicies = {
        1: "30 days",
        2: "30 days",
        3: "30 days",
        4: "30 days",
        5: "No returns for clearance items",
        6: "No returns for clearance items"
    }
    productId = data.get("productId")
    productId = int(productId)
    policy = returnPolicies.get(productId)

    print("productId:", productId)
    print("policy:", policy)
    if productId in returnPolicies and policy:
        print()
        socket.send_string(json.dumps(returnPolicies.get(productId)))
        print("Product return policy lookup was successful!")
    else:
        print("def processRequest(): Did not receive a productId or identifier was invalid.")
        socket.send_string("def processRequest(): Did not receive a productId or identifier was invalid.")

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