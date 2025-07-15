import app from './app.js';
import { config } from 'dotenv';
import connectToDB from './config/db.js';

config();

const PORT = process.env.PORT || 5011;

app.listen(PORT, () => {
  connectToDB();
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
