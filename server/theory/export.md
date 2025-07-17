📦 सबसे पहले समझो — दो तरह के export होते हैं:
✅ 1️⃣ CommonJS (पुराना Node.js का system)
👉 इसमें हम करते हैं:

javascript
Copy
Edit
module.exports = something;
✅ 2️⃣ ES6 Modules (modern JS system)
👉 इसमें करते हैं:

javascript
Copy
Edit
export default something;
📖 अब तुम्हारे दिए हुए इस code में:
📌 अभी CommonJS export system यूज़ किया गया है:
javascript
Copy
Edit
module.exports = User;
👉 इसका मतलब:
पूरी file में ऊपर schema बनाया

methods बनाए

फिर User model बनाया:

javascript
Copy
Edit
const User = model('User', userSchema);
और आखिर में इस model को इस file से बाहर भेज (export) दिया गया ताकि बाकी files इसको import करके इस्तेमाल कर सकें।

📌 जहां जरूरत हो वहां इस तरह import किया जाएगा:
javascript
Copy
Edit
const User = require('./models/user.model');
📌 अगर यही ES6 Modules होता तो:
फिर export करने का तरीका होता:

javascript
Copy
Edit
export default User;
और import करते वक्त:

javascript
Copy
Edit
import User from './models/user.model.js';
ध्यान दो: इसमें .js extension ज़रूरी होता और package.json में:

json
Copy
Edit
"type": "module"
लिखना पड़ता।

---
