// हमारी खुद की Error class बना रहे हैं, जो JavaScript की Error class को extend करेगी
class AppError extends Error {

  // जब भी हम AppError का नया object बनाएंगे, तो message और statusCode पास करेंगे
  constructor (message, statusCode) {
    // सबसे पहले parent Error class के constructor को call करेंगे message के साथ
    // ताकि बेसिक error functionalities inherited हो जाएँ
    super(message);

    // फिर अपने custom error object में statusCode property add कर रहे हैं
    this.statusCode = statusCode;

    // Error.captureStackTrace का काम है कि जब error आए तो 
    // उसका जो भी stack trace है (error कहाँ से आया) — वो इस constructor को छोड़कर आगे की लाइन से स्टार्ट हो
    // जिससे debugging आसान हो
    Error.captureStackTrace(this, this.constructor);
  }
}

// इस custom error class को export कर रहे हैं ताकि बाकी पूरे project में इसे import करके use कर सकें
export default AppError;


📌 Line:

return next(new AppError('All fields are required', 400));

📖 What’s happening here?
It’s a way to create a custom error object using your AppError class and then pass that error to the next middleware in Express (typically your global error handler).

📌 Breaking it down:
Part	Meaning
new AppError('All fields are required', 400)	Creates a new error object with message 'All fields are required' and HTTP status code 400 (Bad Request)
next()	In Express, next() is a function you call to pass control to the next middleware
return next(...)	Passes the custom error to the next error-handling middleware in the chain and stops further code execution in the current route

📖 Why use return before next()?
✅ Because once you call next() and pass the error, you want to immediately exit the current function and not continue executing any more code in that route.

📌 Where is this used?
Inside an Express route or controller when a specific error situation occurs.
For example:

javascript
Copy
Edit
app.post("/register", (req, res, next) => {
  const { name, email, password } = req.body;

  // अगर कोई field missing है तो error throw करो
  if (!name || !email || !password) {
    // Custom AppError बनाकर उसे next middleware को भेजो
    return next(new AppError("All fields are required", 400));
  }

  // अगर सब ठीक है तो बाकी का काम करो
  res.status(200).json({ message: "User registered successfully!" });
});

