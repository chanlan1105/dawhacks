from http.server import BaseHTTPRequestHandler, HTTPServer
import json


task_list=[]

# Define the request handler class
class MyHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Set CORS headers
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

        if self.path == '/gettask':
            # Send response for '/gettask' path
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            json_send = json.dumps(task_list)  # Assuming task_list is defined somewhere in your code
            self.wfile.write(json_send.encode('utf-8'))
            

            #send progress as json
        else:
            # Send response for other paths
            self.send_header('Content-type', 'application/json')
            self.end_headers()


            # Convert the list to a JSON string
            json_send = json.dumps(task_list)
            self.wfile.write(json_send.encode('utf-8'))
    def do_POST(self):
        #print("POST")
        self.send_response(202)

        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        
        if self.path == '/newtask':  # Check if the request path is '/api/data'
            # Get the length of the content
            
            content_length = int(self.headers['Content-Length'])

            # Read and decode the request body
            post_data = self.rfile.read(content_length).decode('utf-8')

            # Parse the JSON data
            json_data = json.loads(post_data)
            json_data["progress"] = 0

            task_list.append(json_data)

            # Send response status code
            

            # Send response headers
            self.send_header('Content-type', 'application/json')
            self.end_headers()

            # Send response message
            response_data = {'message': 'POST request received', 'data': json_data}
            self.wfile.write(json.dumps(response_data).encode('utf-8'))
            print(task_list)
        
        elif self.path == '/deltask':
            self.send_header('Content-type', 'application/json')
            self.end_headers()

            content_length = int(self.headers['Content-Length'])

            # Read and decode the request body
            post_data = self.rfile.read(content_length).decode('utf-8')

            # Parse the JSON data
            json_data = json.loads(post_data)

            del_task = task_list
            #content_length = int(self.headers['Content-Length'])
            #ost_id = self.rfile.read(content_length).decode('utf-8')
            json_id = json_data.get('id')
            del_task[json_id] = None
            print(del_task)

        elif self.path == '/progresstask':
            self.send_header('Content-type', 'application/json')
            self.end_headers()

            content_length = int(self.headers['Content-Length'])

            # Read and decode the request body
            post_data = self.rfile.read(content_length).decode('utf-8')

            # Parse the JSON data
            json_data = json.loads(post_data)
            json_id = json_data.get('id')
            json_progress = json_data.get('progress')
            #json_data.progress = 0
            task_list[int(json_id)]["progress"] = json_progress

        else:
            # If the request path is not recognized, respond with a 404 error
            self.send_error(404, 'Not Found')
    def do_OPTIONS(self):
    # Set CORS headers
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
# Set the IP address and port number
HOST = '10.230.127.70'  # localhost
PORT = 80

# Create the HTTP server with custom request handler
with HTTPServer((HOST, PORT), MyHTTPRequestHandler) as server:
    print(f"Server started at http://{HOST}:{PORT}")

    # Start the server and keep it running until interrupted
    server.serve_forever()



task_dict = { "Title": "Calculus",
             "Description": "Wht",
             "Time": float
}