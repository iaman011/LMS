🔐 crypto module का agenda (उद्देश्य) in Hindi:
👉 1. Secure Token बनाना
उपयोग: Reset password, email verification, JWT secret generate करने में।

उदाहरण:

js
Copy
Edit
import crypto from 'crypto';

const token = crypto.randomBytes(32).toString('hex');
👉 2. Hashing करना (सुरक्षित डेटा स्टोर)
उपयोग: Password को hash करके database में store करना (जैसे: SHA-256, SHA-512).

उदाहरण:

js
Copy
Edit
const hash = crypto.createHash('sha256').update('password123').digest('hex');
👉 3. HMAC (Hash-Based Message Authentication Code)
उपयोग: किसी message की integrity verify करना, जैसे APIs के साथ।

उदाहरण:

js
Copy
Edit
const hmac = crypto.createHmac('sha256', 'secretkey').update('message').digest('hex');
👉 4. Encryption और Decryption (गुप्त संदेश)
उपयोग: Sensitive डेटा को encrypt/decrypt करना (e.g., AES).

उदाहरण:

js
Copy
Edit
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
const encrypted = cipher.update('my secret data', 'utf8', 'hex') + cipher.final('hex');
👉 5. Digital Signature और Verification
उपयोग: Data authenticity verify करना (जैसे बैंकिंग, e-voting system).

उदाहरण:

js
Copy
Edit
const sign = crypto.createSign('SHA256');
sign.update('message');
const signature = sign.sign(privateKey, 'hex');
📦 Summary in Hindi:
उपयोग (Use Case) crypto में कैसे होता है
Secure token generate करना randomBytes()
Password को hash करना createHash()
Message integrity check करना createHmac()
Data encrypt/decrypt करना createCipheriv() / createDecipheriv()
Signature generate & verify करना createSign() / createVerify()

✅ Real-world इस्तेमाल:
🔐 Forgot Password Link → secure token बनाना

🧾 Password hash करके store करना

📲 OTP या secure message भेजना

🔑 SSL या secure login verification
