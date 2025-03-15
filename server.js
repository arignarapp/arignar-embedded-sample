import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 58257;

//http://localhost:58257/

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// GET token endpoint with username/email
app.get("/api/token", async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const API_KEY = process.env.API_KEY;
    //console.log("API_KEY", API_KEY);

    // Use GET method for the AWS API endpoint
    const url = new URL(
      "https://t4b67cht52.execute-api.us-east-1.amazonaws.com/dev/tokens"
    );
    url.searchParams.append("userName", username);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorText}`
      );
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Token creation failed:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
