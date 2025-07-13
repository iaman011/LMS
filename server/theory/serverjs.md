Express.js is the core framework handling all the backend API requests and responses.
To make it work, we need to set up an HTTP server where Express listens for incoming client requests (like login, register, course fetch etc.) and sends back appropriate responses.

That’s why we create a server.js file — it’s the entry point of our backend where:

We import Express.

Initialize the Express app.

Define API routes and middleware.

Connect to the database.

And finally start the server to listen on a specific port.

Without server.js, there’s no running backend, and no request/response flow.
It ensures our backend is always ready to handle requests from the frontend or any client.

👉 In short:
server.js boots up our Express application, connects everything, and keeps the backend server running.

