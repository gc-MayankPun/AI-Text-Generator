const express = require("express");
const { limiter } = require("./middlewares/rateLimiter");
const app = express();
var cors = require("cors");
const { GoogleGenAI, Modality } = require("@google/genai");
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
      // model: "gemini-1.5-flash",
      model: "gemini-2.0-flash",
      contents: message,
    });
    res.status(200).json({ success: true, message: response.text });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get response from Server." });
  }
});

app.post("/api/generate-image", async (req, res) => {
  const { message } = req.body;

  if (!message)
    return res
      .status(400)
      .json({ success: false, message: "Image description required." });

  if (!tokenLimitChecker(message)) {
    return res
      .status(400)
      .json({ success: false, message: "Image description is too long." });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: message,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    let imageData = null;

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        imageData = part.inlineData.data; 
      }
    }

    if (!imageData) {
      return res
        .status(500)
        .json({ success: false, message: "No image was generated." });
    }

    res.status(200).json({
      success: true,
      message: "Image Generated",
      image: `data:image/png;base64,${imageData}`,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to get response from Server." });
  }
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server Listening at Port ${process.env.PORT}`);
});
