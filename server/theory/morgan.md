📦 Morgan क्या है?
Morgan एक HTTP request logger middleware है जो आपके Node.js/Express backend में आने वाली हर request का log बनाता है।

मतलब —
जब भी कोई client (Postman, browser या mobile app) आपके server को request भेजता है, तो Morgan उसकी details console में दिखा देता है।

📌 Morgan क्या-क्या log करता है?
HTTP method (GET, POST, PUT, DELETE…)

URL path

Status code (200, 404, 500…)

Response time

Date & time

📌 Morgan का काम क्यों ज़रूरी है?
जब आप development या debugging कर रहे होते हो — आपको पता चलना चाहिए कि कौन-कौन सी requests server पर आ रही हैं, कौन सी fail हो रही हैं, और server उन्हें कैसे handle कर रहा है।

Errors और issues को पकड़ना आसान होता है।

📌 Morgan को कैसे use करें?
1️⃣ Install करो:
bash
Copy
Edit
npm install morgan
2️⃣ Server में import और use करो:
javascript
Copy
Edit
const morgan = require('morgan');

app.use(morgan('dev'));
📌 Morgan में कुछ predefined formats होते हैं:
'dev' → colored short logs

'tiny' → बहुत छोटा log

'combined' → detailed logs (production में ज़्यादा चलता है)

Example:

javascript
Copy
Edit
app.use(morgan('combined'));
📌 Example:
मान लो आपने Postman से ये request मारी:

bash
Copy
Edit
GET http://localhost:5000/api/v1/user/register
तो console में Morgan ये log करेगा:

bash
Copy
Edit
GET /api/v1/user/register 200 7.015 ms - 120
मतलब:

GET → Method

/api/v1/user/register → path

200 → status code

7.015 ms → response time

120 → response size (bytes में)

📖 सरल भाषा में:
Morgan server का चौकीदार है —
जो server पर आने-जाने वाली हर request की entry और report console में दिखा देता है।