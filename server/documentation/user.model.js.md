here we require two things models and schema
you can define a schema to enforce a structure on the documents within a collection.

📖 In Simple Terms:
A schema is a blueprint or structure that defines:

What fields a document should have.

What data types those fields should be.

Which fields are required, have default values, or are unique.

we can also have to perform the validation like zod validation means name have 6 char password more than 8 char etc

---

// सबसे पहले bcrypt लाइब्रेरी को import कर लेते हैं — जो password को encrypt करने के लिए काम आती है
const bcrypt = require('bcrypt');

// userSchema में pre-save middleware लगाते हैं
// मतलब जब भी कोई document (user) डेटाबेस में save होने वाला होगा, उससे पहले ये middleware चलेगा
userSchema.pre('save', async function (next) {

    // 'this' का मतलब है — अभी जो document save होने वाला है वही
    // Example: कोई नया user बन रहा है या existing user का data update हो रहा है

    // अब सबसे पहले चेक करते हैं कि password field में कोई बदलाव हुआ है या नहीं
    // अगर password बदला नहीं है, तो hashing की ज़रूरत नहीं — सीधा अगले काम पर बढ़ जाओ
    if (!this.isModified('password')) {
        return next();  // next() मतलब अगले middleware या save operation को call करना
    }

    // अगर password नया है या बदला गया है, तो उसे डेटाबेस में plain text में नहीं डालना
    // 👉 Hashing का मक़सद:
    // - पासवर्ड को encrypt करके रखना, ताकि कोई भी उसे सीधे पढ़ न सके
    // - अगर कभी डेटाबेस लीक भी हो जाए, तो असली पासवर्ड कोई नहीं देख पाएगा

    // 👉 bcrypt क्यों use करते हैं:
    // - ये strong encryption करता है
    // - इसके अंदर salting का feature होता है, जो एक random string पासवर्ड में add करता है
    // - इससे password को crack करना या guess करना बहुत मुश्किल हो जाता है

    // अब पासवर्ड को bcrypt से hash कर देते हैं
    // यहाँ '10' का मतलब है salt rounds — जितना ज़्यादा होगा, hashing उतनी secure और time-consuming होगी
    this.password = await bcrypt.hash(this.password, 10);

    // hashing complete होने के बाद, अगले काम पर बढ़ जाओ
    next();

});

---

// अब User नाम का model बना लेते हैं — जिससे हम database में 'users' collection पर काम कर सकें
const User = model('User', userSchema);

// User schema के अंदर methods नाम की property होती है
// इसमें हम custom methods define कर सकते हैं जो हर user document के लिए available होंगे
userSchema.methods = {

    // comparePassword नाम का एक method बना रहे हैं
    // ये asynchronous function है क्योंकि bcrypt का compare function asynchronous होता है
    comparePassword: async function (plainTextPassword) {

        // यहाँ 'this.password' उस user का hashed password है जो डेटाबेस में store है
        // और 'plainTextPassword' वो पासवर्ड है जो user ने login करते वक्त डाला है

        // bcrypt.compare() function दोनों passwords को compare करता है
        // ये internally plain text password को hash करके, डेटाबेस वाले hash से match करता है
        // अगर दोनों match करते हैं तो true return करेगा, वरना false
        return await bcrypt.compare(plainTextPassword, this.password);
    }

}

---
