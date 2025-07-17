✅ 1xx – Informational
Code Meaning Use Case
100 Continue Server received the initial part of the request; client can continue.
101 Switching Protocols For upgrading (like to WebSockets). Rarely used in basic web APIs.

✅ 2xx – Success
Code Meaning Use Case
200 OK Standard success. Response has the requested data.
201 Created Resource successfully created (e.g., after POST /register).
204 No Content Success, but no data returned (e.g., DELETE success).

✅ Use 200 for GET, 201 for successful POST, 204 for DELETE with no body.

⚠️ 3xx – Redirection
Code Meaning Use Case
301 Moved Permanently URL changed; redirect client.
302 Found Temporary redirect (used in login redirects).
304 Not Modified Used with caching — tells client to use cached data.

❌ 4xx – Client Errors
Code Meaning Use Case
400 Bad Request Malformed request, missing fields, validation errors.
401 Unauthorized No token or invalid token. User must login.
403 Forbidden User is logged in, but not allowed to access resource.
404 Not Found Route or resource not found.
409 Conflict Data already exists (e.g., duplicate email).
422 Unprocessable Entity Semantic errors in data — valid format but wrong logic.

🔐 Use 401 for auth, 403 for role/access issues, 400/422 for bad input.

🔥 5xx – Server Errors
Code Meaning Use Case
500 Internal Server Error Something broke in backend. Uncaught exceptions, DB errors, etc.
501 Not Implemented Feature not supported.
502 Bad Gateway Server acting as a proxy got invalid response from upstream server.
503 Service Unavailable Server down or overloaded.
504 Gateway Timeout Upstream server took too long to respond.

🧯 500 is most common for bugs, crashes, and exceptions.

🚦 Example API Response (JSON)
json
Copy
Edit
{
"success": false,
"message": "Invalid email or password",
"status": 400
}
🧠 Bonus Tip: How to send in Express.js
js
Copy
Edit
// Success
res.status(200).json({ success: true, data: user });

// Client error
res.status(400).json({ success: false, message: 'Email is required' });

// Server error
res.status(500).json({ success: false, message: 'Something went wrong' });
