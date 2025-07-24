ye ek dynamic value hoti hai jo autmatically generate hoti in to access this use req.params and provide path /:id used when we want details of specific things like any lectures etc

router
    .route('/:courseId')
    .get(getLecturesByCourseId); 
    
export const getLecturesByCourseId = async(req,res,next) => {
    try {
        const {courseId} = req.params;
    }}


🔷 params क्या होता है?
जब आप किसी API या route को access करते हैं जैसे:

sql
Copy
Edit
GET /user/123
यहाँ /123 एक dynamic value है — यह किसी user की ID हो सकती है। इसे हम कहते हैं URL parameter, और इसे ExpressJS में req.params से access किया जाता है।

🔶 एक Practical Example: Password Reset Token
💡 Reset Password URL:
perl
Copy
Edit
https://frontend.com/reset-password/abcd1234token
यहाँ abcd1234token एक token है जो backend द्वारा generate किया गया है और frontend को भेजा गया है।

🔹 Backend में Route:
js
Copy
Edit
router.get('/reset-password/:token', resetPasswordHandler);
यहाँ :token एक dynamic parameter है।

✅ इसे access कैसे करते हैं?
js
Copy
Edit
const token = req.params.token;
इसका मतलब: URL में जो भी value /reset-password/ के बाद आई है, उसे token नाम से मिल जाएगी।

✅ params कब use करते हैं?
Situation	Example URL	Access via
किसी यूज़र की प्रोफाइल दिखानी हो	/user/45	req.params.id
ईमेल-वेरिफिकेशन token भेजना हो	/verify/eyJhbGciOiJIUzI1NiIsInR5cCI	req.params.token
पासवर्ड रीसेट करना हो	/reset-password/xyz987	req.params.token

🚫 Common Confusion: req.query vs req.params
चीज़	कहां आती है	Access कैसे करें
params	Route path में (/user/:id)	req.params.id
query	URL के end में (?search=aman)	req.query.search

🔚 निष्कर्ष (Conclusion)
params backend को dynamic value देने का तरीका है।

यह URLs को flexible बनाता है — जैसे /reset-password/:token, /user/:id, आदि।

आप इन्हें req.params.key से access करते हैं।