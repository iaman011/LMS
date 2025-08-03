<!-- multer -->
using multer to upload images
<!-- cloudinary -->
using cloudinary to upload and save it to cdn kind of things



while uploading the image at the time of registeration
📖 इस Diagram की Story:
यह एक image upload का backend flow दिखा रहा है।

📌 Step by Step Process:
Client (User)
जब कोई user किसी form के ज़रिए image upload करता है (file select करता है), तो वो image binary data के रूप में server को भेजी जाती है।

Server पर Multer Middleware
Server पर एक middleware लगा होता है — Multer।
Multer incoming file (binary) को temporarily handle करता है और उसे server के memory या disk में रख सकता है।

Server → Cloudinary
Multer से process होने के बाद image को Cloudinary (एक cloud image hosting service) पर upload किया जाता है।
ताकि image हमारे server की storage में ना रहे, और globally accessible URL के साथ cloud पर safe store हो जाए।

Cloudinary से Response
Upload के बाद Cloudinary image का URL और बाकी info वापस server को देता है, जिसे हम user को दिखा सकते हैं या database में save कर सकते हैं।

📦 Multer क्या है?
Multer एक Node.js middleware है, जो कि multipart/form-data (file upload forms) को handle करने के लिए use होता है।

📌 Multer के Features:
Form-data parsing करता है।

Upload की हुई file को memory या server disk पर temporarily save कर सकता है।

Files का size limit, file type filter जैसे options दे सकता है।

Backend पर files को easily manage करने में मदद करता है।

📌 Multer Example:
javascript
Copy
Edit
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
console.log(req.file);
});
📦 Cloudinary क्या है?
Cloudinary एक cloud-based image और video management service है।

📌 Cloudinary के Features:
Image और video को store करना।

Files को globally fast access के लिए serve करना।

Image optimization (compression, resizing)।

Secure और scalable storage।

Files का public URL मिलता है।

📌 Cloudinary Example:
javascript
Copy
Edit
const cloudinary = require('cloudinary').v2;

cloudinary.uploader.upload('path/to/image', (error, result) => {
console.log(result.url);
});
📌 सरल भाषा में:
Multer server पर file upload करने की जिम्मेदारी लेता है।
Cloudinary उस file को cloud पर store कर देता है, और उसका public URL देता है।
इससे हमारा server lightweight और scalable रहता है।
