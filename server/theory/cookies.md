🍪 Cookie क्या है?
Cookie एक छोटी सी information होती है, जिसे server यूज़र के browser में store कर देता है।
जब भी यूज़र उसी वेबसाइट पर दोबारा आता है या request करता है, तो ये cookie server के पास भेजी जाती है।

📌 Agenda / मक़सद क्या है Cookies का?
✅ 1️⃣ यूज़र को पहचानना (User Identification)
जब कोई यूज़र login करता है या कोई setting select करता है,
तो उसकी जानकारी browser में cookie में store कर ली जाती है।
ताकि अगली बार वही यूज़र फिर से आए तो उसे दोबारा login या setting reset ना करनी पड़े।

उदाहरण:
तुमने Amazon पर login किया — और 7 दिन बाद वापस आकर देखा तो तुम login ही रहते हो।
ये cookie के ज़रिए possible है।

✅ 2️⃣ Session Management
Cookie को session management के लिए भी use किया जाता है।
जैसे:

Login session track करना

Cart में रखे product याद रखना

कौन-सी language select की है, वो रखना

Example:
तुमने Myntra पर कोई 4 item cart में डाले। Browser बंद किया और अगले दिन खोला — तो cart वही होगा। क्योंकि cookie ने remember किया।

✅ 3️⃣ Security Purpose (httpOnly, secure cookies)
httpOnly cookie का मक़सद है कि cookie को browser के JavaScript से access ना किया जा सके।
इससे hacker XSS (Cross Site Scripting) से cookie चुराने में fail हो जाता है।

secure cookie सिर्फ HTTPS पर भेजी जाती है — HTTP पर नहीं।
इससे data sniffing और middleman attack से बचाव होता है।

✅ 4️⃣ Preferences और Tracking
Cookies यूज़र की preferences (जैसे theme, language) को remember रखती हैं।
साथ ही कुछ sites (जैसे Google Ads) यूज़र की activity track करने के लिए cookies का इस्तेमाल करती हैं।

******************************************************

📜 कोड:

usercontroller.js

// Cookie के लिए कुछ options बना रहे हैं
const cookieOptions = {
    secure: true,              // ये option कहता है कि cookie सिर्फ HTTPS connection पर ही भेजी जाएगी (HTTP पर नहीं)
    maxAge: 7*24*60*60*1000,   // ये cookie की expiry time है — 7 दिन के बाद cookie expire हो जाएगी (मिलिसेकंड में)
    httpOnly: true             // ये बताता है कि cookie client-side JavaScript (जैसे browser console) से access नहीं की जा सकती
}

// अब response में cookie set कर रहे हैं
res.cookie('token', token, cookieOptions);
📖 पूरी कहानी (Story in Hindi)
जब कोई यूज़र login करता है और हम उसे JWT token देते हैं,
तो उस token को हम सीधे browser में store नहीं करते, बल्कि secure तरीके से browser की cookie में डालते हैं।

क्यों?
👉 क्योंकि cookie automatically हर request के साथ server को जाती है।
👉 और cookie में रखी चीज़ें ज्यादा control में होती हैं (session management, security control)।

अब cookie को set करने के लिए express का res.cookie() method होता है:

javascript
Copy
Edit
res.cookie('token', token, options)
जहाँ:

'token' → cookie का नाम

token → वो actual JWT token या value

cookieOptions → cookie की properties और security settings

📌 cookieOptions में क्या-क्या है?
1️⃣ secure: true
इसका मतलब है कि ये cookie सिर्फ HTTPS connection पर ही भेजी जाएगी।

Localhost (HTTP) पर नहीं जाएगी।

Production में security के लिए बहुत ज़रूरी।

2️⃣ maxAge: 7*24*60*60*1000
ये बताता है कि cookie कितने समय तक valid रहेगी।

यहाँ 7 दिन तक (7 दिन × 24 घंटे × 60 मिनट × 60 सेकंड × 1000 मिलीसेकंड)

यानी यूज़र 7 दिन तक login रहेगा, उसके बाद login फिर से करना पड़ेगा।

3️⃣ httpOnly: true
ये सबसे important है।

इससे cookie client-side JavaScript (browser console, scripts) से access नहीं की जा सकती।

इसका मतलब कोई XSS (Cross-site scripting attack) करके इस cookie को चुरा नहीं सकता।

✅ Final Conclusion:
इस code का मक़सद है:

JWT token को safe और secure तरीके से client browser में भेजना

जिससे हर request के साथ वो server को भेजा जाए

और वो cookie browser JS से access ना हो पाए और सिर्फ HTTPS पर भेजी जाए