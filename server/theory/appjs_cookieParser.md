📌 app.use(cookieParser()) ka kaam kya hai backend mein?
🔍 Purpose:
Jab client (jaise browser) apni request ke saath cookies bhejta hai, toh wo cookies HTTP headers ke andar hoti hain.

cookie-parser ek Express middleware hai jo un cookies ko parse karke readable form mein req.cookies object ke andar daal deta hai, taaki hum backend mein asaani se access kar sakein.

📌 Kyu use karte hain?
✅ Jab hume:

Client se bheje gaye cookies (jaise JWT token ya session ID) padhni hoti hain.

Authentication ya user session track karna hota hai.

User ki preferences cookies mein store karke access karni hoti hain.

📌 Example:
javascript
Copy
Edit
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.get('/profile', (req, res) => {
  console.log(req.cookies); // yahan cookies mil jayengi
  res.send('Profile page');
});
Jab bhi koi /profile route pe request karega, uske saath jo bhi cookies aayi hongi, wo req.cookies mein aa jayengi.

📌 Agenda (Simple mein):
👉 Client se bheji gayi cookies ko parse karke backend mein readable banana.
👉 JWT, session ID ya user ki info ko cookies se asaani se padh sakein.