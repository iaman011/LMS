📌 Agenda of These Express Commands:
Command Purpose (Agenda)

---

app.use() Middleware lagane ke liye hota hai. Har request pe ya specific route pe koi middleware chalana ho, toh use() se lagate hain. Jaise logging, authentication check, ya cookieParser()

app.get() HTTP GET request handle karne ke liye. Jab client koi page ya data chahta hai (browser ya API se) toh us request ka response dene ke liye

app.listen() Server ko kisi specific port pe run karne ke liye. Jaise app.listen(5000) se app 5000 port pe sunna shuru karega

app.post() HTTP POST request handle karne ke liye. Jab client server pe koi data bhejta hai (form submit, login, etc.) us request ka response dene ke liye

app.set() Application level configuration set karne ke liye. Jaise views folder ya template engine set karne ke liye

app.put()
The PUT method in an HTTP request is used to update or replace a resource at a specified URI (Uniform Resource Identifier).

🔧 What PUT Does:
Creates or replaces the resource at the given URL.

If the resource already exists, it is replaced.

If it does not exist, it can be created, depending on the server implementation.

🔁 Example:
http
Copy
Edit
PUT /users/123 HTTP/1.1
Content-Type: application/json

{
  "name": "Aman",
  "email": "aman@example.com"
}
This request will:

Create a new user with ID 123 if not present.

Or, replace the existing user data with the new name and email.

💡 Key Points:
Feature	PUT
Idempotent	✅ Yes. Multiple identical PUTs result in the same resource state.
Use case	Full update or creation at a known URI
Diff from PATCH	PUT replaces the entire resource; PATCH updates part of it

🆚 PUT vs POST
Feature	PUT	POST
Purpose	Update/replace a known resource	Create a new resource
Idempotent	✅ Yes	❌ No
URI control	Client specifies URI	Server usually assigns URI


