import "dotenv/config";
import app from "./app.js";
import connectToDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Error starting server: ", err.message);
    process.exit(1);
  }
}

startServer();
