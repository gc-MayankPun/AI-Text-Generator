const express = require("express");
const { limiter } = require("./middlewares/rateLimiter");
const app = express();
var cors = require("cors");
const { GoogleGenAI } = require("@google/genai");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const tokenLimitChecker = require("./utils/tokenLimitChecker");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(limiter);

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/send-prompt", async (req, res) => {
  const { message } = req.body;

  if (!message)
    return res
      .status(400)
      .json({ success: false, message: "Message required." });

  if (!tokenLimitChecker(message)) {
    return res
      .status(400)
      .json({ success: false, message: "Message is too long." });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: message,
    });
    res.status(200).json({ success: true, message: response.text });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get response from Server." });
  }
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server Listening at Port 3000");
});
