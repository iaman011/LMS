🔐 Forgot Password का पूरा स्टेप-बाय-स्टेप प्रोसेस:
👉 Part A: Token Generate करके Email भेजना
User अपना Email डालता है (फ़ॉर्म में "Forgot Password" के दौरान)

Backend उस Email को database में validate करता है –
यानी चेक करता है कि ये email किसी यूज़र से जुड़ा है या नहीं।

अगर email वैध है तो:

एक unique token generate किया जाता है (जैसे: JWT या random string)

उस token के साथ एक expiry time सेट किया जाता है (जैसे: 15 मिनट)

यह token और expiry डेटाबेस में save कर दिए जाते हैं

फिर एक email भेजा जाता है उस user को:

जिसमें एक link होता है जैसे:

perl
Copy
Edit
https://yourdomain.com/reset/<token>
यह link Gmail में user को मिलता है

👉 Part B: Password Reset करना
User अपने Gmail से उस लिंक पर क्लिक करता है (जिसमें token है)

Link खुलता है → user एक form में नया password डालता है

Backend में ये steps होते हैं:

URL से token निकाला जाता है

database में चेक किया जाता है कि token valid है और expire नहीं हुआ

अगर सब ठीक है तो user का password update कर दिया जाता है database में

साथ ही वो token database से delete कर दिया जाता है (ताकि reuse न हो)

📌 Final Flow Summary in Hindi:
Step Description
1️⃣ User ने email डाला
2️⃣ Email को verify किया गया
3️⃣ Token generate हुआ और database में save हुआ
4️⃣ Email भेजा गया जिसमें reset link था
5️⃣ User ने link खोलकर नया password डाला
6️⃣ Token verify हुआ और नया password update हो गया
